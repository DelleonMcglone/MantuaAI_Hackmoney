/**
 * Wallet Connect Button
 *
 * Displays "Connect Wallet" with purple styling and wallet icon.
 * Button remains purple in all states (connected/disconnected, light/dark mode).
 * Shows truncated address (0x1234...5678) when connected.
 * Provides disconnect functionality via modal.
 */

import { useEffect } from 'react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { LogOut } from 'lucide-react';

interface ConnectButtonProps {
  className?: string;
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

/**
 * Truncates wallet address to format: 0x1234...5678
 */
function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectButton({
  className = '',
  onConnect,
  onDisconnect,
}: ConnectButtonProps) {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  // Callback when connection state changes
  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    }
  }, [isConnected, address, onConnect]);

  const handleClick = () => {
    if (isConnected) {
      // Open account modal for disconnect option
      open({ view: 'Account' });
    } else {
      // Open connect modal
      open({ view: 'Connect' });
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    onDisconnect?.();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Main Connect/Address Button */}
      <button
        onClick={handleClick}
        data-testid="connect-button"
        className="
          px-5 py-2.5 rounded-full font-medium transition-all duration-200
          flex items-center gap-2
          bg-[#8B5CF6] hover:bg-[#7C3AED] active:bg-[#6D28D9] text-white
          shadow-lg shadow-purple-500/25
        "
      >
        {isConnected ? (
          <>
            {/* Wallet Icon */}
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            {/* Truncated address */}
            <span data-testid="wallet-address">{truncateAddress(address!)}</span>
          </>
        ) : (
          <>
            {/* Wallet Icon */}
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <span>Connect wallet</span>
          </>
        )}
      </button>

      {/* Explicit Disconnect Button (shown when connected) */}
      {isConnected && (
        <button
          onClick={handleDisconnect}
          data-testid="disconnect-button"
          className="
            p-2.5 rounded-xl transition-colors
            bg-gray-800 dark:bg-gray-700
            hover:bg-red-600 dark:hover:bg-red-600
            text-gray-400 hover:text-white
          "
          aria-label="Disconnect wallet"
        >
          <LogOut className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

/**
 * Alternative: Use AppKit's built-in button component
 * This provides all functionality out of the box
 */
export function AppKitConnectButton() {
  return <appkit-button />;
}
