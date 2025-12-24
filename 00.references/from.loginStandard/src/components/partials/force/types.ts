export interface BruteForceResult {
  privateKey: string;
  password: string;
  attempts: number;
}

export interface BruteForceProgress {
  current: number;
  total: number;
  currentPassword: string;
}

export interface EncryptedData {
  type: string;
  data: unknown;
}
