import { defineComponent, type PropType, h } from 'vue';

export interface ImportGenerationStyleProps {
  /**
   * Current import method selection
   */
  value: 'exodus' | 'polkadotjs' | 'auto';

  /**
   * Callback when selection changes
   */
  onChange: (value: 'exodus' | 'polkadotjs' | 'auto') => void;

  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;

  /**
   * Custom className for styling
   */
  className?: string;
}

/**
 * ImportGenerationStyle - Universal toggle switch for import method selection
 *
 * Provides a clean toggle between different import methods for cryptocurrency wallets.
 * Designed to be reusable across different currencies and import contexts.
 *
 * Features:
 * - Toggle between Exodus and Polkadot.js methods
 * - Auto mode for automatic detection
 * - Compact design for modal integration
 * - No explanation text (as requested)
 *
 * Usage:
 * ```vue
 * <ImportGenerationStyle
 *   :value="importMethod"
 *   @change="setImportMethod"
 * />
 * ```
 */
export const ImportGenerationStyle = defineComponent({
  name: 'ImportGenerationStyle',
  props: {
    value: {
      type: String as PropType<'exodus' | 'polkadotjs' | 'auto'>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const handleToggle = () => {
      if (props.disabled) return;

      // Cycle through: auto -> polkadotjs -> exodus -> auto
      let newValue: 'exodus' | 'polkadotjs' | 'auto' = 'auto';
      switch (props.value) {
        case 'auto':
          newValue = 'polkadotjs';
          break;
        case 'polkadotjs':
          newValue = 'exodus';
          break;
        case 'exodus':
          newValue = 'auto';
          break;
        default:
          newValue = 'auto';
      }
      emit('change', newValue);
    };

    const isChecked = props.value !== 'auto';
    const labelText = props.value === 'exodus' ? 'Exodus' : 
                      props.value === 'polkadotjs' ? 'Polkadot.js' : 'Auto';
    const labelClass = props.value === 'auto' ? 'text-gray-500' : 
                       props.value === 'exodus' ? 'text-orange-600' : 'text-blue-600';
    const switchClass = props.value === 'exodus' ? 'data-[state=checked]:bg-orange-500' : 
                       props.value === 'polkadotjs' ? 'data-[state=checked]:bg-blue-500' : '';

    return () => h('div', { class: `flex items-center gap-2 ${props.className}` }, [
      h('input', {
        type: 'checkbox',
        checked: isChecked,
        onChange: handleToggle,
        disabled: props.disabled,
        class: `w-4 h-4 rounded ${switchClass}`
      }),
      h('label', {
        class: `text-xs font-medium ${!props.disabled ? 'cursor-pointer' : 'cursor-not-allowed'} ${labelClass}`,
        onClick: !props.disabled ? handleToggle : undefined
      }, labelText)
    ]);
  }
});

export default ImportGenerationStyle;
