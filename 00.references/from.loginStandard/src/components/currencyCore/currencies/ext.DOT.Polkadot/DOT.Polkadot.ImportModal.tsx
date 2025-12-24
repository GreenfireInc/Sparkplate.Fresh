import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImportGenerationStyle } from '../importGenerationStyle';
import { importPolkadot } from './DOT.Polkadot.Import';
import type { PolkadotImportMethod, PolkadotInputFormat } from './DOT.Polkadot.Import.Types';

interface PolkadotImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (result: any) => void;
}

export const PolkadotImportModal: React.FC<PolkadotImportModalProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const [inputFormat, setInputFormat] = useState<PolkadotInputFormat>('privateKey');
  const [importMethod, setImportMethod] = useState<PolkadotImportMethod>('auto');
  const [inputData, setInputData] = useState('');
  const [password, setPassword] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleImport = async () => {
    if (!inputData.trim()) return;

    setIsImporting(true);
    setResult(null);

    try {
      const importResult = await importPolkadot({
        format: inputFormat,
        data: inputData,
        password: password || undefined,
        method: importMethod
      });

      setResult(importResult);

      if (importResult.success && onSuccess) {
        onSuccess(importResult);
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Import failed'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const resetForm = () => {
    setInputData('');
    setPassword('');
    setResult(null);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Polkadot Wallet</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Import Method Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Import Method</Label>
            <ImportGenerationStyle
              value={importMethod}
              onChange={setImportMethod}
            />
          </div>

          {/* Input Format Selection */}
          <div className="space-y-2">
            <Label htmlFor="format">Input Format</Label>
            <select
              id="format"
              value={inputFormat}
              onChange={(e) => setInputFormat(e.target.value as PolkadotInputFormat)}
              className="w-full p-2 border rounded-md"
            >
              <option value="privateKey">Private Key (64-char hex)</option>
              <option value="mnemonic">Mnemonic Seed (12/24 words)</option>
              <option value="keystore">Encrypted Keystore (.keystore)</option>
              <option value="json">JSON Export (.json)</option>
            </select>
          </div>

          {/* Input Data */}
          <div className="space-y-2">
            <Label htmlFor="input-data">
              {inputFormat === 'privateKey' && 'Private Key'}
              {inputFormat === 'mnemonic' && 'Mnemonic Phrase'}
              {inputFormat === 'keystore' && 'Keystore File'}
              {inputFormat === 'json' && 'JSON Data'}
            </Label>

            {(inputFormat === 'keystore' || inputFormat === 'json') ? (
              <Input
                id="input-data"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    file.text().then(setInputData);
                  }
                }}
                className="w-full"
              />
            ) : inputFormat === 'mnemonic' ? (
              <Textarea
                id="input-data"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter your 12 or 24 word mnemonic phrase..."
                className="w-full min-h-[80px]"
              />
            ) : (
              <Input
                id="input-data"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter your 64-character hex private key..."
                className="w-full"
              />
            )}
          </div>

          {/* Password Field (for encrypted formats) */}
          {inputFormat === 'keystore' && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter keystore password..."
                className="w-full"
              />
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className={`p-3 rounded-md text-sm ${result.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {result.success ? (
                <>
                  <div className="font-medium mb-1">✅ Import Successful</div>
                  <div>Address: {result.address}</div>
                  <div>Method: {result.method}</div>
                </>
              ) : (
                <>
                  <div className="font-medium mb-1">❌ Import Failed</div>
                  <div>{result.error}</div>
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!inputData.trim() || isImporting}
            >
              {isImporting ? 'Importing...' : 'Import Wallet'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
