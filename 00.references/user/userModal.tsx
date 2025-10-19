import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { getTranslation, type LocaleCode } from "@/lib/i18n";

interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userEmail: string;
  language?: LocaleCode;
}

export const UserModal = ({ open, onOpenChange, userName, userEmail, language = "en" }: UserModalProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (password) {
      console.log(`Signing in as ${userName} with password: ${password}`);
      // Handle sign in logic here
      onOpenChange(false);
      // Reset form
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm bg-card rounded-2xl shadow-login-panel overflow-hidden p-0">
        {/* Blue Header Section */}
        <div className="bg-primary px-8 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            <User className="w-8 h-8 text-white" />
          </div>
          <DialogHeader className="sm:text-center">
            <DialogTitle className="text-2xl font-light text-white">{userName}</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 mt-1 font-light">{userEmail}</p>
        </div>

        {/* White Content Section */}
        <div className="px-8 py-6 space-y-4">
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">{getTranslation(language, "password")}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={getTranslation(language, "password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-input border-border text-card-foreground placeholder:text-muted-foreground rounded h-10 pl-10 pr-10 focus:border-primary focus:ring-primary/30 transition-all duration-200"
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleSignIn}
            disabled={!password}
            className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-medium rounded h-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getTranslation(language, "signIn")}
          </Button>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <button className="text-primary hover:underline text-sm font-medium">
              {getTranslation(language, "forgotPassword")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;

