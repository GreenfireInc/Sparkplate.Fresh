import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { EncryptedData } from './types';
import { useBruteForce } from './useBruteForce';

interface BruteForceStateProps {
  encryptedData: EncryptedData | null;
  onSuccess: (decryptedKey: string) => void;
}

export const BruteForceSection = ({ encryptedData, onSuccess }: BruteForceStateProps) => {
  const wordlistFileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    passwordList,
    setPasswordList,
    isBruteForcing,
    bruteForceProgress,
    bruteForceResult,
    bruteForceError,
    handleWordlistUpload,
    startBruteForce
  } = useBruteForce();

  const handleStartBruteForce = () => {
    startBruteForce(encryptedData, onSuccess);
  };

  return (
    <div className="space-y-4 border-t pt-4 mt-4 bg-gray-50 p-4 rounded-lg animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2">
        <FileText size={16} />
        <h3 className="font-semibold text-black">Brute Force Decryption</h3>
      </div>
      
      <div>
        <Label htmlFor="password-list" className="text-black">Password List</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Enter passwords (one per line) or upload a wordlist file
        </p>
        
        <div className="flex gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => wordlistFileInputRef.current?.click()}
            disabled={isBruteForcing}
          >
            <Upload size={14} className="mr-1" />
            Upload Wordlist
          </Button>
          <input
            ref={wordlistFileInputRef}
            type="file"
            accept=".txt,.lst"
            className="hidden"
            onChange={handleWordlistUpload}
          />
        </div>
        
        <Textarea
          id="password-list"
          placeholder="password1&#10;password2&#10;mypassword123&#10;..."
          value={passwordList}
          onChange={(e) => setPasswordList(e.target.value)}
          className="min-h-[100px] font-mono text-sm"
          disabled={isBruteForcing}
        />
        
        {passwordList && (
          <p className="text-sm text-muted-foreground mt-1">
            {passwordList.split('\n').filter(p => p.trim()).length} passwords loaded
          </p>
        )}
      </div>

      {/* Progress Display */}
      {isBruteForcing && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Trying: {bruteForceProgress.currentPassword} ({bruteForceProgress.current}/{bruteForceProgress.total})
          </div>
          <Progress 
            value={(bruteForceProgress.current / bruteForceProgress.total) * 100} 
            className="h-2"
          />
        </div>
      )}

      {/* Error Display */}
      {bruteForceError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {bruteForceError}
        </div>
      )}

      {/* Success Result */}
      {bruteForceResult && (
        <div className="space-y-3 border p-3 rounded bg-green-50 border-green-200">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle size={16} />
            <span className="font-medium">Decryption Successful!</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Found password after {bruteForceResult.attempts} attempts:
            </p>
            <code className="text-sm bg-white p-2 rounded border block">
              {bruteForceResult.password}
            </code>
          </div>
        </div>
      )}

      {/* Brute Force Action Button */}
      <Button
        onClick={handleStartBruteForce}
        disabled={isBruteForcing || !passwordList.trim()}
        variant="destructive"
        className="w-full"
      >
        {isBruteForcing ? 'Brute Forcing...' : 'Start Brute Force'}
      </Button>
    </div>
  );
};
