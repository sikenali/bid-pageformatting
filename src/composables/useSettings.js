import { ref, watch, computed } from 'vue'

const theme = ref('light')
const template = ref('gb')
const annotationEnabled = ref(true)
const highlightEnabled = ref(false)

const THEME_CLASSES = {
  light: { app: '', bg: 'bg-parchment', card: 'bg-cream', text: 'text-ink-black', border: 'border-tan-border' },
  dark: { app: 'dark', bg: 'bg-[#2C2416]', card: 'bg-[#3D3220]', text: 'text-[#E8DCC8]', border: 'border-[#5C4033]' },
  paper: { app: '', bg: 'bg-white', card: 'bg-[#F5F5F0]', text: 'text-[#333333]', border: 'border-[#E0E0E0]' },
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
  }, { immediate: true })

  const currentThemeClasses = computed(() => THEME_CLASSES[theme.value] || THEME_CLASSES.light)

  return {
    theme,
    template,
    annotationEnabled,
    highlightEnabled,
    currentThemeClasses,
    setTheme(val) { theme.value = val },
    setTemplate(val) { template.value = val },
    toggleAnnotation() { annotationEnabled.value = !annotationEnabled.value },
    toggleHighlight() { highlightEnabled.value = !highlightEnabled.value },
  }
}
