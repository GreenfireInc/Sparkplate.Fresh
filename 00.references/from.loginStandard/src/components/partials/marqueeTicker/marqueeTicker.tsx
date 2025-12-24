import { useState, useEffect, useRef, useCallback } from 'react';
import './marqueeTicker.css';
import { getTranslation, type LocaleCode } from '@/lib/i18n';
import { fetchCoinDataWithFallback, shuffleArray, type CoinData } from '@/components/currencyCore/aggregators';
import { COINBASE50 } from '@/components/currencyCore/indexComposites/coinbase50';

// Using CoinData interface from aggregators
type Coin = CoinData;

interface MarqueeTickerProps {
  language?: LocaleCode;
}

export const MarqueeTicker = ({ language = 'en' }: MarqueeTickerProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'coingecko' | 'coincap' | 'mock'>('coingecko');
  const duration = 100; // Animation duration in seconds
  const marqueeContentRef = useRef<HTMLDivElement>(null);

  const fetchCoinPrices = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadingError(null);

      // Randomize the coin list order before fetching
      const randomizedCoins = shuffleArray(COINBASE50);

      // Use centralized API fallback system
      const result = await fetchCoinDataWithFallback(randomizedCoins, {
        timeout: 5000,
        vs_currency: 'usd',
        per_page: 50,
        page: 1
      });

      // Set the data and track the source
      setCoins(result.data);
      setDataSource(result.source);
      
      // Handle any errors from the fallback system
      if (result.error) {
        setLoadingError(result.error);
      }

      console.log(`✅ [MarqueeTicker] Data loaded from: ${result.source}`);
      
    } catch (error) {
      console.error('Error in fetchCoinPrices:', error);
      setLoadingError(getTranslation(language, 'pleaseCheckConnection'));
      
      // Emergency fallback - should rarely be needed due to centralized system
      const emergencyFallback = COINBASE50.slice(0, 10).map(coin => ({
        ...coin,
        price: Math.random() * (coin.symbol === 'BTC' ? 50000 : 5000),
        priceChange: (Math.random() * 10) - 5, // -5% to +5%
        marketCap: Math.random() * 1000000000
      }));
      setCoins(emergencyFallback);
      setDataSource('mock');
    } finally {
      setIsLoading(false);
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
