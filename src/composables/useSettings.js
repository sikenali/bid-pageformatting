import { ref, watch, computed } from 'vue'

const STORAGE_KEY = 'bid-page-settings'

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return null
}

const saved = loadSettings()
const theme = ref(saved?.theme || 'light')
const template = ref(saved?.template || 'gb')
const previewEnabled = ref(saved?.previewEnabled ?? false)
const clearStylesEnabled = ref(saved?.clearStylesEnabled ?? false)
const annotationEnabled = ref(saved?.annotationEnabled ?? false)
const highlightEnabled = ref(saved?.highlightEnabled ?? false)

const THEME_CLASSES = {
  light: { app: '', bg: 'bg-parchment', card: 'bg-cream', text: 'text-ink-black', border: 'border-tan-border' },
  dark: { app: 'dark', bg: 'bg-[#2C2416]', card: 'bg-[#3D3220]', text: 'text-[#E8DCC8]', border: 'border-[#5C4033]' },
  paper: { app: '', bg: 'bg-white', card: 'bg-[#F5F5F0]', text: 'text-[#333333]', border: 'border-[#E0E0E0]' },
}

function persistSettings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    theme: theme.value,
    template: template.value,
    previewEnabled: previewEnabled.value,
    clearStylesEnabled: clearStylesEnabled.value,
    annotationEnabled: annotationEnabled.value,
    highlightEnabled: highlightEnabled.value,
  }))
}

export function useSettings() {
  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
    const classes = THEME_CLASSES[val]
    if (classes) {
      document.body.className = document.body.className
        .replace(/bg-\S+/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      document.body.classList.add(classes.bg, classes.text)
    }
    persistSettings()
  }, { immediate: true })

  watch(template, persistSettings)
  watch(previewEnabled, persistSettings)
  watch(clearStylesEnabled, persistSettings)
  watch(annotationEnabled, persistSettings)
  watch(highlightEnabled, persistSettings)

  const currentThemeClasses = computed(() => THEME_CLASSES[theme.value] || THEME_CLASSES.light)

  return {
    theme,
    template,
    previewEnabled,
    clearStylesEnabled,
    annotationEnabled,
    highlightEnabled,
    currentThemeClasses,
    setTheme(val) { theme.value = val },
    setTemplate(val) { template.value = val },
    togglePreview() { previewEnabled.value = !previewEnabled.value },
    toggleClearStyles() { clearStylesEnabled.value = !clearStylesEnabled.value },
    toggleAnnotation() { annotationEnabled.value = !annotationEnabled.value },
    toggleHighlight() { highlightEnabled.value = !highlightEnabled.value },
  }
}
