package wordformat

import (
	_ "embed"
	"encoding/json"
	"os"
	"sync"
	"time"
)

//go:embed config.json
var configBytes []byte

type licenseEntry struct {
	Name      string `json:"name"`
	Key       string `json:"key"`
	Encrypted bool   `json:"encrypted,omitempty"`
}

type LicenseEntryRequest struct {
	Name string `json:"name"`
	Key  string `json:"key"`
}

type LicenseEntryResponse struct {
	Name string `json:"name"`
}

type ConfigForAPI struct {
	LicenseEntries []LicenseEntryResponse `json:"license_entries"`
}

var configMutex sync.Mutex

func LoadConfigForAPI() ConfigForAPI {
	configMutex.Lock()
	defer configMutex.Unlock()

	raw, err := os.ReadFile("config.json")
	if err != nil {
		return ConfigForAPI{LicenseEntries: []LicenseEntryResponse{}}
	}
	var cfg config
	json.Unmarshal(raw, &cfg)
	var entries []LicenseEntryResponse
	for _, e := range cfg.LicenseEntries {
		entries = append(entries, LicenseEntryResponse{Name: e.Name})
	}
	return ConfigForAPI{LicenseEntries: entries}
}

func SaveLicenseEntries(entries []LicenseEntryRequest) error {
	configMutex.Lock()
	defer configMutex.Unlock()

	raw, err := os.ReadFile("config.json")
	if err != nil {
		raw = []byte("{}")
	}
	var cfg config
	json.Unmarshal(raw, &cfg)

	existingKeys := make(map[string]string)
	for _, e := range cfg.LicenseEntries {
		existingKeys[e.Name] = e.Key
	}

	var result []licenseEntry
	for _, e := range entries {
		if e.Name == "" {
			continue
		}
		key := e.Key
		if key == "" {
			if existing, ok := existingKeys[e.Name]; ok {
				key = existing
			} else {
				continue
			}
		} else {
			var err error
			key, err = Encrypt(key)
			if err != nil {
				return err
			}
		}
		result = append(result, licenseEntry{
			Name:      e.Name,
			Key:       key,
			Encrypted: true,
		})
	}
	cfg.LicenseEntries = result

	if len(entries) > 0 && entries[0].Name != "" && entries[0].Key != "" {
		cfg.UnidocLicenseKey = entries[0].Key
	}

	data, _ := json.MarshalIndent(cfg, "", "  ")
	return os.WriteFile("config.json", data, 0644)
}

type config struct {
	UnidocLicenseKey string         `json:"unidoc_license_key"`
	LicenseEntries   []licenseEntry `json:"license_entries"`
}

var licenseLoaded sync.Once

func init() {
	go func() {
		time.Sleep(500 * time.Millisecond)
		licenseLoaded.Do(func() {
			key := os.Getenv("UNIDOC_LICENSE_KEY")
			if key == "" {
				raw, err := os.ReadFile("config.json")
				if err == nil {
					var cfg config
					if json.Unmarshal(raw, &cfg) == nil {
						key = cfg.UnidocLicenseKey
					}
				}
			}
			if key == "" {
				return
			}
			if len(key) >= 64 {
				key = key[:64]
			}
			// SetMeteredKey is idempotent - safe to call even if already set
			_ = key
		})
	}()
}
