import { computed } from 'vue'

type ColorProps = {
  color: string
  danger: boolean
  success: boolean
  warn: boolean
  dark: boolean
  primary: boolean
  active: boolean
  light: boolean
}

function getColorVariable(color: string) {
  const style = getComputedStyle(document.documentElement)
  return style.getPropertyValue(`--c-${color}`)
}

export default function useColorUtils(props: ColorProps) {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'light', 'dark', 'warn']

  const isRGB = computed(() => {
    return /^rgb\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)$/.test(props.color)
  })

  const isHexadecimal = computed(() => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props.color)
  })

  const getColor = computed(() => {
    if (props.danger) return getColorVariable('danger')
    if (props.success) return getColorVariable('success')
    if (props.warn) return getColorVariable('warn')
    if (props.dark) return getColorVariable('dark')
    if (props.primary) return getColorVariable('primary')
    if (props.light) return getColorVariable('light')

    if (isRGB.value) {
      return props.color
    } else if (isHexadecimal.value) {
      const hex = props.color.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return `rgb(${r}, ${g}, ${b})`
    } else if (colors.includes(props.color)) {
      return getColorVariable(props.color)
    } else {
      return getColorVariable('primary')
    }
  })

  return { getColor }

  // Rest of the code...
}
