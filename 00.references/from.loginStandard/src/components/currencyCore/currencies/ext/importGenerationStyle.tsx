import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
 * ```tsx
 * <ImportGenerationStyle
 *   value={importMethod}
 *   onChange={setImportMethod}
 * />
 * ```
 */
export const ImportGenerationStyle: React.FC<ImportGenerationStyleProps> = ({
  value,
  onChange,
  disabled = false,
  className = ''
}) => {
  const handleToggle = () => {
    if (disabled) return;

    // Cycle through: auto -> polkadotjs -> exodus -> auto
    switch (value) {
      case 'auto':
        onChange('polkadotjs');
        break;
      case 'polkadotjs':
        onChange('exodus');
        break;
      case 'exodus':
        onChange('auto');
        break;
      default:
        onChange('auto');
    }
  };

  // Determine checked state based on value
  const isChecked = value !== 'auto';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Switch
        checked={isChecked}
        onCheckedChange={handleToggle}
        disabled={disabled}
        className={`
          ${value === 'exodus' ? 'data-[state=checked]:bg-orange-500' : ''}
          ${value === 'polkadotjs' ? 'data-[state=checked]:bg-blue-500' : ''}
        `}
      />
      <Label 
        className={`text-xs font-medium cursor-pointer ${
          value === 'auto' ? 'text-gray-500' : 
          value === 'exodus' ? 'text-orange-600' : 
          'text-blue-600'
        }`}
        onClick={!disabled ? handleToggle : undefined}
      >
        {value === 'exodus' && 'Exodus'}
        {value === 'polkadotjs' && 'Polkadot.js'}
        {value === 'auto' && 'Auto'}
      </Label>
    </div>
  );
};

export default ImportGenerationStyle;
