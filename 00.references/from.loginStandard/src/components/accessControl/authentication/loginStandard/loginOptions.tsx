import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Fingerprint, Key, Server } from "lucide-react";
import { getTranslation, type LocaleCode } from "@/lib/i18n";

interface LoginOptionsProps {
  onTemporaryKeyClick?: () => void;
  onServerSelectionClick?: () => void;
  language?: LocaleCode;
}

export const LoginOptions = ({ onTemporaryKeyClick, onServerSelectionClick, language = 'en' }: LoginOptionsProps) => {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    console.log(`Selected login option: ${option}`);
    setOpen(false);
  };

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                <Fingerprint className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-card text-card-foreground">
            <p>{getTranslation(language, 'signInOptions' as keyof typeof import('@/locales').defaultTranslations)}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="w-48 p-2 bg-card border-white/20" align="end" side="top">
          <div className="space-y-1">
            <button
              onClick={() => {
                handleOptionClick("Temporary privateKey");
                onTemporaryKeyClick?.();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            >
              <Key className="h-4 w-4" />
              <span>{getTranslation(language, 'tempPrivateKey' as keyof typeof import('@/locales').defaultTranslations)}</span>
            </button>
            <button
              onClick={() => {
                handleOptionClick("Connect to Server");
                onServerSelectionClick?.();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            >
              <Server className="h-4 w-4" />
              <span>{getTranslation(language, 'connectToServer' as keyof typeof import('@/locales').defaultTranslations)}</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default LoginOptions;
