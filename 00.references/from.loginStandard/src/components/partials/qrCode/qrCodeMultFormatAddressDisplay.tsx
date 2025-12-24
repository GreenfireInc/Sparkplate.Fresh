import React, { useState, useEffect } from 'react';

interface AddressOption {
  network: string;
  address: string;
  fullAddress: string; // e.g., "DOT://address"
}

interface QrCodeMultFormatAddressDisplayProps {
  formattedDisplay: string;
  onAddressChange: (address: string, network: string) => void;
  className?: string;
}

export const QrCodeMultFormatAddressDisplay: React.FC<QrCodeMultFormatAddressDisplayProps> = ({
  formattedDisplay,
  onAddressChange,
  className = ""
}) => {
  const [addressOptions, setAddressOptions] = useState<AddressOption[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');

  useEffect(() => {
    // Parse the formattedDisplay string to extract network options
    const lines = formattedDisplay.split('\n').filter(line => line.trim());
    const options: AddressOption[] = lines.map(line => {
      const [networkPart, address] = line.split('://');
      return {
        network: networkPart,
        address: address,
        fullAddress: line
      };
    });

    setAddressOptions(options);

    // Default to first option (usually DOT)
    if (options.length > 0 && !selectedNetwork) {
      setSelectedNetwork(options[0].network);
      onAddressChange(options[0].address, options[0].network);
    }
  }, [formattedDisplay, onAddressChange, selectedNetwork]);

  const handleNetworkSelect = (network: string) => {
    setSelectedNetwork(network);
    const selectedOption = addressOptions.find(option => option.network === network);
    if (selectedOption) {
      onAddressChange(selectedOption.address, selectedOption.network);
    }
  };

  if (addressOptions.length === 0) {
    return null;
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
        {addressOptions.map((option) => (
          <button
            key={option.network}
            onClick={() => handleNetworkSelect(option.network)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              selectedNetwork === option.network
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-750'
            }`}
          >
            {option.network}
          </button>
        ))}
      </div>
    </div>
  );
};
