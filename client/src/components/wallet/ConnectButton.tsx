/**
 * Wallet Connect Button
 *
 * Displays "Connect Wallet" with purple gradient styling.
 * When connected, shows avatar placeholder + truncated address.
 * Provides disconnect functionality via dropdown menu with exit icon.
 */

import { useEffect, useState, useRef } from 'react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';

interface ConnectButtonProps {
  className?: string;
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

/**
 * Truncates wallet address to format: 0xbaac...DC87
 */
function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4).toUpperCase()}`;
}

/**
 * Generates a simple identicon color based on address
 */
function getIdenticonColor(address: string): string {
  if (!address) return '#a855f7';
  const hash = address.slice(2, 8);
  const hue = parseInt(hash, 16) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

/**
 * Exit/Arrow icon for disconnect button
 */
function ExitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
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
  const [isHovered, setIsHovered] = useState(false);
  const [isDisconnectHovered, setIsDisconnectHovered] = useState(false);
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
      setDropdownOpen(!dropdownOpen);
    } else {
      open({ view: 'Connect' });
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setDropdownOpen(false);
    onDisconnect?.();
  };

  const baseButtonStyle = {
    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(168, 85, 247, 0.25)',
    transition: 'all 0.2s ease',
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main Connect/Address Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="connect-button"
        aria-haspopup={isConnected ? 'menu' : undefined}
        aria-label={isConnected ? `Wallet ${address}` : 'Connect wallet'}
        style={{
          ...baseButtonStyle,
          padding: isConnected ? '8px 14px' : '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        }}
      >
        {isConnected ? (
          <>
            {/* Avatar/Identicon placeholder */}
            <div
              data-testid="wallet-avatar"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: `linear-gradient(135deg, ${getIdenticonColor(address!)}, ${getIdenticonColor(address!.split('').reverse().join(''))})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              {address!.slice(2, 4)}
            </div>
            <span data-testid="wallet-address" style={{ fontWeight: 500 }}>
              {truncateAddress(address!)}
            </span>
          </>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      {/* Dropdown Menu (shown when connected and dropdown is open) */}
      {isConnected && dropdownOpen && (
        <div 
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: 6,
            zIndex: 50,
          }}
        >
          <button
            onClick={handleDisconnect}
            onMouseEnter={() => setIsDisconnectHovered(true)}
            onMouseLeave={() => setIsDisconnectHovered(false)}
            data-testid="disconnect-button"
            style={{
              ...baseButtonStyle,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              filter: isDisconnectHovered ? 'brightness(1.15)' : 'brightness(1)',
            }}
          >
            <ExitIcon />
            <span>Disconnect</span>
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
