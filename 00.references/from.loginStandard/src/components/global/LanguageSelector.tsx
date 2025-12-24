import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { languages, type LocaleCode } from "@/lib/i18n";

interface LanguageSelectorProps {
  value?: LocaleCode; // language code (e.g., "en")
  onChange?: (code: LocaleCode) => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps = {}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    if (!value) return;
    const lang = languages.find((l) => l.code === value) || languages[0];
    setSelectedLanguage(lang);
  }, [value]);

  const handleSelect = (code: LocaleCode) => {
    const lang = languages.find((l) => l.code === code) || languages[0];
    setSelectedLanguage(lang);
    onChange?.(lang.code as LocaleCode);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
          <span className="text-lg">{selectedLanguage.flag}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2 bg-card border-white/20" align="end">
        <div className="space-y-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleSelect(language.code as LocaleCode)}
              className="w-full flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;


