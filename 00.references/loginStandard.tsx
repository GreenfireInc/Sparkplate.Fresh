import { useState } from "react";
import { SignupModal } from "@/components/accessControl/authentication/registration";
import { UserModal } from "@/components/accessControl/authentication/user";
import { LanguageSelector } from "@/components/global";
import { getTranslation, type LocaleCode } from "@/lib/i18n";
import { LoginOptions } from "./loginOptions";
import { TemporaryKeyModal, ServerSelection } from "./options";
import { IconBackground } from "@/components/partials/loginstandard/iconBackground";
import { MarqueeTicker } from "@/components/partials/marqueeTicker";
import { CommandField } from "@/components/global/keybindings";
import { getMockUsers, handleUserSelect, UserSelection } from "@/service/userManagement";

export const LoginStandard = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>("");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [language, setLanguage] = useState<LocaleCode>("en");
  const [showTemporaryKeyModal, setShowTemporaryKeyModal] = useState(false);
  const [showServerSelectionModal, setShowServerSelectionModal] = useState(false);
  const [bruteForceMode, setBruteForceMode] = useState(false);

  
  // App version from package.json via Vite environment variables
  const appVersion = import.meta.env.VITE_APP_VERSION;

  // Get mock users from the user management service
  const mockUsers = getMockUsers(language, getTranslation);

  // Handle user selection using the user management service
  const onUserSelect = (userName: string) => {
    handleUserSelect(
      userName,
      mockUsers,
      getTranslation,
      language,
      setSelectedUser,
      setSelectedUserEmail,
      setShowSignupModal,
      setShowUserModal
    );
  };

  return (
    <div className="min-h-screen bg-gradient-windows flex flex-col font-windows relative">
      {/* MarqueeTicker at the top */}
      <div className="w-full z-30 relative">
        <MarqueeTicker language={language} />
      </div>
      
      {/* Icon Background */}
      <IconBackground />
      {/* User Selection Component */}
      <UserSelection
        mockUsers={mockUsers}
        selectedUser={selectedUser}
        language={language}
        onUserSelect={onUserSelect}
      />

      {/* Main Login Area - Center/Right */}
      <div className="flex-1 flex items-center justify-center p-8 z-10">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img
              src="/assets/icons/greenfire/proper/greenfire.black.svg"
              alt="Greenfire logo"
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-xl font-light mb-2">{getTranslation(language, "welcome")}</h2>
          <p className="text-white/80 font-light">{getTranslation(language, "selectUserPrompt")}</p>
        </div>
      </div>

      {/* Bottom Right Options */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2 z-10">
        <div className="flex items-center gap-2">
          <LanguageSelector value={language} onChange={setLanguage} />
          <LoginOptions
            onTemporaryKeyClick={() => setShowTemporaryKeyModal(true)}
            onServerSelectionClick={() => setShowServerSelectionModal(true)}
            language={language}
          />
        </div>
        <p className="text-white/60 text-xs">Ver. {appVersion}</p>
      </div>

      {/* Modals */}
      <SignupModal open={showSignupModal} onOpenChange={setShowSignupModal} language={language} />
      <UserModal 
        open={showUserModal} 
        onOpenChange={setShowUserModal} 
        userName={selectedUser}
        userEmail={selectedUserEmail}
        language={language} 
      />
      <TemporaryKeyModal
        open={showTemporaryKeyModal}
        onOpenChange={setShowTemporaryKeyModal}
        bruteForceMode={bruteForceMode}
        onBruteForceModeChange={setBruteForceMode}
        language={language}
      />
      <ServerSelection open={showServerSelectionModal} onOpenChange={setShowServerSelectionModal} language={language} />
      <CommandField
        onCommand={command => {
          console.log(`Command executed: ${command}`);
          // Add command handling logic here
        }}
        onBruteForce={setBruteForceMode}
        bruteForceActive={bruteForceMode}
        language={language}
      />
    </div>
  );
};

export default LoginStandard;
