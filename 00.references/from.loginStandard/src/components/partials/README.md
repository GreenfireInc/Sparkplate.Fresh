# Partial Components

This directory contains reusable component parts that can be included in other components.

## MarqueeTicker

A scrolling ticker component that displays cryptocurrency prices using data from the CoinGecko API.

### Features

- Displays cryptocurrency prices in a horizontally scrolling ticker
- Shows price changes with green/red color indicators
- Clicking on a cryptocurrency opens a modal with detailed information
- Auto-refreshes prices every 5 minutes
- Seamless looping animation

### Usage

```tsx
import { MarqueeTicker } from '@/components/partials';

export const YourComponent = () => {
  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      <MarqueeTicker language="en" />
    </div>
  );
};
```

### Requirements

This component requires cryptocurrency SVG icons to be available at `/assets/icons/crypto/{symbol}.svg`, where `{symbol}` is the lowercase symbol of the cryptocurrency (e.g., btc, eth, etc.).

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `language` | `LocaleCode` | `'en'` | Language code for translations. Supports: 'en', 'es', 'fr', 'de', 'pt' |

### Translations

The component uses the following translation keys:
- `pleaseCheckConnection` - Error message when API fails
- `currentPrice` - Label for current price
- `change24h` - Label for 24-hour change
- `marketCap` - Label for market capitalization
- `tradeOnGemini` - Link text for Gemini trading platform
- `close` - Button text to close modal
