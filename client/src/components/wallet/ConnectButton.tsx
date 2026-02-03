/**
 * Wallet Connect Button
 *
 * Displays "Connect Wallet" when disconnected.
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
        className={`
          px-4 py-2.5 rounded-xl font-medium transition-all duration-200
          flex items-center gap-2
          ${isConnected
            ? 'bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
        `}
      >
        {isConnected ? (
          <>
            {/* Green status dot */}
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {/* Truncated address */}
            <span data-testid="wallet-address">{truncateAddress(address!)}</span>
          </>
        ) : (
          'Connect Wallet'
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
