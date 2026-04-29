/**
 * Seed phrase file import structure
 * Handles importing mnemonic seed phrases from JSON and CSV files
 * Supports fields: mnemonicSeedPhrase and seedPhrase
 */

export interface SeedPhraseImportResult {
  seedPhrase: string;
  success: boolean;
  error?: string;
}

/**
 * Validate seed phrase format and length
 */
function validateSeedPhrase(phrase: string): { valid: boolean; error?: string } {
  const trimmed = phrase.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: "Seed phrase cannot be empty" };
  }
  
  if (trimmed.length > 500) {
    return { valid: false, error: "Seed phrase is too long (max 500 characters)" };
  }
  
  // Basic validation: check if it contains words separated by spaces
  const words = trimmed.split(/\s+/);
  if (words.length < 12 || words.length > 33) {
    return { valid: false, error: "Seed phrase must contain between 12 and 33 words" };
  }
  
  return { valid: true };
}

/**
 * Extract seed phrase from JSON data
 * Looks for fields: mnemonicSeedPhrase or seedPhrase
 */
function extractSeedPhraseFromJSON(data: unknown): string | null {
  // Type guard to check if data is an object
  if (typeof data !== 'object' || data === null) {
    return null;
  }
  
  const obj = data as Record<string, unknown>;
  
  // Try mnemonicSeedPhrase first, then seedPhrase
  if (obj.mnemonicSeedPhrase && typeof obj.mnemonicSeedPhrase === 'string') {
    return obj.mnemonicSeedPhrase;
  }
  
  if (obj.seedPhrase && typeof obj.seedPhrase === 'string') {
    return obj.seedPhrase;
  }
  
  return null;
}

/**
 * Parse CSV content and extract seed phrase
 * Looks for fields: mnemonicSeedPhrase or seedPhrase
 */
function extractSeedPhraseFromCSV(csvContent: string): string | null {
  const lines = csvContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  if (lines.length === 0) {
    return null;
  }
  
  // Parse header row to find column index
  const header = lines[0].toLowerCase();
  let mnemonicIndex = -1;
  let seedPhraseIndex = -1;
  
  // Handle quoted CSV values
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // Skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };
  
  const headerFields = parseCSVLine(header);
  
  // Find column indices
  headerFields.forEach((field, index) => {
    const normalized = field.toLowerCase().replace(/"/g, '');
    if (normalized === 'mnemonicseedphrase' || normalized === 'mnemonic seed phrase') {
      mnemonicIndex = index;
    } else if (normalized === 'seedphrase' || normalized === 'seed phrase') {
      seedPhraseIndex = index;
    }
  });
  
  // Search through data rows
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    
    // Try mnemonicSeedPhrase first
    if (mnemonicIndex >= 0 && mnemonicIndex < fields.length) {
      const value = fields[mnemonicIndex].replace(/^"|"$/g, ''); // Remove surrounding quotes
      if (value && value.trim().length > 0) {
        return value.trim();
      }
    }
    
    // Try seedPhrase
    if (seedPhraseIndex >= 0 && seedPhraseIndex < fields.length) {
      const value = fields[seedPhraseIndex].replace(/^"|"$/g, ''); // Remove surrounding quotes
      if (value && value.trim().length > 0) {
        return value.trim();
      }
    }
  }
  
  // If no header found, try to find seed phrase in any field
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    for (const field of fields) {
      const value = field.replace(/^"|"$/g, '').trim();
      // Check if this looks like a seed phrase (multiple words)
      const words = value.split(/\s+/);
      if (words.length >= 12 && words.length <= 33) {
        return value;
      }
    }
  }
  
  return null;
}

/**
 * Import seed phrase from JSON file
 */
export async function importSeedPhraseFromJSON(file: File): Promise<SeedPhraseImportResult> {
  // Validate file size (max 1MB)
  if (file.size > 1024 * 1024) {
    return {
      seedPhrase: '',
      success: false,
      error: "File is too large (max 1MB)",
    };
  }
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        const seedPhrase = extractSeedPhraseFromJSON(data);
        
        if (!seedPhrase) {
          resolve({
            seedPhrase: '',
            success: false,
            error: "Invalid JSON structure: missing 'mnemonicSeedPhrase' or 'seedPhrase' field",
          });
          return;
        }
        
        const validation = validateSeedPhrase(seedPhrase);
        if (!validation.valid) {
          resolve({
            seedPhrase: '',
            success: false,
            error: validation.error,
          });
          return;
        }
        
        resolve({
          seedPhrase: seedPhrase.trim(),
          success: true,
        });
      } catch (error) {
        resolve({
          seedPhrase: '',
          success: false,
          error: error instanceof Error ? error.message : "Invalid JSON file format",
        });
      }
    };
    
    reader.onerror = () => {
      resolve({
        seedPhrase: '',
        success: false,
        error: "Failed to read file",
      });
    };
    
    reader.readAsText(file);
  });
}

/**
 * Import seed phrase from CSV file
 */
export async function importSeedPhraseFromCSV(file: File): Promise<SeedPhraseImportResult> {
  // Validate file size (max 1MB)
  if (file.size > 1024 * 1024) {
    return {
      seedPhrase: '',
      success: false,
      error: "File is too large (max 1MB)",
    };
  }
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const seedPhrase = extractSeedPhraseFromCSV(content);
        
        if (!seedPhrase) {
          resolve({
            seedPhrase: '',
            success: false,
            error: "Could not find 'mnemonicSeedPhrase' or 'seedPhrase' field in CSV file",
          });
          return;
        }
        
        const validation = validateSeedPhrase(seedPhrase);
        if (!validation.valid) {
          resolve({
            seedPhrase: '',
            success: false,
            error: validation.error,
          });
          return;
        }
        
        resolve({
          seedPhrase: seedPhrase.trim(),
          success: true,
        });
      } catch (error) {
        resolve({
          seedPhrase: '',
          success: false,
          error: error instanceof Error ? error.message : "Invalid CSV file format",
        });
      }
    };
    
    reader.onerror = () => {
      resolve({
        seedPhrase: '',
        success: false,
        error: "Failed to read file",
      });
    };
    
    reader.readAsText(file);
  });
}

/**
 * Import seed phrase from file (auto-detects format based on file extension)
 */
export async function importSeedPhraseFromFile(file: File): Promise<SeedPhraseImportResult> {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.json')) {
    return importSeedPhraseFromJSON(file);
  } else if (fileName.endsWith('.csv')) {
    return importSeedPhraseFromCSV(file);
  } else {
    return {
      seedPhrase: '',
      success: false,
      error: "Unsupported file type. Please upload a JSON or CSV file",
    };
  }
}

