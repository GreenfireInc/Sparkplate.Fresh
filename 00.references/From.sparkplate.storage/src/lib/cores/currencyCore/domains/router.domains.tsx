/*
 * Domain Router Component
 * 
 * Resolves and displays domain names (ENS, Unstoppable Domains) with clickable links
 * and copy functionality
 */

import { Copy } from "lucide-vue-next";
import { getTranslation, type LocaleCode } from "@/lib/i18n";
import { resolveDomainForAddress } from '@/lib/cores/currencyCore/domains';
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DomainRouterProps {
  address: string;
  ticker: string;
  copyToClipboard: (text: string, label: string) => void;
  language?: LocaleCode;
}

export const DomainRouter = ({ 
  address,
  ticker,
  copyToClipboard,
  language = "en"
}: DomainRouterProps) => {
  const [resolvedDomain, setResolvedDomain] = useState<string | null>(null);
  const [domainService, setDomainService] = useState<'ENS' | 'UNS' | 'TEZ' | 'SOL' | 'ALGO' | 'STX' | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  useEffect(() => {
    const resolveDomain = async () => {
      if (!address || !ticker) return;

      setIsResolving(true);
      console.log("🔍 [DomainRouter] Attempting to resolve domain name for address:", address);
      console.log("🔍 [DomainRouter] Current ticker:", ticker);

      try {
        const domainResult = await resolveDomainForAddress(address, ticker);
        console.log("🔍 [DomainRouter] Domain resolution result:", domainResult);

        if (domainResult) {
          console.log(`✅ [DomainRouter] Domain resolved: ${domainResult.domain} via ${domainResult.service}`);
          setResolvedDomain(domainResult.domain);
          setDomainService(domainResult.service);
          
          toast.success(`${getTranslation(language, "domainFound")}: ${domainResult.domain}`, {
            description: `${getTranslation(language, "resolvedVia")} ${domainResult.service}`
          });
        } else {
          console.log("ℹ️ [DomainRouter] No domain name found for this address");
          setResolvedDomain(null);
          setDomainService(null);
        }
      } catch (domainError) {
        console.error("⚠️ [DomainRouter] Domain resolution failed (non-critical):", domainError);
        setResolvedDomain(null);
        setDomainService(null);
      } finally {
        setIsResolving(false);
      }
    };

    resolveDomain();
  }, [address, ticker, language]);

  // Don't render anything if no domain was resolved
  if (!resolvedDomain || !domainService) {
    return null;
  }

  // Get the appropriate link based on service
  const getDomainLink = () => {
    switch (domainService) {
      case 'ENS':
        return `https://app.ens.domains/${resolvedDomain}`;
      case 'UNS':
        return `https://unstoppabledomains.com/d/${resolvedDomain}`;
      case 'TEZ':
        return `https://app.tezos.domains/domain/${resolvedDomain}`;
      case 'SOL':
        return `https://www.sns.id/domain/${resolvedDomain}`;
      case 'ALGO': {
        // Remove .algo extension for the URL
        const nfdName = resolvedDomain?.replace('.algo', '') || resolvedDomain;
        return `https://app.nf.domains/name/${nfdName}.algo`;
      }
      default:
        return '#';
    }
  };

  // Get the appropriate icon based on service
  const getDomainIcon = () => {
    switch (domainService) {
      case 'UNS':
        return {
          src: "/assets/icons/domains/unstoppableDomains.svg",
          alt: "Unstoppable Domains"
        };
      case 'TEZ':
        return {
          src: "/assets/icons/domains/tezosDomains.svg",
          alt: "Tezos Domains"
        };
      case 'SOL':
        return {
          src: "/assets/icons/domains/solanaNameService.svg",
          alt: "Solana Name Service"
        };
      case 'ALGO':
        return {
          src: "/assets/icons/domains/nfDomains.svg",
          alt: "Algorand NF Domains"
        };
      case 'STX':
        return {
          src: "/assets/icons/domains/bitcoinNameService.svg",
          alt: "Stacks BNS - Bitcoin Name System"
        };
      case 'ENS':
      default:
        return {
          src: "/assets/icons/domains/ethereumNameService.svg",
          alt: "ENS - Ethereum Name Service"
        };
    }
  };

  // Get the appropriate tooltip based on service
  const getDomainTooltip = () => {
    switch (domainService) {
      case 'ENS':
        return getTranslation(language, "viewOnEns");
      case 'UNS':
        return getTranslation(language, "viewOnUnstoppableDomains");
      case 'TEZ':
        return getTranslation(language, "viewOnTezosDomains");
      case 'SOL':
        return getTranslation(language, "viewOnSolanaNameService");
      case 'ALGO':
        return getTranslation(language, "viewOnNfDomains");
      default:
        return "";
    }
  };

  const icon = getDomainIcon();

  return (
    <div className="mt-2 w-full max-w-[520px]">
      <div className="flex items-center justify-center gap-2">
        {/* Domain Service Icon */}
        <img 
          src={icon.src}
          alt={icon.alt}
          className="w-5 h-5 flex-shrink-0"
        />
        
        {/* Domain Link */}
        <a
          href={getDomainLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-purple-800 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 underline break-all cursor-pointer transition-colors"
          title={getDomainTooltip()}
        >
          {resolvedDomain}
        </a>
        
        {/* Copy Button */}
        <button
          onClick={() => copyToClipboard(resolvedDomain, getTranslation(language, "domainName"))}
          className="p-1 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
          title={getTranslation(language, "copyDomainName")}
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
};

export default DomainRouter;

