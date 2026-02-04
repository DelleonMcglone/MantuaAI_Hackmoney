export interface Token {
  address: `0x${string}`;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  isMock?: boolean;
  faucetAmount?: string;
}

// Mock token addresses - UPDATE THESE AFTER DEPLOYMENT
export const MOCK_TOKEN_ADDRESSES = {
  mUSDC: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  mETH: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  mDAI: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  mBTC: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  mLINK: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  mUSDT: "0x0000000000000000000000000000000000000000" as `0x${string}`,
  mUSDE: "0x0000000000000000000000000000000000000000" as `0x${string}`,
};

// Mock Token Factory address - UPDATE THIS AFTER DEPLOYMENT
export const MOCK_TOKEN_FACTORY = "0x0000000000000000000000000000000000000000" as `0x${string}`;

// Native ETH (special address used in many protocols)
export const NATIVE_ETH: Token = {
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  symbol: "ETH",
  name: "Ethereum",
  decimals: 18,
  logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  isMock: false,
};

// Mock tokens for Base Sepolia testnet
export const MOCK_TOKENS: Token[] = [
  {
    address: MOCK_TOKEN_ADDRESSES.mUSDC,
    symbol: "mUSDC",
    name: "Mantua USDC",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
    isMock: true,
    faucetAmount: "10,000",
  },
  {
    address: MOCK_TOKEN_ADDRESSES.mETH,
    symbol: "mETH",
    name: "Mantua ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    isMock: true,
    faucetAmount: "10",
  },
  {
    address: MOCK_TOKEN_ADDRESSES.mDAI,
    symbol: "mDAI",
    name: "Mantua DAI",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png",
    isMock: true,
    faucetAmount: "10,000",
  },
  {
    address: MOCK_TOKEN_ADDRESSES.mBTC,
    symbol: "mBTC",
    name: "Mantua BTC",
    decimals: 8,
    logoURI: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    isMock: true,
    faucetAmount: "1",
  },
  {
    address: MOCK_TOKEN_ADDRESSES.mLINK,
    symbol: "mLINK",
    name: "Mantua LINK",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    isMock: true,
    faucetAmount: "100",
  },
  {
    address: MOCK_TOKEN_ADDRESSES.mUSDT,
    symbol: "mUSDT",
    name: "Mantua USDT",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    isMock: true,
    faucetAmount: "10,000",
  },
  {
    address: MOCK_TOKEN_ADDRESSES.mUSDE,
    symbol: "mUSDE",
    name: "Mantua USDe",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/33613/small/usde.png",
    isMock: true,
    faucetAmount: "10,000",
  },
];

// All available tokens (native + mocks)
export const ALL_TOKENS: Token[] = [NATIVE_ETH, ...MOCK_TOKENS];

// Helper functions
export function getTokenBySymbol(symbol: string): Token | undefined {
  return ALL_TOKENS.find((token) => token.symbol === symbol);
}

export function getTokenByAddress(address: `0x${string}`): Token | undefined {
  return ALL_TOKENS.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
}

export function isNativeToken(address: `0x${string}`): boolean {
  return address.toLowerCase() === NATIVE_ETH.address.toLowerCase();
}

export function getMockTokens(): Token[] {
  return MOCK_TOKENS;
}
