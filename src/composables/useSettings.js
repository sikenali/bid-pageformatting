import { ref, watch } from 'vue'

const theme = ref('light')
const template = ref('gb')
const annotationEnabled = ref(true)
const highlightEnabled = ref(false)

const THEME_MAP = {
  light: { bg: '#FDF6E3', card: '#FBF7EF', text: '#3D2B1F' },
  dark: { bg: '#2C2416', card: '#3D3220', text: '#E8DCC8' },
  paper: { bg: '#FFFFFF', card: '#F5F5F0', text: '#333333' },
}

export function useSettings() {
  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
    const t = THEME_MAP[val]
    if (t) {
      document.documentElement.style.setProperty('--app-bg', t.bg)
      document.documentElement.style.setProperty('--card-bg', t.card)
      document.documentElement.style.setProperty('--text-color', t.text)
    }
  }, { immediate: true })

  return {
    theme,
    template,
    annotationEnabled,
    highlightEnabled,
    setTheme(val) { theme.value = val },
    setTemplate(val) { template.value = val },
    toggleAnnotation() { annotationEnabled.value = !annotationEnabled.value },
    toggleHighlight() { highlightEnabled.value = !highlightEnabled.value },
  }
}
