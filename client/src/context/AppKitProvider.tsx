/**
 * AppKit Provider Component
 *
 * Wraps the application with necessary providers for wallet connectivity.
 * Must be used at the root level of the application.
 *
 * NOTE: Wallet state hydrates client-side only.
 * NOTE: QueryClient should already exist in the app - WagmiProvider uses it from context.
 */

import { WagmiProvider } from 'wagmi';
import { ReactNode } from 'react';
import { wagmiConfig } from '@/config/appkit';

interface AppKitProviderProps {
  children: ReactNode;
}

export function AppKitProvider({ children }: AppKitProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
    </WagmiProvider>
  );
}
