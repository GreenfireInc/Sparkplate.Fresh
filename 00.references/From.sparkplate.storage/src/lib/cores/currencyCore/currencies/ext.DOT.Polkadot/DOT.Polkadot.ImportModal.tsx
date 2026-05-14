import { defineComponent, ref, type PropType, h } from 'vue';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImportGenerationStyle } from '../importGenerationStyle';
import { importPolkadot } from './DOT.Polkadot.Import';
import type { PolkadotImportMethod, PolkadotInputFormat } from './DOT.Polkadot.Import.Types';

interface PolkadotImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (result: any) => void;
}

export const PolkadotImportModal = defineComponent({
  name: 'PolkadotImportModal',
  props: {
    open: {
      type: Boolean,
      required: true
    },
    onSuccess: {
      type: Function as PropType<(result: any) => void>,
      default: undefined
    }
  },
  emits: ['update:open', 'success'],
  setup(props, { emit }) {
    const inputFormat = ref<PolkadotInputFormat>('privateKey');
    const importMethod = ref<PolkadotImportMethod>('auto');
    const inputData = ref('');
    const password = ref('');
    const isImporting = ref(false);
    const result = ref<any>(null);

    const handleImport = async () => {
      if (!inputData.value.trim()) return;

      isImporting.value = true;
      result.value = null;

      try {
        const importResult = await importPolkadot({
          format: inputFormat.value,
          data: inputData.value,
          password: password.value || undefined,
          method: importMethod.value
        });

        result.value = importResult;

        if (importResult.success && props.onSuccess) {
          props.onSuccess(importResult);
          emit('success', importResult);
        }
      } catch (error) {
        result.value = {
          success: false,
          error: error instanceof Error ? error.message : 'Import failed'
        };
      } finally {
        isImporting.value = false;
      }
    };

    const resetForm = () => {
      inputData.value = '';
      password.value = '';
      result.value = null;
    };

    const handleClose = () => {
      resetForm();
      emit('update:open', false);
    };

    const handleMethodChange = (value: PolkadotImportMethod) => {
      importMethod.value = value;
    };

    const getLabelText = () => {
      switch (inputFormat.value) {
        case 'privateKey': return 'Private Key';
        case 'mnemonic': return 'Mnemonic Phrase';
        case 'keystore': return 'Keystore File';
        case 'json': return 'JSON Data';
        default: return '';
      }
    };

    const getPlaceholder = () => {
      switch (inputFormat.value) {
        case 'mnemonic': return 'Enter your 12 or 24 word mnemonic phrase...';
        case 'privateKey': return 'Enter your 64-character hex private key...';
        default: return '';
      }
    };

    const handleFileChange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        inputData.value = await file.text();
      }
    };

    return () => h(Dialog, {
      open: props.open,
      onUpdate: open => {
        if (!open) handleClose();
      }
    }, {
      default: () => h(DialogContent, { class: 'sm:max-w-md' }, {
        default: () => [
          h(DialogHeader, {}, {
            default: () => h(DialogTitle, {}, 'Import Polkadot Wallet')
          }),
          h('div', { class: 'space-y-4' }, [
            // Import Method Toggle
            h('div', { class: 'flex items-center justify-between' }, [
              h(Label, { class: 'text-sm font-medium' }, 'Import Method'),
              h(ImportGenerationStyle, {
              value: importMethod.value,
              onChange: handleMethodChange
            })
            ]),
            // Input Format Selection
            h('div', { class: 'space-y-2' }, [
              h(Label, { for: 'format' }, 'Input Format'),
              h('select', {
                id: 'format',
                value: inputFormat.value,
                onChange: (e: Event) => {
                  inputFormat.value = (e.target as HTMLSelectElement).value as PolkadotInputFormat;
                },
                class: 'w-full p-2 border rounded-md'
              }, [
                h('option', { value: 'privateKey' }, 'Private Key (64-char hex)'),
                h('option', { value: 'mnemonic' }, 'Mnemonic Seed (12/24 words)'),
                h('option', { value: 'keystore' }, 'Encrypted Keystore (.keystore)'),
                h('option', { value: 'json' }, 'JSON Export (.json)')
              ])
            ]),
            // Input Data
            h('div', { class: 'space-y-2' }, [
              h(Label, { for: 'input-data' }, getLabelText()),
              (inputFormat.value === 'keystore' || inputFormat.value === 'json') 
                ? h(Input, {
                    id: 'input-data',
                    type: 'file',
                    onChange: handleFileChange,
                    class: 'w-full'
                  })
                : inputFormat.value === 'mnemonic'
                ? h(Textarea, {
                    id: 'input-data',
                    modelValue: inputData.value,
                    onUpdate: modelValue => inputData.value = modelValue as string,
                    placeholder: getPlaceholder(),
                    class: 'w-full min-h-[80px]'
                  })
                : h(Input, {
                    id: 'input-data',
                    modelValue: inputData.value,
                    onUpdate: modelValue => inputData.value = modelValue as string,
                    placeholder: getPlaceholder(),
                    class: 'w-full'
                  })
            ]),
            // Password Field (for encrypted formats)
            inputFormat.value === 'keystore' && h('div', { class: 'space-y-2' }, [
              h(Label, { for: 'password' }, 'Password'),
              h(Input, {
                id: 'password',
                type: 'password',
                modelValue: password.value,
                onUpdate: modelValue => password.value = modelValue as string,
                placeholder: 'Enter keystore password...',
                class: 'w-full'
              })
            ]),
            // Result Display
            result.value && h('div', {
              class: `p-3 rounded-md text-sm ${
                result.value.success 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`
            }, result.value.success ? [
              h('div', { class: 'font-medium mb-1' }, '✅ Import Successful'),
              h('div', `Address: ${result.value.address}`),
              h('div', `Method: ${result.value.method}`)
            ] : [
              h('div', { class: 'font-medium mb-1' }, '❌ Import Failed'),
              h('div', result.value.error)
            ]),
            // Action Buttons
            h('div', { class: 'flex justify-end gap-2 pt-2' }, [
              h(Button, {
                variant: 'outline',
                onClick: handleClose
              }, 'Cancel'),
              h(Button, {
                onClick: handleImport,
                disabled: !inputData.value.trim() || isImporting.value
              }, isImporting.value ? 'Importing...' : 'Import Wallet')
            ])
          ])
        ]
      })
    });
  }
});

export default PolkadotImportModal;
