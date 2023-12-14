import './style.sass'
import { defineComponent, h, computed } from 'vue'
import useColorUtils from '@/comopsables/color'
import { colorProps } from '@/utils/props/colors'

export default defineComponent({
  name: 'CBtn',
  props: {
    ...colorProps,
    circle: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    gradient: { type: Boolean, default: false },
    relief: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    floating: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    upload: { type: Boolean, default: false },
    size: { type: String, default: null }
  },
  setup(props, { slots }) {
    const { getColor } = useColorUtils(props)

    return () => {
      const defaultSlot = h(
        'div',
        {
          class: 'c-button__content'
        },
        slots.default?.()
      )

      const loadingSlot = h(
        'div',
        {
          class: 'c-button__loading'
        },
        slots.loading?.()
      )

      const btn = h(
        'button',
        {
          style: {
            ['--c-color']: getColor.value
          },
          class: [
            'c-button',
            `c-button--size-${props.size}`,
            { ['c-button--circle']: props.circle },
            { ['c-button--square']: props.square },
            { ['c-button--icon']: props.icon },
            { ['c-button--loading']: props.loading },
            { ['c-button--upload']: props.upload },
            { ['c-button--block']: props.block },

            {
              ['c-button--default']:
                !props.flat &&
                !props.border &&
                !props.gradient &&
                !props.relief &&
                !props.transparent &&
                !props.shadow &&
                !props.floating
            },
            { ['c-button--flat']: props.flat },
            { ['c-button--border']: props.border },
            { ['c-button--gradient']: props.gradient },
            { ['c-button--relief']: props.relief },
            { ['c-button--transparent']: props.transparent },
            { ['c-button--shadow']: props.shadow },
            { ['c-button--floating']: props.floating }
          ]
        },
        [defaultSlot, props.loading ? loadingSlot : null]
      )
      return btn
    }
  }
})
