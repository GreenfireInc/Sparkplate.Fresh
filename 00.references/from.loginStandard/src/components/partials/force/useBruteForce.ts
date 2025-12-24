import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { BruteForceResult, BruteForceProgress, EncryptedData } from './types';
import { validateOpenSSLFormat, decryptWithPassword, readFileAsText } from './utils';

export const useBruteForce = () => {
  const [passwordList, setPasswordList] = useState("");
  const [isBruteForcing, setIsBruteForcing] = useState(false);
  const [bruteForceProgress, setBruteForceProgress] = useState<BruteForceProgress>({ 
    current: 0, 
    total: 0, 
    currentPassword: '' 
  });
  const [bruteForceResult, setBruteForceResult] = useState<BruteForceResult | null>(null);
  const [bruteForceError, setBruteForceError] = useState<string | null>(null);

  const handleWordlistUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setPasswordList(content);
        toast.success(`Loaded ${content.split('\n').filter(p => p.trim()).length} passwords`);
      };
      reader.readAsText(file);
    }
  }, []);

  const startBruteForce = useCallback(async (
    encryptedData: EncryptedData | null,
    onSuccess: (decryptedKey: string) => void
  ) => {
    if (!encryptedData) {
      setBruteForceError('No encrypted data available for brute force');
      return;
    }

    if (!passwordList.trim()) {
      setBruteForceError('Please enter a list of passwords to try');
      return;
    }

    // Convert encrypted data to string format for brute force
    let encryptedString = '';
    try {
      if (encryptedData.type === 'dash' && typeof encryptedData.data === 'string') {
        encryptedString = encryptedData.data;
      } else {
        // For other keystore types, we'll need to convert to OpenSSL format or handle differently
        setBruteForceError('Brute force is currently only supported for OpenSSL encrypted data (like Dash wallets)');
        return;
      }
    } catch (error) {
      setBruteForceError('Could not prepare data for brute force attack');
      return;
    }

    if (!validateOpenSSLFormat(encryptedString)) {
      setBruteForceError('Invalid OpenSSL format. The key should start with "U2FsdGVkX1" when base64 encoded.');
      return;
    }

    const passwords = passwordList
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    if (passwords.length === 0) {
      setBruteForceError('No valid passwords found in the list');
      return;
    }

    setIsBruteForcing(true);
    setBruteForceError(null);
    setBruteForceResult(null);
    setBruteForceProgress({ current: 0, total: passwords.length, currentPassword: '' });

    // Process passwords in batches to avoid blocking the UI
    const batchSize = 10;
    let found = false;

    for (let i = 0; i < passwords.length && !found; i += batchSize) {
      const batch = passwords.slice(i, Math.min(i + batchSize, passwords.length));
      
      await new Promise(resolve => setTimeout(resolve, 10)); // Allow UI updates

      for (let j = 0; j < batch.length && !found; j++) {
        const currentIndex = i + j;
        const password = batch[j];
        
        setBruteForceProgress({
          current: currentIndex + 1,
          total: passwords.length,
          currentPassword: password
        });

        const decrypted = decryptWithPassword(encryptedString, password);
        
        if (decrypted) {
          setBruteForceResult({
            privateKey: decrypted,
            password: password,
            attempts: currentIndex + 1
          });
          found = true;
          toast.success(`Wallet decrypted after ${currentIndex + 1} attempts!`);
          onSuccess(decrypted); // Update the main input with the decrypted key
        }
      }
    }

    if (!found) {
      setBruteForceError(`Failed to decrypt with all ${passwords.length} passwords`);
      toast.error("Brute force failed - none of the passwords worked");
    }

    setIsBruteForcing(false);
  }, [passwordList]);

  const resetBruteForce = useCallback(() => {
    setPasswordList("");
    setIsBruteForcing(false);
    setBruteForceProgress({ current: 0, total: 0, currentPassword: '' });
    setBruteForceResult(null);
    setBruteForceError(null);
  }, []);

  return {
    passwordList,
    setPasswordList,
    isBruteForcing,
    bruteForceProgress,
    bruteForceResult,
    bruteForceError,
    handleWordlistUpload,
    startBruteForce,
    resetBruteForce
  };
};
