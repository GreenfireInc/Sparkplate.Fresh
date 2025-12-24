import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { getTranslation, type LocaleCode } from "@/lib/i18n";
import md5 from "blueimp-md5";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language?: LocaleCode;
}

export const SignupModal = ({ open, onOpenChange, language = "en" }: SignupModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const handleSignup = () => {
    if (firstName && lastName && email && password) {
      console.log("Creating account:", { firstName, lastName, email, password });
      // Handle signup logic here
      onOpenChange(false);
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const trimmed = value.trim().toLowerCase();
    if (trimmed && /.+@.+\..+/.test(trimmed)) {
      const hash = md5(trimmed);
      setAvatarUrl(`https://www.gravatar.com/avatar/${hash}?d=identicon`);
    } else {
      setAvatarUrl("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm bg-card rounded-2xl shadow-login-panel overflow-hidden p-0">
        {/* Blue Header Section */}
        <div className="bg-primary px-8 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-16 h-16 object-cover" />
            ) : (
              <User className="w-8 h-8 text-white" />
            )}
          </div>
          <DialogHeader className="sm:text-center">
            <DialogTitle className="text-2xl font-light text-white">{getTranslation(language, "createAccount")}</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 mt-1 font-light">{getTranslation(language, "enterDetailsToSignup")}</p>
        </div>

        {/* White Content Section */}
        <div className="px-8 py-6 space-y-4">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">{getTranslation(language, "firstName")}</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="firstName"
                type="text"
                placeholder={getTranslation(language, "firstName")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-input border-border text-card-foreground placeholder:text-muted-foreground rounded h-10 pl-10 focus:border-primary focus:ring-primary/30 transition-all duration-200"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">{getTranslation(language, "lastName")}</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="lastName"
                type="text"
                placeholder={getTranslation(language, "lastName")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-input border-border text-card-foreground placeholder:text-muted-foreground rounded h-10 pl-10 focus:border-primary focus:ring-primary/30 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">{getTranslation(language, "email")}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={getTranslation(language, "emailAddress")}
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className="w-full bg-input border-border text-card-foreground placeholder:text-muted-foreground rounded h-10 pl-10 focus:border-primary focus:ring-primary/30 transition-all duration-200"
              />
            </div>
          </div>

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
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
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
          <span className="text-xs text-muted-foreground">{getTranslation(language, "doubleCheckPassword")}</span>
          <Button
            onClick={handleSignup}
            disabled={!firstName || !lastName || !email || !password}
            className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-medium rounded h-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getTranslation(language, "createAccount")}
          </Button>

          {/* <div className="mt-6 text-center space-x-4 text-xs text-muted-foreground">
            <button className="hover:underline">Privacy & cookies</button>
            <button className="hover:underline">Terms of use</button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;

