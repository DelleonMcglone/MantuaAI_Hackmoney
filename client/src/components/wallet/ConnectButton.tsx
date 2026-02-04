/**
 * Wallet Connect Button
 *
 * Displays "Connect Wallet" with purple styling and wallet icon.
 * Button remains purple in all states (connected/disconnected, light/dark mode).
 * Shows truncated address (0x1234...5678) when connected.
 * Provides disconnect functionality via dropdown menu.
 */

import { useEffect, useState, useRef } from 'react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { ChevronDown } from 'lucide-react';

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Callback when connection state changes
  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    }
  }, [isConnected, address, onConnect]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (isConnected) {
      // Toggle dropdown menu for disconnect option
      setDropdownOpen(!dropdownOpen);
    } else {
      // Open connect modal
      open({ view: 'Connect' });
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setDropdownOpen(false);
    onDisconnect?.();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
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
            {/* Chevron icon to indicate dropdown */}
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
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

      {/* Dropdown Menu (shown when connected and dropdown is open) */}
      {isConnected && dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <button
            onClick={handleDisconnect}
            data-testid="disconnect-button"
            className="
              px-5 py-2.5 rounded-full font-medium transition-all duration-200
              flex items-center gap-2 whitespace-nowrap
              bg-[#8B5CF6] hover:bg-[#7C3AED] active:bg-[#6D28D9] text-white
              shadow-lg shadow-purple-500/25
            "
          >
            Disconnect
          </button>
        </div>
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
