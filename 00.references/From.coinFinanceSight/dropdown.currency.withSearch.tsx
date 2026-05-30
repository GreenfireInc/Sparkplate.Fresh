import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CryptoOption {
  value: string;
  label: string;
  color: string;
  icon?: string;
}

export const CryptoOptionIcon = ({ option }: { option: CryptoOption }) => {
  if (option.icon) {
    return (
      <img
        src={option.icon}
        alt=""
        className="h-4 w-4 shrink-0 rounded-full object-contain"
      />
    );
  }

  return <div className={`h-4 w-4 shrink-0 rounded-full bg-${option.color}`} />;
};

export const CryptoOptionLabel = ({ option }: { option: CryptoOption }) => (
  <div className="flex items-center space-x-2">
    <CryptoOptionIcon option={option} />
    <span>{option.label}</span>
  </div>
);

interface DropdownCurrencyWithSearchProps {
  selectedCrypto: string;
  setSelectedCrypto: (value: string) => void;
  cryptoOptions: CryptoOption[];
}

export const DropdownCurrencyWithSearch = ({
  selectedCrypto,
  setSelectedCrypto,
  cryptoOptions,
}: DropdownCurrencyWithSearchProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = cryptoOptions.find((crypto) => crypto.value === selectedCrypto);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Cryptocurrency</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background border-border"
          >
            {selectedOption ? (
              <CryptoOptionLabel option={selectedOption} />
            ) : (
              "Select cryptocurrency..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0 bg-popover border-border z-50" align="start">
          <Command>
            <CommandInput placeholder="Search cryptocurrency..." />
            <CommandEmpty>No cryptocurrency found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {cryptoOptions.map((crypto) => (
                  <CommandItem
                    key={crypto.value}
                    value={crypto.value}
                    onSelect={(currentValue) => {
                      setSelectedCrypto(currentValue === selectedCrypto ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCrypto === crypto.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <CryptoOptionLabel option={crypto} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
