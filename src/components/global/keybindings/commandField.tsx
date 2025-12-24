import { useState, useEffect } from 'react';
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty } from 'cmdk';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { Terminal } from 'lucide-react';
import { Button } from '../../ui/button';
import { getTranslation, type LocaleCode } from '@/lib/i18n';

interface CommandFieldProps {
  onCommand?: (command: string) => void;
  onBruteForce?: (isActive: boolean) => void;
  bruteForceActive?: boolean;
  language?: LocaleCode;
}

export const CommandField = ({ onCommand, onBruteForce, bruteForceActive = false, language = "en" }: CommandFieldProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [bruteForceActivated, setBruteForceActivated] = useState(false);

  useEffect(() => {
    // Add event listener for Ctrl+Shift+~
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Shift+~ (tilde)
      if (event.ctrlKey && event.shiftKey && event.key === '~') {
        event.preventDefault();
        setOpen(true);
      }

      // ESC key to close
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;

    // Special handling for bruteForce command - toggle mode and keep it active
    if (value === 'bruteForce') {
      const newState = !bruteForceActive;
      if (onBruteForce) {
        onBruteForce(newState);
      }
      setBruteForceActivated(newState);
      // Clear the input but keep dialog open to show the button
      setValue('');
      return; // Exit early to keep dialog open
    }

    // Normal command handling
    if (onCommand) {
      onCommand(value);
    }

    setValue('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      // Only deactivate brute force mode when dialog closes if it wasn't activated by the command
      if (!isOpen && onBruteForce && !bruteForceActivated) {
        onBruteForce(false);
      }
      // Reset the activated flag when dialog closes
      if (!isOpen) {
        setBruteForceActivated(false);
      }
    }}>
      <DialogContent className="p-0 border-none max-w-[450px] absolute top-16 left-4 translate-x-0 translate-y-0">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Terminal className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              value={value}
              onValueChange={setValue}
              placeholder={getTranslation(language, "enterCommand")}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(value);
                }
              }}
            />
          </div>
          <CommandList>
            <CommandEmpty>{getTranslation(language, "noResultsFound")}</CommandEmpty>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CommandField;
