/**
 * Wallet Connect Button
 *
 * Displays "Connect Wallet" with purple gradient styling matching the Launch App button.
 * Text-only design (no icons) with medium rounded corners for a clean, modern look.
 * Shows truncated address (0x1234...5678) when connected.
 * Provides disconnect functionality via dropdown menu.
 */

import { useEffect, useState, useRef } from 'react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';

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
        aria-haspopup={isConnected ? 'menu' : undefined}
        aria-label={isConnected ? `Wallet ${address}` : 'Connect wallet'}
        className={
          "px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 " +
          "text-white border-none focus:outline-none focus:ring-2 focus:ring-purple-300/40 " +
          "bg-gradient-to-br from-[#a855f7] to-[#9333ea] " +
          "hover:brightness-110"
        }
        style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px' }}
      >
        {isConnected ? (
          <span data-testid="wallet-address">{truncateAddress(address!)}</span>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      {/* Dropdown Menu (shown when connected and dropdown is open) */}
      {isConnected && dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <button
            onClick={handleDisconnect}
            data-testid="disconnect-button"
            className={
              "px-5 py-2.5 rounded-lg font-semibold transition-all duration-150 " +
              "whitespace-nowrap text-white border-none focus:outline-none " +
              "bg-gradient-to-br from-[#a855f7] to-[#9333ea] hover:brightness-110"
            }
            style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px' }}
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
