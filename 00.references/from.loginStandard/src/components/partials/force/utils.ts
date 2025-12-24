import CryptoJS from 'crypto-js';

/**
 * Validates if the encrypted data is in OpenSSL format
 */
export const validateOpenSSLFormat = (encryptedData: string): boolean => {
  return encryptedData.startsWith('U2FsdGVkX1');
};

/**
 * Attempts to decrypt encrypted data with a given password
 * Returns the decrypted string if successful, null if failed
 */
export const decryptWithPassword = (encryptedData: string, password: string): string | null => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    // Basic validation - check if we got any meaningful content
    if (decryptedString && decryptedString.length > 0) {
      return decryptedString;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Reads a file as text and returns its content
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
