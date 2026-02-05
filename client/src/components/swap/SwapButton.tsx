/**
 * Swap Button Component
 * 
 * Smart button that handles the full swap flow:
 * - Shows "Connect Wallet" if not connected
 * - Shows "Approve [TOKEN]" if approval needed
 * - Shows "Swap" when ready to execute
 * - Shows loading states during transactions
 */

import React from 'react';
import type { ApprovalStatus } from '../../hooks/useTokenApproval';
import type { SwapStatus } from '../../hooks/useSwapExecution';

interface SwapButtonProps {
  isConnected: boolean;
  hasAmount: boolean;
  hasTokens: boolean;
  approvalStatus: ApprovalStatus;
  swapStatus: SwapStatus;
  tokenSymbol: string;
  priceImpact: number;
  onConnect: () => void;
  onApprove: () => void;
  onSwap: () => void;
  disabled?: boolean;
  theme: {
    textPrimary: string;
    textSecondary: string;
    accent: string;
  };
  isDark: boolean;
}

export function SwapButton({
  isConnected,
  hasAmount,
  hasTokens,
  approvalStatus,
  swapStatus,
  tokenSymbol,
  priceImpact,
  onConnect,
  onApprove,
  onSwap,
  disabled = false,
  theme,
  isDark,
}: SwapButtonProps) {
  const isApproving = approvalStatus === 'approving';
  const needsApproval = approvalStatus === 'needs-approval';
  const isSwapping = swapStatus === 'pending' || swapStatus === 'confirming';
  const isHighImpact = priceImpact > 5;

  const getButtonState = () => {
    if (!isConnected) {
      return {
        text: 'Connect Wallet',
        onClick: onConnect,
        disabled: false,
        variant: 'primary' as const,
      };
    }

    if (!hasTokens) {
      return {
        text: 'Select tokens',
        onClick: () => {},
        disabled: true,
        variant: 'disabled' as const,
      };
    }

    if (!hasAmount) {
      return {
        text: 'Enter amount',
        onClick: () => {},
        disabled: true,
        variant: 'disabled' as const,
      };
    }

    if (isApproving) {
      return {
        text: `Approving ${tokenSymbol}...`,
        onClick: () => {},
        disabled: true,
        variant: 'loading' as const,
      };
    }

    if (needsApproval) {
      return {
        text: `Approve ${tokenSymbol}`,
        onClick: onApprove,
        disabled: disabled,
        variant: 'primary' as const,
      };
    }

    if (isSwapping) {
      return {
        text: swapStatus === 'pending' ? 'Confirm in wallet...' : 'Swapping...',
        onClick: () => {},
        disabled: true,
        variant: 'loading' as const,
      };
    }

    if (isHighImpact) {
      return {
        text: 'Swap Anyway',
        onClick: onSwap,
        disabled: disabled,
        variant: 'warning' as const,
      };
    }

    return {
      text: 'Swap',
      onClick: onSwap,
      disabled: disabled,
      variant: 'primary' as const,
    };
  };

  const state = getButtonState();

  const getButtonStyles = () => {
    const baseStyles = {
      width: '100%',
      padding: '16px 24px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600' as const,
      cursor: state.disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    };

    switch (state.variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #a855f7, #9333ea)',
          color: '#fff',
          opacity: state.disabled ? 0.5 : 1,
          boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)',
        };
      case 'warning':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
        };
      case 'loading':
        return {
          ...baseStyles,
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          color: theme.textSecondary,
        };
      case 'disabled':
      default:
        return {
          ...baseStyles,
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          color: theme.textSecondary,
        };
    }
  };

  return (
    <button
      data-testid="swap-button"
      onClick={state.onClick}
      disabled={state.disabled}
      style={getButtonStyles()}
    >
      {(isApproving || isSwapping) && (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}
      {state.text}
    </button>
  );
}

export function SwapButtonStyles() {
  return (
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  );
}
