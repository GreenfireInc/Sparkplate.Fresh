import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Server } from "lucide-react";
import { NetworkStatus } from "@/components/global/network/networkStatus";
import { getTranslation, type LocaleCode } from "@/lib/i18n";

type ConnectionType = "ldap" | "activedirectory" | "webrtc" | "colyseus";

interface ServerSelectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language?: LocaleCode;
}

export const ServerSelection = ({ open, onOpenChange, language = 'en' }: ServerSelectionProps) => {
  const [serverUrl, setServerUrl] = useState<string>("");
  const [connectionType, setConnectionType] = useState<ConnectionType>("ldap");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const handleConnect = () => {
    if (!serverUrl) return;
    
    setIsConnecting(true);
    // Simulate connection attempt
    setTimeout(() => {
      console.log(`Connecting via ${connectionType}: ${serverUrl}`);
      setIsConnecting(false);
      onOpenChange(false);
    }, 1500);
  };

  const getPlaceholder = () => {
    switch (connectionType) {
      case "ldap":
        return "ldap://ldap.example.com:389";
      case "activedirectory":
        return "ldap://ad.example.com:389";
      case "webrtc":
        return "wss://webrtc.example.com:9000";
      case "colyseus":
        return "ws://colyseus.example.com:2567";
      default:
        return "ldap://ldap.example.com:389";
    }
  };

  const getDescription = (language: LocaleCode = 'en') => {
    switch (connectionType) {
      case "ldap":
        return getTranslation(language, 'ldapDescription' as keyof typeof import('@/locales').defaultTranslations);
      case "activedirectory":
        return getTranslation(language, 'adDescription' as keyof typeof import('@/locales').defaultTranslations);
      case "webrtc":
        return getTranslation(language, 'webrtcDescription' as keyof typeof import('@/locales').defaultTranslations);
      case "colyseus":
        return getTranslation(language, 'colyseusDescription' as keyof typeof import('@/locales').defaultTranslations);
      default:
        return getTranslation(language, 'selectLoginMethodDescription' as keyof typeof import('@/locales').defaultTranslations);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <span>{getTranslation(language, 'connectToServerTitle' as keyof typeof import('@/locales').defaultTranslations)}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-grow space-y-4 py-4">
          {/* Login Method Selection */}
          <div className="space-y-2">
            <Label htmlFor="login-method">{getTranslation(language, 'loginMethod' as keyof typeof import('@/locales').defaultTranslations)}</Label>
            <Select value={connectionType} onValueChange={(value) => setConnectionType(value as ConnectionType)}>
              <SelectTrigger id="login-method" className="w-full">
                <SelectValue placeholder={getTranslation(language, 'selectLoginMethod' as keyof typeof import('@/locales').defaultTranslations)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ldap">{getTranslation(language, 'loginViaLdap' as keyof typeof import('@/locales').defaultTranslations)}</SelectItem>
                <SelectItem value="activedirectory">{getTranslation(language, 'activeDirectory' as keyof typeof import('@/locales').defaultTranslations)}</SelectItem>
                <SelectItem value="webrtc">{getTranslation(language, 'webRTC' as keyof typeof import('@/locales').defaultTranslations)}</SelectItem>
                <SelectItem value="colyseus">{getTranslation(language, 'colyseus' as keyof typeof import('@/locales').defaultTranslations)}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Server URL Input */}
          <div className="space-y-2">
            <Label htmlFor="server-url">{getTranslation(language, 'serverUrl' as keyof typeof import('@/locales').defaultTranslations)}</Label>
            <Input
              id="server-url"
              placeholder={getPlaceholder()}
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="text-xs text-white">{getDescription(language)}</div>
        </div>
        
        <div className="flex justify-between items-end pt-4">
          <NetworkStatus showLocalIp={true} hideStatus={true} vertical={true} language={language} />
          <Button
            onClick={handleConnect}
            disabled={!serverUrl || isConnecting}
            className="flex items-center gap-2"
          >
            {isConnecting ? getTranslation(language, 'connecting' as keyof typeof import('@/locales').defaultTranslations) : getTranslation(language, 'connect' as keyof typeof import('@/locales').defaultTranslations)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSelection;

