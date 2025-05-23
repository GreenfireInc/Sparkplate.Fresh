# Sparkplate API Documentation

## External APIs

### 1. CoinGecko
- **Purpose**: Cryptocurrency price data
- **Documentation**: [https://www.coingecko.com/api/documentation](https://www.coingecko.com/api/documentation)
- **Endpoints**:
  - `/simple/price` - Get current price
  - `/coins/markets` - Get market data
  - `/coins/{id}/history` - Get historical data
- **Rate Limits**: 
  - Free tier: 10-30 calls/minute
  - Pro tier: 50-100 calls/minute

### 2. WalletBeacon
- **Purpose**: Tezos wallet integration
- **Documentation**: [https://docs.walletbeacon.io/](https://docs.walletbeacon.io/)
- **Features**:
  - Wallet connection
  - Transaction signing
  - Account management
- **SDK**: `@airgap/beacon-sdk`

### 3. Tezos Domains
- **Purpose**: Tezos domain resolution
- **Documentation**: [https://docs.tezos.domains/](https://docs.tezos.domains/)
- **Features**:
  - Domain resolution
  - Reverse resolution
  - Domain information
- **SDK**: `@tezos-domains/core`

## Internal APIs

### 1. Address Resolution Service
```javascript
interface ResolutionService {
  resolve(domain: string): Promise<ResolutionResult>;
  reverse(address: string): Promise<ReverseResult>;
}

interface ResolutionResult {
  address: string;
  resolver: string;
  ttl: number;
}

interface ReverseResult {
  domain: string;
  resolver: string;
}
```

### 2. Network Discovery Service
```javascript
interface NetworkService {
  discover(): Promise<Instance[]>;
  connect(instance: Instance): Promise<Connection>;
  broadcast(message: Message): Promise<void>;
}

interface Instance {
  id: string;
  name: string;
  address: string;
  status: 'online' | 'offline';
}

interface Connection {
  id: string;
  status: 'connected' | 'disconnected';
  lastSeen: number;
}
```

### 3. Game Service
```javascript
interface GameService {
  start(game: GameType): Promise<GameSession>;
  saveScore(score: Score): Promise<void>;
  getHighScores(): Promise<Score[]>;
}

interface GameSession {
  id: string;
  game: GameType;
  players: Player[];
  state: GameState;
}

interface Score {
  game: GameType;
  player: string;
  score: number;
  timestamp: number;
}

type GameType = 'pong' | 'tictactoe' | 'breakout';
```

### 4. Settings Service
```javascript
interface SettingsService {
  getSettings(): Promise<Settings>;
  updateSettings(settings: Partial<Settings>): Promise<void>;
  resetSettings(): Promise<void>;
}

interface Settings {
  theme: 'light' | 'dark';
  features: {
    blessed: boolean;
    express: boolean;
    network: boolean;
  };
  games: {
    highscores: {
      pong: number;
      tictactoe: number;
      breakout: number;
    };
  };
}
```

## API Integration Guidelines

### 1. Error Handling
```javascript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}

function handleError(error: ApiError) {
  // Implementation
}
```

### 2. Rate Limiting
```javascript
interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

function checkRateLimit(limit: RateLimit) {
  // Implementation
}
```

### 3. Authentication
```javascript
interface AuthConfig {
  apiKey?: string;
  token?: string;
  headers: Record<string, string>;
}

function authenticate(config: AuthConfig) {
  // Implementation
}
```

## API Versioning

### 1. Version Control
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Document breaking changes
- Maintain backward compatibility where possible

### 2. Deprecation Policy
- Announce deprecation 3 months in advance
- Provide migration guides
- Maintain deprecated endpoints for 6 months

## Security Considerations

### 1. API Keys
- Store in environment variables
- Never commit to version control
- Rotate regularly

### 2. Data Validation
- Validate all input
- Sanitize output
- Use TypeScript interfaces

### 3. Rate Limiting
- Implement client-side rate limiting
- Handle server-side rate limits
- Provide retry mechanisms 