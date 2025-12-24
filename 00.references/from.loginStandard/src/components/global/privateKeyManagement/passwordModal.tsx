import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, Shield, Database } from "lucide-react";
import { toast } from "sonner";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  exportFormat: 'keystore' | 'json-encrypted' | 'wallet-dat-encrypted';
  isExporting?: boolean;
}

export const PasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
  exportFormat,
  isExporting = false
}: PasswordModalProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleConfirm = () => {
    if (!password) {
      toast.error(`Password is required for ${exportFormat === 'keystore' ? 'keystore' : 'BIP38'} export`);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    onConfirm(password);
    // Clear sensitive data
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    // Clear sensitive data
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const getModalTitle = () => {
    if (exportFormat === 'keystore') {
      return "Encrypted Keystore Password";
    } else if (exportFormat === 'json-encrypted') {
      return "BIP38 Encryption Password";
    } else if (exportFormat === 'wallet-dat-encrypted') {
      return "Wallet.dat Encryption Password";
    }
    return "Encryption Password";
  };

  const getModalDescription = () => {
    if (exportFormat === 'keystore') {
      return "Enter a strong password to encrypt your keystore file. This password will be required to import the file later.";
    } else if (exportFormat === 'json-encrypted') {
      return "Enter a strong password for BIP38 encryption. This follows the Bitcoin standard for encrypting private keys.";
    } else if (exportFormat === 'wallet-dat-encrypted') {
      return "Enter a strong password to encrypt your wallet.dat file. This creates a Bitcoin-compatible encrypted wallet.";
    }
    return "Enter a strong password for encryption.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {exportFormat === 'keystore' ? (
              <Lock size={20} />
            ) : exportFormat === 'json-encrypted' ? (
              <Shield size={20} />
            ) : (
              <Database size={20} />
            )}
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription>
            {getModalDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="modal-password" className="text-sm">Password</Label>
            <div className="relative">
              <Input
                id="modal-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter encryption password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                disabled={isExporting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-200 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
                disabled={isExporting}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="modal-confirm-password" className="text-sm">Confirm Password</Label>
            <div className="relative">
              <Input
                id="modal-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm encryption password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
                disabled={isExporting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-200 transition-colors"
                title={showConfirmPassword ? "Hide password" : "Show password"}
                disabled={isExporting}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {password && password.length < 8 && (
            <p className="text-xs text-destructive">Password must be at least 8 characters long</p>
          )}

          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-destructive">Passwords do not match</p>
          )}

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="text-yellow-600 mt-0.5">⚠️</div>
              <div className="text-sm">
                <div className="font-medium text-yellow-800">Security Reminder</div>
                <div className="text-yellow-700 mt-1">
                  Keep this password secure. You will need it to import your encrypted {exportFormat === 'keystore' ? 'keystore' : 'BIP38'} file.
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              isExporting ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              password.length < 8
            }
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Encrypting...
              </>
            ) : (
              <>
                <Lock size={16} />
                Encrypt & Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordModal;
