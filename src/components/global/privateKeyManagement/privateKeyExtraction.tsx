import React from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
import { getTranslation, type LocaleCode } from "@/lib/i18n";

interface DerivedInfo {
  derivedPrivateKey?: string;
}

interface PrivateKeyExtractionProps {
  ticker: string;
  derived: DerivedInfo | null;
  showPrivateKey: boolean;
  setShowPrivateKey: (show: boolean) => void;
  copyToClipboard: (text: string, label: string) => void;
  language: LocaleCode;
}

export const PrivateKeyExtraction: React.FC<PrivateKeyExtractionProps> = ({
  ticker,
  derived,
  showPrivateKey,
  setShowPrivateKey,
  copyToClipboard,
  language,
}) => {
  // Only show for STX (Stacks) when derived private key exists
  if (ticker !== "STX" || !derived || !derived.derivedPrivateKey) {
    return null;
  }

  return (
    <div className="mt-2 text-xs break-all text-muted-foreground text-center w-full max-w-[520px] flex items-center justify-center gap-2">
      <div className="flex-grow text-center">
        <span className="break-all">
          privateKey.{ticker}://{showPrivateKey ? derived.derivedPrivateKey : '•'.repeat(Math.min(derived.derivedPrivateKey.length, 64))}
        </span>
      </div>
      <button
        onClick={() => setShowPrivateKey(!showPrivateKey)}
        className="p-1 rounded hover:bg-gray-200 transition-colors"
        title={showPrivateKey ? getTranslation(language, "hidePrivateKey") : getTranslation(language, "showPrivateKey")}
      >
        {showPrivateKey ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      <button
        onClick={() => copyToClipboard(derived.derivedPrivateKey, getTranslation(language, "privateKey"))}
        className="p-1 rounded hover:bg-gray-200 transition-colors"
        title={getTranslation(language, "copyPrivateKey")}
      >
        <Copy size={16} />
      </button>
    </div>
  );
};

export default PrivateKeyExtraction;
