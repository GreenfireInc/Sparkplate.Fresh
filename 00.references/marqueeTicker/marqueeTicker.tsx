import { useState, useEffect, useRef, useCallback } from 'react';
import './marqueeTicker.css';
import { getTranslation, type LocaleCode } from '@/lib/i18n';

// Filter COINBASE50 to only include currencies for which we have icons
const COINBASE50 = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'near', symbol: 'NEAR', name: 'Near' },
  { id: 'render-token', symbol: 'RENDER', name: 'Render' },
  { id: 'blockstack', symbol: 'STX', name: 'Stacks' },
  { id: 'zcash', symbol: 'ZEC', name: 'ZCash' },
  { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu' },
  { id: 'mina-protocol', symbol: 'MINA', name: 'Mina Protocol' },
  { id: 'apecoin', symbol: 'APE', name: 'ApeCoin' },
  { id: 'immutable-x', symbol: 'IMX', name: 'Immutable X' },
  { id: 'oasis-network', symbol: 'ROSE', name: 'Oasis Network' },
  { id: 'lido-dao', symbol: 'LDO', name: 'Lido DAO' },
  { id: 'bonk', symbol: 'BONK', name: 'BONK' },
  { id: 'elrond-erd-2', symbol: 'EGLD', name: 'MultiversX' },
  { id: 'helium', symbol: 'HNT', name: 'Helium' },
  { id: 'jasmycoin', symbol: 'JASMY', name: 'JasmyCoin' },
  { id: 'blur', symbol: 'BLUR', name: 'Blur' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave' },
  { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'matic-network', symbol: 'MATIC', name: 'Polygon' },
  { id: 'fetch-ai', symbol: 'FET', name: 'Fetch.ai' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'injective-protocol', symbol: 'INJ', name: 'Injective' },
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'quant-network', symbol: 'QNT', name: 'Quant Network' },
  { id: 'maker', symbol: 'MKR', name: 'Maker' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'Sand' },
  { id: 'curve-dao-token', symbol: 'CRV', name: 'Curve DAO Token' },
  { id: 'eos', symbol: 'EOS', name: 'EOS' },
  { id: 'axie-infinity', symbol: 'AXS', name: 'Axie Infinity' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'chiliz', symbol: 'CHZ', name: 'Chiliz' },
  { id: 'havven', symbol: 'SNX', name: 'Synthetix' },
  { id: 'livepeer', symbol: 'LPT', name: 'Livepeer' },
  { id: 'kusama', symbol: 'KSM', name: 'Kusama' },
  { id: '1inch', symbol: '1INCH', name: '1inch' }
];

interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  marketCap: number;
}

interface MarqueeTickerProps {
  language?: LocaleCode;
}

export const MarqueeTicker = ({ language = 'en' }: MarqueeTickerProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const duration = 100; // Animation duration in seconds
  const marqueeContentRef = useRef<HTMLDivElement>(null);
  
  // Helper function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]; // Create a copy to avoid modifying the original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  const fetchCoinPrices = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadingError(null);

      // Randomize the coin list order before fetching
      const randomizedCoins = shuffleArray(COINBASE50);
      
      try {
        // Use CoinGecko API with proper coin IDs
        const coinIds = randomizedCoins.map((coin) => coin.id).join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`,
          { signal: AbortSignal.timeout(5000) } // Timeout after 5 seconds
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Map the data to our coins array, using only local icons
        const coinData = randomizedCoins.map((coin) => {
          const coinData = data.find((item: {id: string; current_price?: number; price_change_percentage_24h?: number; market_cap?: number}) => item.id === coin.id);
          return {
            ...coin,
            price: coinData?.current_price || 0,
            priceChange: coinData?.price_change_percentage_24h || 0,
            marketCap: coinData?.market_cap || 0
          };
        });

        setCoins(coinData);
      } catch (apiError) {
        console.warn('API error, using fallback data:', apiError);
        // Generate fallback data with mock prices
        const fallbackData = randomizedCoins.map(coin => ({
          ...coin,
          price: Math.random() * (coin.symbol === 'BTC' ? 50000 : 5000),
          priceChange: (Math.random() * 10) - 5, // -5% to +5%
          marketCap: Math.random() * 1000000000
        }));
        setCoins(fallbackData);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error in fetchCoinPrices:', error);
      setLoadingError(getTranslation(language, 'pleaseCheckConnection'));
      setIsLoading(false);
      
      // Still provide fallback data
      const fallbackData = COINBASE50.slice(0, 10).map(coin => ({
        ...coin,
        price: Math.random() * (coin.symbol === 'BTC' ? 50000 : 5000),
        priceChange: (Math.random() * 10) - 5, // -5% to +5%
        marketCap: Math.random() * 1000000000
      }));
      setCoins(fallbackData);
    }
  }, [language]);

  useEffect(() => {
    fetchCoinPrices();
    // Set up interval to refresh prices every 5 minutes
    const fetchInterval = setInterval(fetchCoinPrices, 5 * 60 * 1000);
    
    return () => {
      if (fetchInterval) clearInterval(fetchInterval);
    };
  }, [fetchCoinPrices]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`;
    return marketCap.toFixed(2);
  };

  const handleCoinClick = (coin: Coin) => {
    setSelectedCoin(coin);
    setIsPaused(true);
    if (marqueeContentRef.current) {
      marqueeContentRef.current.style.animationPlayState = 'paused';
    }
  };

  const closeModal = () => {
    setSelectedCoin(null);
    setIsPaused(false);
    if (marqueeContentRef.current) {
      marqueeContentRef.current.style.animationPlayState = 'running';
    }
  };

  const renderCoinItems = (prefix = '') => {
    return coins.slice(0, 10).map((coin) => (
      <div
        key={`${prefix}${coin.id}`}
        className="coin-item"
        onClick={() => handleCoinClick(coin)}
      >
        <img
          src={`/assets/icons/crypto/${coin.symbol.toLowerCase()}.svg`}
          alt={coin.symbol}
          className="coin-icon"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/assets/icons/general/circle-dollar-sign.svg";
          }}
        />
        <span className="coin-symbol">{coin.symbol}</span>
        <span
          className={`coin-price ${
            coin.priceChange > 0 ? 'price-up' : 'price-down'
          }`}
        >
          ${formatPrice(coin.price)} ({coin.priceChange > 0 ? '+' : ''}
          {coin.priceChange.toFixed(2)}%)
        </span>
      </div>
    ));
  };

  return (
    <div className="marquee-ticker">
      <div className="marquee-container">
        <div
          ref={marqueeContentRef}
          className="marquee-content"
          style={{ animationDuration: `${duration}s` }}
        >
          <div className="marquee-item">{renderCoinItems()}</div>
          {/* Duplicate for seamless looping */}
          <div className="marquee-item">{renderCoinItems('dup-')}</div>
        </div>
      </div>

      {/* Coin Details Modal */}
      {selectedCoin && (
        <div className="coin-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <img
                src={`/assets/icons/crypto/${selectedCoin.symbol.toLowerCase()}.svg`}
                alt={selectedCoin.symbol}
                className="modal-coin-icon"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/assets/icons/general/circle-dollar-sign.svg";
                }}
              />
              <div className="coin-title">
                <h3>
                  {selectedCoin.name} ({selectedCoin.symbol})
                </h3>
              </div>
            </div>
            <div className="coin-metrics">
              <p>{getTranslation(language, 'currentPrice')} ${formatPrice(selectedCoin.price)}</p>
              <p>
                {getTranslation(language, 'change24h')}
                <span
                  className={
                    selectedCoin.priceChange > 0 ? 'price-up' : 'price-down'
                  }
                >
                  {selectedCoin.priceChange > 0 ? '+' : ''}
                  {selectedCoin.priceChange.toFixed(2)}%
                </span>
              </p>
              <p>{getTranslation(language, 'marketCap')} ${formatMarketCap(selectedCoin.marketCap)}</p>
            </div>
            <a
              href="https://gemini.com/share/jwqzg5fe"
              target="_blank"
              rel="noopener noreferrer"
              className="gemini-link"
            >
              {getTranslation(language, 'tradeOnGemini')}
            </a>
            <button onClick={closeModal}>{getTranslation(language, 'close')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarqueeTicker;
