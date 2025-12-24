import { useState, useEffect, useCallback } from "react";
import { Wifi, Globe, WifiOff } from "lucide-react";
import { getTranslation, type LocaleCode } from "@/lib/i18n";

interface NetworkStatusProps {
  vertical?: boolean;
  hideStatus?: boolean;
  showLocalIp?: boolean;
  className?: string;
  language?: LocaleCode;
}

export const NetworkStatus = ({
  vertical = false,
  hideStatus = false,
  showLocalIp = true,
  className = "",
  language = 'en'
}: NetworkStatusProps) => {
  const [isOnlineStatus, setIsOnlineStatus] = useState<boolean>(navigator.onLine);
  const [publicIp, setPublicIp] = useState<string>("");
  const [localIp, setLocalIp] = useState<string>("");

  const fetchPublicIP = useCallback(async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching public IP:", error);
      return null;
    }
  }, []);

  const fetchLocalIP = useCallback(async () => {
    try {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      return new Promise<string>((resolve) => {
        let resolved = false;

        const timeoutId = window.setTimeout(() => {
          if (!resolved) {
            pc.close();
            resolve("192.168.xx.xx"); // Fallback
          }
        }, 1500);

        pc.onicecandidate = (ice) => {
          if (resolved || !ice || !ice.candidate || !ice.candidate.candidate) {
            return;
          }

          const candidateStr = ice.candidate.candidate;
          // We are only interested in host candidates for local IP
          if (candidateStr.includes("typ host")) {
            const ipMatch = candidateStr.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
            if (ipMatch && ipMatch[0] && ipMatch[0] !== "127.0.0.1") {
              const localIP = ipMatch[0];
              console.log("Resolved local IP:", localIP);
              
              window.clearTimeout(timeoutId);
              pc.close();
              if (!resolved) {
                resolved = true;
                resolve(localIP);
              }
            }
          }
        };

        pc.createDataChannel("");
        pc.createOffer()
          .then(offer => pc.setLocalDescription(offer))
          .catch(() => {
            if (!resolved) {
              window.clearTimeout(timeoutId);
              pc.close();
              resolved = true;
              resolve("192.168.1.x"); // Fallback
            }
          });
      });
    } catch (error) {
      console.error("Error fetching local IP:", error);
      return "192.168.x.x"; // Fallback
    }
  }, []);

  const checkConnection = useCallback(async () => {
    try {
      setIsOnlineStatus(navigator.onLine);

      if (navigator.onLine) {
        // Get public IP
        const ip = await fetchPublicIP();
        if (ip) {
          console.log("Fetched public IP:", ip);
          setPublicIp(ip);
        }

        // Get local IP if requested
        if (showLocalIp) {
          console.log("Fetching local IP...");
          const localIpAddr = await fetchLocalIP();
          console.log("Fetched local IP:", localIpAddr);
          if (localIpAddr) setLocalIp(localIpAddr);
        }
      } else {
        setPublicIp("");
        setLocalIp("");
      }
    } catch (error) {
      console.error("Error checking connection:", error);
      setIsOnlineStatus(navigator.onLine);
    }
  }, [showLocalIp, fetchPublicIP, fetchLocalIP]);

  useEffect(() => {
    checkConnection();

    // Listen for online/offline events
    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);
    };
  }, [showLocalIp, checkConnection]);

  const containerClasses = `${vertical ? "flex flex-col items-start space-y-2" : "flex items-center space-x-2"} ${className}`;
  const statusColor = isOnlineStatus ? "bg-green-500" : "bg-red-500";
  const statusText = isOnlineStatus ? getTranslation(language, 'connected' as keyof typeof import('@/locales').defaultTranslations) : getTranslation(language, 'offline' as keyof typeof import('@/locales').defaultTranslations);
  const statusIcon = isOnlineStatus ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />;

  return (
    <div className={containerClasses}>
      {!hideStatus && (
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
          <span
            className="font-medium cursor-pointer hover:underline ml-2"
            onClick={checkConnection}
            title={getTranslation(language, 'clickToRefreshNetworkStatus' as keyof typeof import('@/locales').defaultTranslations)}
          >
            {statusText}
          </span>
        </div>
      )}

      <ul className="space-y-1 list-none p-0 m-0">
        {publicIp && (
          <li className="flex items-center">
            <Globe className="h-3 w-3 mr-2 flex-shrink-0" />
            <b className="text-xs mr-1 flex-shrink-0">{getTranslation(language, 'publicIp' as keyof typeof import('@/locales').defaultTranslations)}</b>
            <span className="text-xs break-all">{publicIp}</span>
          </li>
        )}

        {showLocalIp && localIp && (
          <li className="flex items-center">
            <Wifi className="h-3 w-3 mr-2 flex-shrink-0" />
            <b className="text-xs mr-1 flex-shrink-0">{getTranslation(language, 'localIp' as keyof typeof import('@/locales').defaultTranslations)}</b>
            <span className="text-xs break-all">{localIp}</span>
          </li>
        )}

        {showLocalIp && !localIp && (
          <li className="flex items-center">
            <Wifi className="h-3 w-3 mr-2 flex-shrink-0" />
            <b className="text-xs mr-1 flex-shrink-0">{getTranslation(language, 'localIp' as keyof typeof import('@/locales').defaultTranslations)}</b>
            <span className="text-xs break-all text-muted-foreground">{getTranslation(language, 'detecting' as keyof typeof import('@/locales').defaultTranslations)}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NetworkStatus;
