import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { baseSepolia } from '@reown/appkit/networks';
import type { AppKitNetwork } from '@reown/appkit/networks';

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || '';

const metadata = {
  name: 'Mantua.AI',
  description: 'AI-powered DeFi trading platform with Uniswap v4 hooks',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://mantua.ai',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [baseSepolia];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;
