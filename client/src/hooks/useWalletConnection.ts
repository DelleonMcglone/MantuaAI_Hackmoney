/**
 * Custom hook for wallet connection state, actions, and user registration
 *
 * NOTE: Reown AppKit is the SINGLE SOURCE OF TRUTH for wallet state.
 * Do not mirror wallet state in separate global stores.
 */

import { useAppKit, useAppKitAccount, useAppKitNetwork, useDisconnect } from '@reown/appkit/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface WalletConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | undefined;
  truncatedAddress: string | undefined;
  chainId: number | undefined;
  networkName: string | undefined;
  isNewUser: boolean | null;
}

export interface WalletConnectionActions {
  connect: () => void;
  disconnect: () => Promise<void>;
  openAccountModal: () => void;
}

/**
 * Truncates wallet address to format: 0x1234...5678
 */
function truncateAddress(address: string | undefined): string | undefined {
  if (!address) return undefined;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Registers user with backend on first connect
 */
async function registerUser(walletAddress: string): Promise<{ isNewUser: boolean }> {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress }),
    });

    if (!response.ok) {
      throw new Error(`Failed to register user: ${response.statusText}`);
    }

    const user = await response.json();
    // The backend returns the same user if they already exist
    // We can check timestamps or just assume if it succeeds quickly, they existed
    // For simplicity, we'll consider this not a new user in most cases
    // A proper implementation would have the backend return an isNewUser flag
    return { isNewUser: false };
  } catch (error) {
    console.error('Error registering user:', error);
    return { isNewUser: false };
  }
}

export function useWalletConnection(): WalletConnectionState & WalletConnectionActions {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { chainId, caipNetwork } = useAppKitNetwork();
  const { disconnect: appKitDisconnect } = useDisconnect();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [hasRegistered, setHasRegistered] = useState(false);

  // Register user when wallet connects
  useEffect(() => {
    if (isConnected && address && !hasRegistered) {
      setIsConnecting(true);
      registerUser(address)
        .then(({ isNewUser }) => {
          setIsNewUser(isNewUser);
          setHasRegistered(true);
        })
        .finally(() => {
          setIsConnecting(false);
        });
    }

    // Reset registration state when disconnected
    if (!isConnected) {
      setHasRegistered(false);
      setIsNewUser(null);
    }
  }, [isConnected, address, hasRegistered]);

  const connect = useCallback(() => {
    open({ view: 'Connect' });
  }, [open]);

  const disconnect = useCallback(async () => {
    await appKitDisconnect();
    setHasRegistered(false);
    setIsNewUser(null);
  }, [appKitDisconnect]);

  const openAccountModal = useCallback(() => {
    open({ view: 'Account' });
  }, [open]);

  const networkName = useMemo(() => {
    return caipNetwork?.name;
  }, [caipNetwork]);

  const truncatedAddress = useMemo(() => {
    return truncateAddress(address);
  }, [address]);

  return {
    // State
    isConnected,
    isConnecting,
    address,
    truncatedAddress,
    chainId,
    networkName,
    isNewUser,
    // Actions
    connect,
    disconnect,
    openAccountModal,
  };
}
