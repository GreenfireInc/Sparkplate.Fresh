import { useEffect, useState, useMemo } from "react";

// Define the paths to icon directories
const GENERAL_ICONS_PATH = "/assets/icons/general/";
const GREENFIRE_PROPER_PATH = "/assets/icons/greenfire/proper/";
const GREENFIRE_GREENERY_PATH = "/assets/icons/greenfire/greenery/";

// List of general icons
const generalIcons = [
  "activity.svg", "album.svg", "antenna.svg", "arrow-down-0-1.svg", "arrow-down-1-0.svg", 
  "arrow-up-0-1.svg", "arrow-up-1-0.svg", "badge-cent.svg", "badge-dollar-sign.svg", 
  "badge-euro.svg", "badge-indian-rupee.svg", "badge-japanese-yen.svg", "badge-percent.svg", 
  "badge-pound-sterling.svg", "badge-russian-ruble.svg", "badge-swiss-franc.svg", 
  "badge-turkish-lira.svg", "banknote-arrow-down.svg", "banknote.svg", "binary.svg", 
  "bitcoin.svg", "brain-circuit.svg", "brain-cog.svg", "brain.svg", "cable.svg", 
  "chart-candlestick.svg", "circle-dollar-sign.svg", "circle-percent.svg", 
  "circle-pound-sterling.svg", "coins.svg", "credit-card.svg", "currency.svg", 
  "diamond-percent.svg", "dollar-sign.svg", "euro.svg", "gem.svg", "georgian-lari.svg", 
  "hand-coins.svg", "indian-rupee.svg", "japanese-yen.svg", "landmark.svg", "network.svg", 
  "nfc.svg", "origami.svg", "package-open.svg", "philippine-peso.svg", "piggy-bank.svg", 
  "pound-sterling.svg", "radio-tower.svg", "radio.svg", "receipt-cent.svg", "receipt-euro.svg", 
  "receipt-indian-rupee.svg", "receipt-japanese-yen.svg", "receipt-pound-sterling.svg", 
  "receipt-russian-ruble.svg", "receipt-swiss-franc.svg", "receipt-text.svg", 
  "receipt-turkish-lira.svg", "receipt.svg", "router.svg", "rss.svg", "russian-ruble.svg", 
  "satellite-dish.svg", "satellite.svg", "saudi-riyal.svg", "smartphone-nfc.svg", 
  "square-percent.svg", "swiss-franc.svg", "turkish-lira.svg", "wallet-cards.svg", 
  "wallet-minimal.svg", "wallet.svg", "wifi.svg", "zap.svg"
];

// List of greenfire icons
const greenfireIcons = [
  // Proper icons
  GREENFIRE_PROPER_PATH + "greenfire.black.svg",
  GREENFIRE_PROPER_PATH + "greenfire.blackHeart.svg",
  GREENFIRE_PROPER_PATH + "greenfire.redBlackHeart.svg",
  GREENFIRE_PROPER_PATH + "greenfire.svg",
  // Greenery icons
  GREENFIRE_GREENERY_PATH + "greenery.black.svg",
  GREENFIRE_GREENERY_PATH + "greenery.svg"
];

interface IconProps {
  src: string;
  style: React.CSSProperties;
}

export const IconBackground = () => {
  const [icons, setIcons] = useState<IconProps[]>([]);

  const allIcons = useMemo(() => [
    ...greenfireIcons,
    ...generalIcons.map(icon => GENERAL_ICONS_PATH + icon)
  ], []);

  useEffect(() => {
    const generateIcons = () => {
      const numIcons = 500;
      const newIcons: IconProps[] = [];

      for (let i = 0; i < numIcons; i++) {
        const randomIndex = Math.floor(Math.random() * allIcons.length);
        const iconSrc = allIcons[randomIndex];

        const size = 16 + Math.floor(Math.random() * 20);
        const opacity = 0.1 + (Math.random() * 0.2);
        const rotation = Math.random() * 360;

        newIcons.push({
          src: iconSrc,
          style: {
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            transform: `rotate(${rotation}deg)`,
            filter: 'brightness(0.9) contrast(0.8)',
          }
        });
      }
      setIcons(newIcons);
    };

    generateIcons();
  }, [allIcons]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="grid justify-items-center items-center pointer-events-none"
        style={{
          width: '150vmax',
          height: '150vmax',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(-25deg)',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '5px',
        }}
      >
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt=""
            style={icon.style}
            className="select-none pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
};

export default IconBackground;

