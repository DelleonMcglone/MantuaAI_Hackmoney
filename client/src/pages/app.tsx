// @ts-nocheck
/**
 * Mantua.AI App Home Page
 * 
 * Main application interface with sidebar navigation, wallet connection,
 * chat interface, and swap functionality for DeFi interactions.
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import logoWhite from '@assets/Mantua_logo_white_1768946648374.png';
import logoBlack from '@assets/Mantua_logo_black_1768946648374.png';
import {
  WalletIcon,
  TrendUpIcon,
  TrendDownIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  MessageSquarePlusIcon,
  MessageSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftRightIcon,
  DropletsIcon,
  DropletIcon,
  ExternalLinkIcon,
  FileTextIcon,
  SendIcon,
  MicIcon,
  SwapIcon,
  ShieldIcon,
  BoltIcon,
  TrendIcon,
  CodeIcon,
  CheckIcon,
  InfoIcon,
  SettingsIcon,
  CloseIcon,
  StarIcon,
  BotIcon,
  XIcon,
  FarcasterIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  MenuIcon
} from '../components/icons';

// ============ ICONS ============
// Icons are now imported from ../components/icons.tsx


// Token icon component
const TokenIcon = ({ token, size = 32 }) => {
  const getTokenColor = (token) => {
    const colors = {
      'ETH': 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)',
      'USDC': 'linear-gradient(135deg, #2775CA 0%, #4A9FE8 100%)',
      'LP': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
    };
    return colors[token] || 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)';
  };

  const getTokenSymbol = (token) => {
    if (token === 'ETH') return 'Ξ';
    if (token === 'USDC') return '$';
    if (token === 'LP') return '◈';
    return token.charAt(0);
  };

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: getTokenColor(token),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.45,
      fontWeight: '600',
      color: 'white',
    }}>
      {getTokenSymbol(token)}
    </div>
  );
};

// Token pair icon
const TokenPairIcon = ({ token1, token2 }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TokenIcon token={token1} size={28} />
    <div style={{ marginLeft: -8, zIndex: 1 }}>
      <TokenIcon token={token2} size={28} />
    </div>
  </div>
);

// Status badge component
const StatusBadge = ({ status, type = 'default' }) => {
  const configs = {
    'Manual': { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' },
    'Active': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    'Paused': { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    'Out of range': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    'Pending': { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    'Completed': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    'Failed': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    'Standard': { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' },
    'MEV Protection': { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    'JiT Rebalance': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    'Directional Fee': { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  };

  const config = configs[status] || configs['default'];

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 10px',
      borderRadius: '6px',
      background: config.bg,
      color: config.color,
      fontSize: '12px',
      fontWeight: '600',
    }}>
      {status === 'Active' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: config.color }} />}
      {status}
    </span>
  );
};

// Chain badge
const ChainBadge = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    fontSize: '12px',
    fontWeight: '600',
  }}>
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#3b82f6',
    }} />
    Base Sepolia
  </div>
);

// Portfolio Summary Card
const PortfolioSummary = ({ data }) => (
  <div style={{
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(139, 92, 246, 0.1)',
    marginBottom: '24px',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: '700', margin: 0 }}>
            Portfolio Summary
          </h2>
        </div>
        <ChainBadge />
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: '#6b7280', fontSize: '13px', marginBottom: '4px' }}>Total Value</div>
        <div style={{ 
          color: '#111827', 
          fontSize: '32px', 
          fontWeight: '700',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}>
          ${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      <div style={{
        padding: '16px',
        background: 'rgba(249, 250, 251, 0.8)',
        borderRadius: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <TokenIcon token="ETH" size={24} />
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>ETH Balance</span>
        </div>
        <div style={{ 
          color: '#111827', 
          fontSize: '20px', 
          fontWeight: '700',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}>
          {data.ethBalance.toFixed(4)} ETH
        </div>
        <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>
          ${(data.ethBalance * data.ethPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <div style={{
        padding: '16px',
        background: 'rgba(249, 250, 251, 0.8)',
        borderRadius: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <TokenIcon token="USDC" size={24} />
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>USDC Balance</span>
        </div>
        <div style={{ 
          color: '#111827', 
          fontSize: '20px', 
          fontWeight: '700',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}>
          {data.usdcBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>
          ${data.usdcBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>

      <div style={{
        padding: '16px',
        background: 'rgba(249, 250, 251, 0.8)',
        borderRadius: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <TokenIcon token="LP" size={24} />
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>LP Positions</span>
        </div>
        <div style={{ 
          color: '#111827', 
          fontSize: '20px', 
          fontWeight: '700',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}>
          {data.lpPositions}
        </div>
        <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>
          ${data.lpValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} value
        </div>
      </div>

      <div style={{
        padding: '16px',
        background: data.netPnl >= 0 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
        borderRadius: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {data.netPnl >= 0 ? <TrendUpIcon /> : <TrendDownIcon />}
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>Net PnL</span>
        </div>
        <div style={{ 
          color: data.netPnl >= 0 ? '#10b981' : '#ef4444', 
          fontSize: '20px', 
          fontWeight: '700',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}>
          {data.netPnl >= 0 ? '+' : ''}{data.netPnl.toFixed(2)}%
        </div>
        <div style={{ color: data.netPnl >= 0 ? '#10b981' : '#ef4444', fontSize: '12px', marginTop: '2px' }}>
          {data.netPnl >= 0 ? '+' : ''}${data.netPnlUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  </div>
);

// Assets Table
const AssetsTable = ({ assets }) => (
  <div style={{
    background: 'white',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.1)',
    marginBottom: '24px',
    overflow: 'hidden',
  }}>
    <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
      <h3 style={{ color: '#111827', fontSize: '16px', fontWeight: '700', margin: 0 }}>Assets</h3>
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: 'rgba(249, 250, 251, 0.5)' }}>
          <th style={{ padding: '12px 24px', textAlign: 'left', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Asset</th>
          <th style={{ padding: '12px 24px', textAlign: 'right', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Balance</th>
          <th style={{ padding: '12px 24px', textAlign: 'right', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>USD Value</th>
          <th style={{ padding: '12px 24px', textAlign: 'right', color: '#6b7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>% of Portfolio</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset, index) => (
          <tr key={index} style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.08)' }}>
            <td style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TokenIcon token={asset.symbol} size={36} />
                <div>
                  <div style={{ color: '#111827', fontWeight: '600', fontSize: '14px' }}>{asset.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>{asset.symbol}</div>
                </div>
              </div>
            </td>
            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
              <span style={{ color: '#111827', fontFamily: 'SF Mono, Monaco, monospace', fontSize: '14px', fontWeight: '500' }}>
                {asset.balance.toLocaleString(undefined, { minimumFractionDigits: asset.symbol === 'ETH' ? 4 : 2, maximumFractionDigits: asset.symbol === 'ETH' ? 4 : 2 })}
              </span>
            </td>
            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
              <span style={{ color: '#111827', fontFamily: 'SF Mono, Monaco, monospace', fontSize: '14px', fontWeight: '500' }}>
                ${asset.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </td>
            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{
                  width: '60px',
                  height: '6px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${asset.percentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
                    borderRadius: '3px',
                  }} />
                </div>
                <span style={{ color: '#374151', fontSize: '13px', fontWeight: '600', minWidth: '45px' }}>
                  {asset.percentage.toFixed(1)}%
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Liquidity Positions
const LiquidityPositions = ({ positions }) => (
  <div style={{
    background: 'white',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.1)',
    marginBottom: '24px',
    overflow: 'hidden',
  }}>
    <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
      <h3 style={{ color: '#111827', fontSize: '16px', fontWeight: '700', margin: 0 }}>Liquidity Positions</h3>
    </div>
    
    {positions.length === 0 ? (
      <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
        <p style={{ fontSize: '14px' }}>No liquidity positions yet</p>
      </div>
    ) : (
      <div style={{ padding: '16px' }}>
        {positions.map((position, index) => (
          <div
            key={index}
            style={{
              padding: '16px',
              background: 'rgba(249, 250, 251, 0.5)',
              borderRadius: '12px',
              marginBottom: index < positions.length - 1 ? '12px' : 0,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TokenPairIcon token1={position.token1} token2={position.token2} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#111827', fontWeight: '600', fontSize: '15px' }}>
                      {position.token1} / {position.token2}
                    </span>
                    <StatusBadge status={position.status} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StatusBadge status={position.hookName || 'Standard'} />
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '2px' }}>TVL in Position</div>
                <div style={{ 
                  color: '#111827', 
                  fontSize: '18px', 
                  fontWeight: '700',
                  fontFamily: 'SF Mono, Monaco, monospace',
                }}>
                  ${position.tvl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '24px', 
              marginTop: '12px', 
              paddingTop: '12px',
              borderTop: '1px solid rgba(139, 92, 246, 0.1)',
            }}>
              <div>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>Fees Earned</span>
                <div style={{ color: '#10b981', fontSize: '14px', fontWeight: '600', fontFamily: 'SF Mono, Monaco, monospace' }}>
                  +${position.feesEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>Fee Tier</span>
                <div style={{ color: '#374151', fontSize: '14px', fontWeight: '600' }}>
                  {position.feeTier}%
                </div>
              </div>
              <div>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>Range</span>
                <div style={{ color: '#374151', fontSize: '14px', fontWeight: '600', fontFamily: 'SF Mono, Monaco, monospace' }}>
                  {position.rangeLow} - {position.rangeHigh}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Activity Item
const ActivityItem = ({ activity }) => {
  const getActionIcon = (type) => {
    switch (type) {
      case 'Swap': return <SwapIcon />;
      case 'Add Liquidity': return <PlusCircleIcon />;
      case 'Remove Liquidity': return <MinusCircleIcon />;
      case 'Hook Action': return <BoltIcon />;
      default: return <SwapIcon />;
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'Swap': return '#3b82f6';
      case 'Add Liquidity': return '#10b981';
      case 'Remove Liquidity': return '#f59e0b';
      case 'Hook Action': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircleIcon />;
      case 'Pending': return <ClockIcon />;
      case 'Failed': return <XCircleIcon />;
      default: return <CheckCircleIcon />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '16px',
      borderBottom: '1px solid rgba(139, 92, 246, 0.08)',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: `${getActionColor(activity.type)}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: getActionColor(activity.type),
        flexShrink: 0,
      }}>
        {getActionIcon(activity.type)}
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ color: '#111827', fontWeight: '600', fontSize: '14px' }}>
            {activity.type}
          </span>
          <StatusBadge status={activity.status} />
        </div>
        <div style={{ color: '#374151', fontSize: '13px', marginBottom: '4px' }}>
          {activity.description}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            color: '#6b7280',
            fontSize: '12px',
          }}>
            {activity.initiator === 'Agent' ? <BotIcon /> : <UserIcon />}
            {activity.initiator}
          </div>
          <span style={{ color: '#9ca3af', fontSize: '12px' }}>
            {activity.timestamp}
          </span>
          <a
            href={`https://sepolia.basescan.org/tx/${activity.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#8b5cf6',
              fontSize: '12px',
              textDecoration: 'none',
            }}
          >
            {activity.txHash.slice(0, 6)}...{activity.txHash.slice(-4)}
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
      
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ 
          color: '#111827', 
          fontSize: '14px', 
          fontWeight: '600',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}>
          {activity.amount}
        </div>
        {activity.amountUsd && (
          <div style={{ color: '#6b7280', fontSize: '12px' }}>
            ${activity.amountUsd}
          </div>
        )}
      </div>
    </div>
  );
};

// Activity Feed
const ActivityFeed = ({ activities, filter, setFilter }) => {
  const filters = ['All', 'Swaps', 'Liquidity'];
  
  const filteredActivities = activities.filter(a => {
    if (filter === 'All') return true;
    if (filter === 'Swaps' && a.type === 'Swap') return true;
    if (filter === 'Liquidity' && (a.type === 'Add Liquidity' || a.type === 'Remove Liquidity')) return true;
    return false;
  });

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h3 style={{ color: '#111827', fontSize: '16px', fontWeight: '700', margin: 0 }}>Activity</h3>
        
        <div style={{ display: 'flex', gap: '8px', background: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                background: filter === f ? 'white' : 'transparent',
                color: filter === f ? '#111827' : '#6b7280',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      {filteredActivities.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
          <p style={{ fontSize: '14px' }}>No recent activity</p>
        </div>
      ) : (
        <div>
          {filteredActivities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

// ============ PORTFOLIO INTERFACE ============
const PortfolioInterface = ({ onClose, type, theme, isDark }) => {
  const [activityFilter, setActivityFilter] = useState('All');

  // Mock data tailored for empty/filled states based on requirements
  // For now, we will render empty states if type is 'Agent' to match prompt requirements of "not prefilled"
  // User portfolio can show some dummy data for visualization
  
  const isAgent = type === 'Agent';
  const hasData = !isAgent; // Only user portfolio has data for now

  const portfolioData = hasData ? {
    totalValue: 12450.25,
    ethBalance: 3.245,
    ethPrice: 3245.50,
    usdcBalance: 1850.45,
    lpPositions: 2,
    lpValue: 4250.80,
    netPnl: 12.5,
    netPnlUsd: 1450.20
  } : {
    totalValue: 0,
    ethBalance: 0,
    ethPrice: 0,
    usdcBalance: 0,
    lpPositions: 0,
    lpValue: 0,
    netPnl: 0,
    netPnlUsd: 0
  };

  const assets = hasData ? [
    { name: 'Ethereum', symbol: 'ETH', balance: 3.245, usdValue: 10531.64, percentage: 84.5 },
    { name: 'USD Coin', symbol: 'USDC', balance: 1850.45, usdValue: 1850.45, percentage: 14.8 },
  ] : [];

  const liquidityPositions = hasData ? [
    { token1: 'ETH', token2: 'USDC', status: 'Active', hookName: 'MEV Protection', tvl: 2450.50, feesEarned: 124.50, feeTier: 0.05, rangeLow: 2800, rangeHigh: 3600 }
  ] : [];

  const activities = hasData ? [
    { type: 'Swap', status: 'Completed', description: 'Swapped ETH for USDC', initiator: 'User', timestamp: '2 mins ago', txHash: '0x123...abc', amount: '1.2 ETH', amountUsd: '3,894.50' },
    { type: 'Add Liquidity', status: 'Completed', description: 'Added liquidity to ETH/USDC', initiator: 'User', timestamp: '4 hours ago', txHash: '0x456...def', amount: '2.5 ETH', amountUsd: '8,113.75' },
  ] : [];

  return (
    <div style={{ width: '100%', fontFamily: '"DM Sans", sans-serif' }}>
      <div style={{
        background: '#f3f4f6', // Light gray background for contrast within modal
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        padding: '24px',
        maxHeight: '85vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
           <h1 style={{ margin: 0, fontSize: '24px', color: '#111827' }}>{type} Portfolio</h1>
           <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}>
             <CloseIcon />
           </button>
        </div>

        <PortfolioSummary data={portfolioData} />
        <AssetsTable assets={assets} />
        <LiquidityPositions positions={liquidityPositions} />
        <ActivityFeed activities={activities} filter={activityFilter} setFilter={setActivityFilter} />
      </div>
    </div>
  );
};

const RecentChatItem = ({ chat, theme, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <button 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%', 
        padding: '8px 12px', 
        borderRadius: 6, 
        color: theme.textSecondary, 
        fontSize: 13, 
        cursor: 'pointer',
        textAlign: 'left',
        background: hovered ? theme.bgCard : 'transparent',
        border: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', flex: 1, minWidth: 0 }}>
        <MessageSquareIcon />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat}</span>
      </div>
      {hovered && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            padding: 4,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = theme.bgPrimary; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'inherit'; e.currentTarget.style.background = 'transparent'; }}
        >
          <TrashIcon size={14} />
        </div>
      )}
    </button>
  );
};

// ============ THEMES ============
const themes = {
  light: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgSidebar: '#ffffff',
    bgCard: '#ffffff',
    bgInput: '#ffffff',
    textPrimary: '#1a1a2e',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    border: '#e5e7eb',
    accent: '#a855f7',
    accentLight: '#f3e8ff',
  },
  dark: {
    bgPrimary: '#0f0f14',
    bgSecondary: '#08080c',
    bgSidebar: '#0f0f14',
    bgCard: '#1a1a24',
    bgInput: '#1a1a24',
    textPrimary: '#f0f0f5',
    textSecondary: '#8b8b9e',
    textMuted: '#5a5a6e',
    border: 'rgba(255,255,255,0.08)',
    accent: '#a855f7',
    accentLight: 'rgba(168,85,247,0.15)',
  }
};

// ============ SWAP COMPONENTS ============
const MiniChart = ({ data, color = "#10b981" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 40;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${points} ${width},${height}`} fill="url(#chartGradient)"/>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// Price Chart Component Placeholder
const PriceChart = ({ pair, theme }) => {
  // Simple candlestick visualization using SVG
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      <line x1="0" y1="50" x2="400" y2="50" stroke={theme.border} strokeDasharray="4 4" />
      <line x1="0" y1="100" x2="400" y2="100" stroke={theme.border} strokeDasharray="4 4" />
      <line x1="0" y1="150" x2="400" y2="150" stroke={theme.border} strokeDasharray="4 4" />
      
      {/* Candles (mock data) */}
      {[...Array(20)].map((_, i) => {
        const x = i * 20 + 10;
        const height = Math.random() * 60 + 20;
        const y = 100 - Math.random() * 40;
        const isGreen = Math.random() > 0.4;
        const color = isGreen ? '#10b981' : '#ef4444';
        
        return (
          <g key={i}>
            <line x1={x} y1={y - 10} x2={x} y2={y + height + 10} stroke={color} strokeWidth="1" />
            <rect x={x - 6} y={isGreen ? y : y + height * 0.2} width="12" height={isGreen ? height : height * 0.8} fill={color} rx="2" />
          </g>
        );
      })}
    </svg>
  );
};

// Token Select Modal
const TokenSelectModal = ({ isOpen, onClose, onSelect, theme, isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const tokens = [
    { symbol: 'mUSDC', name: 'Mock USDC', address: '0x9F78...9b4d', balance: '1,250.00', usdValue: '$1,250.00', icon: '$' },
    { symbol: 'mETH', name: 'Mock ETH', address: '0x3a2c...1e4f', balance: '4.52', usdValue: '$14,667.90', icon: 'Ξ' },
    { symbol: 'ETH', name: 'Ethereum', address: '0x0000...0000', balance: '0.85', usdValue: '$2,758.25', icon: 'Ξ' },
    { symbol: 'mDAI', name: 'Mock DAI', address: '0x5d3a...8c2b', balance: '400.00', usdValue: '$400.00', icon: '◈' },
    { symbol: 'mBTC', name: 'Mock BTC', address: '0x2b1a...7d9e', balance: '0.15', usdValue: '$14,250.00', icon: '₿' },
    { symbol: 'mLINK', name: 'Mock LINK', address: '0x8f4e...2a1c', balance: '150.00', usdValue: '$2,850.00', icon: '⬡' },
  ];

  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTokenIcon = (token) => {
    // Reuse base asset icons logic
    const baseSymbol = token.symbol.replace('m', '');
    
    let background = 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)'; // Default ETH
    if (baseSymbol === 'USDC') background = 'linear-gradient(135deg, #2775CA 0%, #4A9FE8 100%)';
    if (baseSymbol === 'DAI') background = 'linear-gradient(135deg, #F5AC37 0%, #FFD166 100%)';
    if (baseSymbol === 'BTC') background = 'linear-gradient(135deg, #F7931A 0%, #FFAB4A 100%)';
    if (baseSymbol === 'LINK') background = 'linear-gradient(135deg, #2A5ADA 0%, #5480F0 100%)';

    return (
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: '700',
        color: 'white',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {token.icon}
      </div>
    );
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        maxHeight: '90vh',
        background: isDark ? '#13131a' : '#ffffff',
        borderRadius: '20px',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>Swap From Token</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: theme.textSecondary, padding: '4px' }}>
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '0 24px 16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6', 
            borderRadius: '12px', 
            padding: '12px 16px',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'transparent'}`
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2" style={{ marginRight: '10px' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search token" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{ 
                background: 'transparent', 
                border: 'none', 
                outline: 'none', 
                color: theme.textPrimary, 
                fontSize: '16px', 
                width: '100%' 
              }} 
            />
          </div>
        </div>

        <div style={{ height: '1px', background: theme.border, opacity: 0.5, marginBottom: '8px' }}></div>
        
        {/* Token List */}
        <div style={{ padding: '0 8px 16px', overflowY: 'auto', flex: 1 }}>
          {filteredTokens.length > 0 ? (
            filteredTokens.map(token => (
              <button
                key={token.symbol}
                onClick={() => { onSelect(token.symbol); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px 16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderRadius: '12px',
                  transition: 'background 0.2s',
                  marginBottom: '2px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {getTokenIcon(token)}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '16px' }}>{token.symbol}</span>
                      <span style={{ color: theme.textMuted, fontSize: '12px' }}>{token.name}</span>
                    </div>
                    <span style={{ color: theme.textSecondary, fontSize: '12px', fontFamily: 'SF Mono, Monaco, monospace' }}>{token.address}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '16px' }}>{token.balance}</span>
                  <span style={{ color: theme.textSecondary, fontSize: '13px' }}>{token.usdValue}</span>
                </div>
              </button>
            ))
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', color: theme.textSecondary }}>
              No tokens found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TokenSelect = ({ token, balance, usdValue, side, amount, theme, onTokenClick, onAmountChange }) => (
  <div style={{
    background: theme ? theme.bgSecondary : 'rgba(249, 250, 251, 0.8)',
    borderRadius: '16px',
    padding: '16px',
    border: theme ? `1px solid ${theme.border}` : '1px solid rgba(139, 92, 246, 0.1)',
    marginBottom: '4px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
      <span style={{ color: theme ? theme.textSecondary : '#6b7280', fontSize: '14px', fontWeight: '500' }}>{side}</span>
      {balance && <span style={{ color: theme ? theme.textMuted : '#9ca3af', fontSize: '13px' }}>Balance: {balance}</span>}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <input
        type="text"
        value={amount}
        onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
        placeholder="0.00"
        style={{
          background: 'transparent',
          border: 'none',
          color: theme ? theme.textPrimary : '#111827',
          fontSize: '32px',
          fontWeight: '600',
          width: '60%',
          outline: 'none',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}
      />
      <button 
        onClick={onTokenClick}
        style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px 8px 8px',
        borderRadius: '24px',
        border: theme ? `1px solid ${theme.border}` : '1px solid rgba(139, 92, 246, 0.2)',
        background: theme ? theme.bgCard : 'white',
        color: theme ? theme.textPrimary : '#1f2937',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: token.includes('ETH') 
            ? 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)'
            : token.includes('USDC')
              ? 'linear-gradient(135deg, #2775CA 0%, #4A9FE8 100%)'
              : token.includes('DAI')
                ? 'linear-gradient(135deg, #F5AC37 0%, #FFD166 100%)'
                : token.includes('BTC')
                  ? 'linear-gradient(135deg, #F7931A 0%, #FFAB4A 100%)'
                  : token.includes('LINK')
                    ? 'linear-gradient(135deg, #2A5ADA 0%, #5480F0 100%)'
                    : 'linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: token.includes('ETH') ? '16px' : '12px',
          fontWeight: '700',
          color: 'white',
        }}>
          {token.includes('ETH') ? 'Ξ' : 
           token.includes('USDC') ? '$' :
           token.includes('DAI') ? '◈' :
           token.includes('BTC') ? '₿' :
           token.includes('LINK') ? '⬡' : '?'}
        </div>
        {token || 'Select'}
        <ChevronDownIcon />
      </button>
    </div>
    {usdValue && <div style={{ color: theme ? theme.textMuted : '#9ca3af', fontSize: '13px', marginTop: '4px' }}>≈ ${usdValue}</div>}
  </div>
);

// Hook Selector Modal
const HookSelectorModal = ({ isOpen, onClose, hooks, selectedHook, onSelect, theme, isDark }) => {
  const [customAddress, setCustomAddress] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '20px',
    }}>
      <div style={{
        width: '90%',
        maxHeight: '90%',
        background: theme.bgCard,
        borderRadius: '20px',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Select Swap Hook</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: theme.textSecondary }}>
            <CloseIcon />
          </button>
        </div>
        
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)', 
            borderRadius: '12px', 
            padding: '16px', 
            marginBottom: '20px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ color: '#8b5cf6', marginTop: '2px' }}><StarIcon /></div>
              <div>
                <div style={{ fontWeight: '600', color: theme.textPrimary, marginBottom: '4px' }}>AI Recommendation</div>
                <div style={{ fontSize: '13px', color: theme.textSecondary, lineHeight: '1.5' }}>
                  Based on your trade size of <span style={{ fontWeight: '600', color: theme.textPrimary }}>$4,868</span>, we recommend <span style={{ fontWeight: '600', color: '#8b5cf6' }}>MEV Protection</span> to prevent sandwich attacks.
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hooks.map(hook => (
              <button
                key={hook.id}
                onClick={() => { onSelect(hook.id); onClose(); }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: '12px',
                  border: selectedHook === hook.id 
                    ? `2px solid #8b5cf6` 
                    : `1px solid ${theme.border}`,
                  background: selectedHook === hook.id 
                    ? (isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)') 
                    : theme.bgSecondary,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                {hook.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Recommended
                  </div>
                )}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: selectedHook === hook.id ? 'rgba(139, 92, 246, 0.2)' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: selectedHook === hook.id ? '#8b5cf6' : theme.textSecondary,
                  flexShrink: 0,
                }}>
                  {hook.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '15px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {hook.name}
                    {selectedHook === hook.id && <CheckIcon />}
                  </div>
                  <div style={{ color: theme.textSecondary, fontSize: '13px', lineHeight: '1.4', marginBottom: '8px' }}>{hook.description}</div>
                  {hook.benefit && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}>
                      {hook.benefit}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Custom Hook Section */}
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => setShowCustomInput(!showCustomInput)}
              style={{ 
                width: '100%',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px',
                borderRadius: '12px',
                border: showCustomInput 
                  ? '2px solid #8b5cf6'
                  : `1px solid ${theme.border}`,
                background: showCustomInput 
                  ? (isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)') 
                  : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                color: theme.textPrimary
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: showCustomInput ? 'rgba(139, 92, 246, 0.2)' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: showCustomInput ? '#8b5cf6' : theme.textSecondary,
                }}>
                  <CodeIcon />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: theme.textPrimary }}>Custom Hook Address</div>
                  <div style={{ fontSize: '13px', color: theme.textSecondary }}>Use your own deployed hook contract</div>
                </div>
              </div>
              {showCustomInput ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>

            {showCustomInput && (
              <div style={{ 
                marginTop: '12px', 
                padding: '20px', 
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}>
                <input 
                  type="text" 
                  placeholder="Enter hook contract address (0x...)"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: `1px solid ${theme.border}`,
                    background: theme.bgSecondary,
                    color: theme.textPrimary,
                    fontSize: '14px',
                    fontFamily: 'SF Mono, Monaco, monospace',
                    marginBottom: '12px',
                    outline: 'none'
                  }}
                />
                
                <button style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: theme.bgSecondary,
                  border: 'none',
                  color: theme.textSecondary,
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}>
                  Validate Address
                </button>

                <div style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  Recent Custom Hooks
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: `1px solid ${theme.border}`, 
                    background: theme.bgCard,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: theme.textPrimary }}>TWAMM Hook</div>
                      <div style={{ fontSize: '12px', color: theme.textSecondary, fontFamily: 'monospace' }}>0x1234...5678</div>
                    </div>
                    <div style={{ fontSize: '12px', color: theme.textMuted }}>2 days ago</div>
                  </div>
                  
                  <div style={{ 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: `1px solid ${theme.border}`, 
                    background: theme.bgCard,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: theme.textPrimary }}>Custom Fee Hook</div>
                      <div style={{ fontSize: '12px', color: theme.textSecondary, fontFamily: 'monospace' }}>0xabcd...efgh</div>
                    </div>
                    <div style={{ fontSize: '12px', color: theme.textMuted }}>1 week ago</div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (customAddress) {
                      onSelect('custom');
                      onClose();
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    border: 'none',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '15px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  Apply Hook Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ SWAP INTERFACE ============
const SwapInterface = ({ onClose, swapDetails, theme, isDark }) => {
  const [selectedHook, setSelectedHook] = useState(swapDetails?.hook || 'mev');
  const [isHookModalOpen, setIsHookModalOpen] = useState(false);
  
  // State for token selector
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const [selectingSide, setSelectingSide] = useState(null); // 'from' or 'to'
  
  // Swap state
  const [fromToken, setFromToken] = useState(swapDetails?.fromToken || "ETH");
  const [toToken, setToToken] = useState(swapDetails?.toToken || "USDC");
  const [fromAmount, setFromAmount] = useState(swapDetails?.fromAmount || "");
  // To amount is just a placeholder for now as we don't have real pricing logic in this mock
  const [toAmount, setToAmount] = useState(swapDetails?.toAmount || ""); 
  
  // Update local state when props change
  useEffect(() => {
     if (swapDetails) {
        setFromToken(swapDetails.fromToken || "ETH");
        setToToken(swapDetails.toToken || "USDC");
        setFromAmount(swapDetails.fromAmount || "");
        setToAmount(swapDetails.toAmount || "");
     }
  }, [swapDetails]);

  const handleTokenSelect = (tokenSymbol) => {
    if (selectingSide === 'from') {
        setFromToken(tokenSymbol);
        // Clear inputs on selection as per requirements
        setFromAmount('');
        setToAmount('');
    } else {
        setToToken(tokenSymbol);
        // Clear inputs on selection as per requirements
        setFromAmount('');
        setToAmount('');
    }
    setIsTokenSelectorOpen(false);
  };

  const openTokenSelector = (side) => {
    setSelectingSide(side);
    setIsTokenSelectorOpen(true);
  };

  const hooks = [
    { id: 'mev', name: 'MEV Protection', description: 'Randomized execution timing protects against sandwich attacks', icon: <ShieldIcon />, benefit: 'Save ~0.3% on trades >$1k', recommended: true },
    { id: 'directional', name: 'Directional Fee', description: 'Dynamic fees based on trade direction (Nezlobin algorithm)', icon: <TrendIcon />, benefit: 'Lower fees in stable markets' },
    { id: 'jit', name: 'JIT Rebalancing', description: 'Concentrates liquidity around your trade for better execution', icon: <BoltIcon />, benefit: 'Better rates on large trades' },
    { id: 'none', name: 'No Hook', description: 'Standard Uniswap v4 swap without modifications', icon: <SwapIcon /> },
  ];

  useEffect(() => {
    if (swapDetails?.hook) {
        // Find if hook name matches
        const hookId = hooks.find(h => h.name.toLowerCase().includes(swapDetails.hook.toLowerCase()) || h.id.toLowerCase() === swapDetails.hook.toLowerCase())?.id;
        if (hookId) setSelectedHook(hookId);
        else if (swapDetails.hook.toLowerCase().includes('custom')) setSelectedHook('custom');
    }
  }, [swapDetails]);

  const getSelectedHookObj = () => {
    return hooks.find(h => h.id === selectedHook) || hooks[4]; // Default to No Hook if not found
  };

  const selectedHookObj = getSelectedHookObj();

  return (
    <div style={{ 
      width: '90%', 
      maxWidth: '900px',
      margin: '0 auto 20px',
      zIndex: 50,
      background: theme.bgSecondary,
      borderRadius: '20px',
      border: `1px solid ${theme.border}`,
      boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
      padding: '24px',
      fontFamily: '"DM Sans", sans-serif',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: theme.textSecondary }}>
          <CloseIcon />
        </button>
      </div>

      {/* Hook Selector Modal */}
      <HookSelectorModal 
        isOpen={isHookModalOpen} 
        onClose={() => setIsHookModalOpen(false)} 
        hooks={hooks} 
        selectedHook={selectedHook} 
        onSelect={setSelectedHook} 
        theme={theme}
        isDark={isDark}
      />

      {/* Token Selector Modal */}
      <TokenSelectModal 
        isOpen={isTokenSelectorOpen}
        onClose={() => setIsTokenSelectorOpen(false)}
        onSelect={handleTokenSelect}
        theme={theme}
        isDark={isDark}
      />

      {/* AI Response Banner */}
      {swapDetails && (
        <div style={{
          marginBottom: '24px',
          padding: '16px 20px',
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
          }}>
            <span style={{ fontSize: '18px' }}>✨</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '15px', marginBottom: '2px' }}>
              Swapping {swapDetails.fromAmount} {swapDetails.fromToken} → {swapDetails.toToken}
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '13px' }}>
              Auto-selected <span style={{ color: '#8b5cf6', fontWeight: '600' }}>MEV Protection</span> to save ~$14.60
            </div>
          </div>
          <div style={{ paddingRight: '10px' }}>
             <MiniChart data={[3200, 3180, 3220, 3250, 3230, 3280, 3245]} color="#8b5cf6" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '32px' }}>
        
        {/* LEFT COLUMN: Swap Panel */}
        <div style={{
          background: theme.bgCard,
          borderRadius: '24px',
          padding: '24px',
          border: `1px solid ${theme.border}`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: theme.textPrimary, fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' }}>Swap</h2>
            <button style={{ background: 'transparent', border: 'none', color: theme.textMuted, cursor: 'pointer', padding: '8px', borderRadius: '50%', '&:hover': { background: theme.bgSecondary } }}>
              <SettingsIcon />
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <TokenSelect 
              token={fromToken} 
              balance="3.245" 
              usdValue={fromAmount ? "4,868.25" : "0.00"} 
              side="Sell" 
              amount={fromAmount} 
              theme={theme}
              onTokenClick={() => openTokenSelector('from')}
              onAmountChange={(val) => setFromAmount(val)}
            />
            
            <div style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 10 
            }}>
              <button style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: `4px solid ${theme.bgCard}`,
                background: theme.bgSecondary,
                color: theme.accent,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}>
                <ArrowLeftRightIcon />
              </button>
            </div>

            <TokenSelect 
              token={toToken} 
              balance="12,450.00" 
              usdValue={fromAmount ? "4,868.25" : "0.00"} 
              side="Buy" 
              amount={toAmount} 
              theme={theme}
              onTokenClick={() => openTokenSelector('to')}
            />
          </div>

          {/* Hook Selection - Inline Preview */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: theme.textSecondary, fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Swap Hook</span>
            </div>

            <button 
              onClick={() => setIsHookModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: `1px solid ${theme.border}`,
                background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${theme.accent}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.accent,
                }}>
                  {selectedHookObj.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: theme.textPrimary, fontWeight: '700', fontSize: '15px' }}>{selectedHookObj.name}</div>
                  <div style={{ color: '#10b981', fontSize: '13px', fontWeight: '500' }}>
                    {selectedHookObj.benefit ? `+${selectedHookObj.benefit}` : 'Standard execution'}
                  </div>
                </div>
              </div>
              <div style={{ color: theme.accent, fontWeight: '600', fontSize: '13px' }}>
                Change
              </div>
            </button>
          </div>

          {/* Swap Details Breakdown */}
          <div style={{ marginTop: '24px', padding: '16px', background: theme.bgSecondary, borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
              <span style={{ color: theme.textSecondary }}>Rate</span>
              <span style={{ color: theme.textPrimary, fontWeight: '500' }}>1 ETH = 3,245.50 USDC</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
              <span style={{ color: theme.textSecondary }}>Network Fee</span>
              <span style={{ color: theme.textPrimary, fontWeight: '500' }}>~$2.45</span>
            </div>
            
            <div style={{ borderTop: `1px solid ${theme.border}`, margin: '12px 0', padding: '12px 0' }}>
              <div style={{ color: theme.textSecondary, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>Fee Architecture</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ color: theme.textMuted }}>LP Fee (Dynamic)</span>
                <span style={{ color: theme.textPrimary }}>0.05%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ color: theme.textMuted }}>Protocol Fee</span>
                <span style={{ color: theme.textPrimary }}>0.00%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: theme.textMuted }}>Hook Fee</span>
                <span style={{ color: theme.textPrimary }}>0.01%</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: theme.textSecondary }}>Price Impact</span>
                <span style={{ color: '#10b981' }}>&lt;0.01%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: theme.textSecondary }}>Max Slippage</span>
                <span style={{ color: theme.textPrimary }}>0.5%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: theme.textSecondary }}>Hook Benefit</span>
                <span style={{ color: '#10b981', fontWeight: '700' }}>+$14.60 saved</span>
              </div>
            </div>
          </div>

          {/* Swap Execution Button */}
          <button style={{
            width: '100%',
            padding: '18px',
            marginTop: '24px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
            transition: 'transform 0.1s',
          }}>
            Swap ETH → USDC with {selectedHookObj.name.replace(' (Smart Routing)', '')}
          </button>
        </div>

        {/* RIGHT COLUMN: Chart & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: theme.bgCard,
            borderRadius: '24px',
            padding: '24px',
            border: `1px solid ${theme.border}`,
            flex: 1,
            minHeight: '300px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '600', color: 'white', marginRight: '-10px', zIndex: 2, border: `3px solid ${theme.bgCard}` }}>Ξ</div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #2775CA 0%, #4A9FE8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: 'white', border: `3px solid ${theme.bgCard}` }}>$</div>
                  </div>
                  <span style={{ color: theme.textPrimary, fontWeight: '700', fontSize: '18px' }}>ETH / USDC</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ color: theme.textPrimary, fontSize: '32px', fontWeight: '700', fontFamily: 'SF Mono, Monaco, monospace', letterSpacing: '-0.03em' }}>$3,245.50</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                    <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '700' }}>+2.34%</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px', background: theme.bgSecondary, padding: '4px', borderRadius: '10px' }}>
                {['1H', '4H', '1D', '1W'].map((tf, i) => (
                  <button key={tf} style={{ 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: i === 2 ? theme.bgCard : 'transparent', 
                    color: i === 2 ? theme.textPrimary : theme.textSecondary, 
                    fontSize: '13px', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    boxShadow: i === 2 ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                  }}>{tf}</button>
                ))}
              </div>
            </div>
            
            <div style={{ height: '240px', width: '100%' }}>
               <PriceChart pair="ETH/USDC" theme={theme} />
            </div>
          </div>
          
          {/* Market Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: theme.bgCard, borderRadius: '20px', padding: '20px', border: `1px solid ${theme.border}` }}>
              <div style={{ color: theme.textSecondary, fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>24h Volume</div>
              <div style={{ color: theme.textPrimary, fontSize: '20px', fontWeight: '700' }}>$2.4B</div>
            </div>
            <div style={{ background: theme.bgCard, borderRadius: '20px', padding: '20px', border: `1px solid ${theme.border}` }}>
              <div style={{ color: theme.textSecondary, fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Pool TVL</div>
              <div style={{ color: theme.textPrimary, fontSize: '20px', fontWeight: '700' }}>$847M</div>
            </div>
            <div style={{ background: theme.bgCard, borderRadius: '20px', padding: '20px', border: `1px solid ${theme.border}` }}>
              <div style={{ color: theme.textSecondary, fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Current Fee</div>
              <div style={{ color: theme.textPrimary, fontSize: '20px', fontWeight: '700' }}>0.05%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ LIQUIDITY INTERFACE ============
const LiquidityInterface = ({ onClose, theme, isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHookFilter, setSelectedHookFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [sort, setSort] = useState({ key: 'liquidity', direction: 'desc' });
  
  const pools = [
    { 
      token1: 'mUSDT', token2: 'mETH', type: 'Standard', hook: 'MEV Protection',
      volume: 59199.58, fees: 19.60, liquidity: 318789.34, yield: '2.24'
    },
    { 
      token1: 'mUSDC', token2: 'mBTC', type: 'Standard', hook: 'Directional Fee',
      volume: 4500.00, fees: 12.50, liquidity: 368081.08, yield: '1.85'
    },
    { 
      token1: 'mUSDC', token2: 'mUSDT', type: 'Stable', hook: 'Directional Fee',
      volume: 80.55, fees: 0.40, liquidity: 971950.29, yield: '0.01'
    },
    { 
      token1: 'ETH', token2: 'mUSDT', type: 'Standard', hook: 'JIT Rebalancing',
      volume: 3195.71, fees: 1.20, liquidity: 1500.96, yield: '29.14'
    },
    { 
      token1: 'mBTC', token2: 'mETH', type: 'Standard', hook: 'MEV Protection',
      volume: 4366.80, fees: 1.69, liquidity: 370896.77, yield: '0.17'
    },
    { 
      token1: 'mUSDC', token2: 'mDAI', type: 'Stable', hook: 'None',
      volume: 0.00, fees: 0.00, liquidity: 4040.35, yield: '0.00'
    },
    { 
      token1: 'mDAI', token2: 'mETH', type: 'Standard', hook: 'MEV Protection',
      volume: 1250.00, fees: 0.85, liquidity: 24750.85, yield: '1.12'
    },
    { 
      token1: 'WETH', token2: 'mUSDC', type: 'Standard', hook: 'Directional Fee',
      volume: 15780.25, fees: 8.45, liquidity: 125000.00, yield: '3.45'
    },
  ];

  const hookOptions = ['All', 'MEV Protection', 'Directional Fee', 'JIT Rebalancing', 'None'];
  const typeOptions = ['All', 'Standard', 'Stable'];

  // Filter and sort pools
  const filteredPools = pools
    .filter(pool => {
      const matchesSearch = searchQuery === '' || 
        `${pool.token1} ${pool.token2}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesHook = selectedHookFilter === 'All' || pool.hook === selectedHookFilter;
      const matchesType = selectedTypeFilter === 'All' || pool.type === selectedTypeFilter;
      return matchesSearch && matchesHook && matchesType;
    })
    .sort((a, b) => {
      const multiplier = sort.direction === 'asc' ? 1 : -1;
      if (sort.key === 'yield') {
        return (parseFloat(a.yield) - parseFloat(b.yield)) * multiplier;
      }
      return (a[sort.key] - b[sort.key]) * multiplier;
    });

  const handleSort = (key) => {
    setSort(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Helper components for Liquidity Interface
  const SortableHeader = ({ label, sortKey, currentSort, onSort }) => {
    const isActive = currentSort.key === sortKey;
    const isAsc = currentSort.direction === 'asc';
  
    return (
      <button
        onClick={() => onSort(sortKey)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'transparent',
          border: 'none',
          color: isActive ? theme.accent : theme.textSecondary,
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          padding: '0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
        <span style={{ opacity: isActive ? 1 : 0.3 }}>
          {isActive && isAsc ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </button>
    );
  };

  const HookBadge = ({ hook }) => {
    const hookConfig = {
      'MEV Protection': { icon: <ShieldIcon />, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
      'Directional Fee': { icon: <TrendIcon />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
      'JIT Rebalancing': { icon: <BoltIcon />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
      'None': { icon: null, color: theme.textSecondary, bg: theme.bgSecondary },
    };
    const config = hookConfig[hook] || hookConfig['None'];
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', background: config.bg, color: config.color, fontSize: '11px', fontWeight: '600' }}>
        {config.icon}
        {hook}
      </div>
    );
  };

  const PoolTypeBadge = ({ type }) => {
    const isStable = type === 'Stable';
    return (
      <span style={{ padding: '3px 8px', borderRadius: '4px', background: isStable ? 'rgba(16, 185, 129, 0.1)' : theme.bgSecondary, color: isStable ? '#10b981' : theme.textSecondary, fontSize: '11px', fontWeight: '500' }}>
        {type}
      </span>
    );
  };

  const YieldBadge = ({ value }) => {
    const numValue = parseFloat(value);
    const isPositive = numValue > 0;
    return (
      <span style={{ padding: '4px 10px', borderRadius: '6px', background: isPositive ? 'rgba(16, 185, 129, 0.15)' : theme.bgSecondary, color: isPositive ? '#10b981' : theme.textSecondary, fontSize: '13px', fontWeight: '600' }}>
        {value}%
      </span>
    );
  };


  const StatsCard = ({ label, value, change }) => (
    <div style={{ background: theme.bgCard, borderRadius: '12px', padding: '20px', border: `1px solid ${theme.border}`, flex: 1 }}>
      <div style={{ color: theme.textSecondary, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{label}</div>
      <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '700', fontFamily: 'SF Mono, Monaco, monospace' }}>{value}</div>
      {change && <div style={{ color: change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '12px', fontWeight: '500', marginTop: '4px' }}>{change} vs last week</div>}
    </div>
  );

  // Calculate totals
  const totalTVL = pools.reduce((sum, p) => sum + p.liquidity, 0);
  const totalVolume = pools.reduce((sum, p) => sum + p.volume, 0);
  const totalFees = pools.reduce((sum, p) => sum + p.fees, 0);

  return (
    <div style={{ width: '100%', fontFamily: '"DM Sans", sans-serif' }}>
      {/* AI Response Banner */}
      <div style={{
        marginBottom: '24px',
        padding: '16px 20px',
        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
          <span style={{ fontSize: '16px' }}>✨</span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ color: theme.textSecondary, fontSize: '14px', lineHeight: '1.5' }}>
            <span style={{ color: theme.accent, fontWeight: '600' }}>Showing {filteredPools.length} liquidity pools</span>
            {' '}• Pools with <strong>MEV Protection</strong> hooks help shield your LP positions from sandwich attacks. 
          </span>
        </div>
      </div>

      <div style={{ background: theme.bgCard, borderRadius: '24px', border: `1px solid ${theme.border}`, padding: '24px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>Liquidity Pools</h1>
            <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>Explore and manage your liquidity positions.</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: theme.textMuted, cursor: 'pointer', padding: '8px', borderRadius: '50%' }}>
            <CloseIcon />
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <StatsCard label="TVL" value={`$${totalTVL.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} change="+12.5%" />
          <StatsCard label="Volume (24H)" value={`$${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} change="+8.3%" />
          <StatsCard label="Fees (24H)" value={`$${totalFees.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} change="+5.2%" />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
           <div style={{ position: 'relative', flex: 1 }}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }}>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search pools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 40px', borderRadius: '12px', border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.textPrimary, fontSize: '14px', outline: 'none' }}
            />
          </div>
          
          <select
              value={selectedHookFilter}
              onChange={(e) => setSelectedHookFilter(e.target.value)}
              style={{ padding: '10px 32px 10px 12px', borderRadius: '12px', border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.textPrimary, fontSize: '13px', fontWeight: '500', cursor: 'pointer', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
            >
              {hookOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
            <PlusIcon /> Create Pool
          </button>
        </div>

        {/* Pools Table */}
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: '16px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.border}`, background: theme.bgSecondary }}>
                <th style={{ padding: '14px 16px', textAlign: 'left', color: theme.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Pool</th>
                <th style={{ padding: '14px 16px', textAlign: 'left' }}><SortableHeader label="Volume" sortKey="volume" currentSort={sort} onSort={handleSort} /></th>
                <th style={{ padding: '14px 16px', textAlign: 'left' }}><SortableHeader label="TVL" sortKey="liquidity" currentSort={sort} onSort={handleSort} /></th>
                <th style={{ padding: '14px 16px', textAlign: 'left' }}><SortableHeader label="Yield" sortKey="yield" currentSort={sort} onSort={handleSort} /></th>
                <th style={{ padding: '14px 16px', textAlign: 'left' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredPools.map((pool, i) => (
                <tr key={i} style={{ borderBottom: i === filteredPools.length - 1 ? 'none' : `1px solid ${theme.border}` }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <TokenPairIcon token1={pool.token1} token2={pool.token2} />
                      <div>
                        <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{pool.token1} / {pool.token2}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <PoolTypeBadge type={pool.type} />
                          <HookBadge hook={pool.hook} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}><span style={{ color: theme.textPrimary, fontFamily: 'SF Mono, Monaco, monospace', fontSize: '14px' }}>${pool.volume.toLocaleString()}</span></td>
                  <td style={{ padding: '16px' }}><span style={{ color: theme.textPrimary, fontFamily: 'SF Mono, Monaco, monospace', fontSize: '14px' }}>${pool.liquidity.toLocaleString()}</span></td>
                  <td style={{ padding: '16px' }}><YieldBadge value={pool.yield} /></td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                     <button style={{ padding: '8px 14px', borderRadius: '8px', border: `1px solid ${theme.accent}40`, background: `${theme.accent}10`, color: theme.accent, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// ============ AGENT BUILDER INTERFACE ============
const AgentBuilderInterface = ({ onClose, theme, isDark }) => {
  const promptOptions = [
    {
      title: 'Create a swap agent',
      subtitle: 'that executes trades based on price targets',
    },
    {
      title: 'Build an MEV protection agent',
      subtitle: 'to monitor and protect my transactions',
    },
    {
      title: 'Create a liquidity manager',
      subtitle: 'that rebalances my LP positions automatically',
    },
    {
      title: 'Build a price alert agent',
      subtitle: 'for ETH, BTC, and USDC price movements',
    },
    {
      title: 'Create a DCA agent',
      subtitle: 'to dollar-cost average into ETH weekly',
    },
    {
      title: 'Build a portfolio rebalancer',
      subtitle: 'that maintains 60/40 ETH/USDC allocation',
    },
  ];

  const handlePromptClick = (prompt) => {
    console.log('Selected:', prompt.title, prompt.subtitle);
    // Handle prompt selection - for now just log
  };

  const PromptCard = ({ title, subtitle, onClick }) => (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px',
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
        minHeight: '90px',
        width: '100%',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}66`;
        e.currentTarget.style.boxShadow = `0 4px 12px ${theme.accent}1A`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ 
        color: theme.textPrimary, 
        fontWeight: '600', 
        fontSize: '15px',
        marginBottom: '6px',
        lineHeight: '1.4',
      }}>
        {title}
      </div>
      <div style={{ 
        color: theme.textSecondary, 
        fontSize: '14px',
        lineHeight: '1.4',
      }}>
        {subtitle}
      </div>
    </button>
  );

  return (
    <div style={{ width: '100%', fontFamily: '"DM Sans", sans-serif' }}>
      {/* Welcome Card */}
      <div style={{
        background: theme.bgCard,
        borderRadius: '16px',
        border: `1px solid ${theme.border}`,
        padding: '32px',
        marginBottom: '32px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: theme.textMuted, cursor: 'pointer', padding: '8px', borderRadius: '50%' }}>
            <CloseIcon />
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          marginBottom: '16px',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
            <BotIcon />
          </div>
          <div>
            <h1 style={{ 
              color: theme.textPrimary, 
              fontSize: '24px', 
              fontWeight: '700', 
              margin: '0 0 4px 0',
            }}>
              Welcome to Agent Builder
            </h1>
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                fontSize: '12px',
                fontWeight: '600',
            }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                Base Sepolia
            </div>
          </div>
        </div>
        
        <p style={{ 
          color: theme.textSecondary, 
          fontSize: '15px', 
          lineHeight: '1.6',
          margin: 0,
          maxWidth: '600px'
        }}>
          Create AI-powered agents that automate your DeFi strategies on Uniswap v4. 
          Agents can execute swaps, manage liquidity, monitor prices, and leverage hooks 
          like{' '}
          <span style={{ color: theme.accent, fontWeight: '500' }}>MEV Protection</span>,{' '}
          <span style={{ color: theme.accent, fontWeight: '500' }}>Directional Fee</span>, and{' '}
          <span style={{ color: theme.accent, fontWeight: '500' }}>JiT Rebalancing</span>.
        </p>
      </div>

      {/* Prompt Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {promptOptions.map((prompt, index) => (
          <PromptCard
            key={index}
            title={prompt.title}
            subtitle={prompt.subtitle}
            onClick={() => handlePromptClick(prompt)}
          />
        ))}
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function MantuaApp() {
  const [location, setLocation] = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mantua-theme');
      if (saved) return saved === 'dark';
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('mantua-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recentChatsOpen, setRecentChatsOpen] = useState(true);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showSwap, setShowSwap] = useState(false);
  const [showLiquidity, setShowLiquidity] = useState(false);
  const [showAgentBuilder, setShowAgentBuilder] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [portfolioType, setPortfolioType] = useState('User');
  const [swapDetails, setSwapDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const walletAddress = '0xbaac...DC87';
  const walletBalance = '0.0021 ETH';
  
  const [recentChats, setRecentChats] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mantua-recent-chats');
      if (saved) return JSON.parse(saved);
    }
    return ['swap', 'swap', 'pools', 'Swap ETH for USDC wi...', 'Swap ETH for USDC wi...', 'What is the price of ETh?', 'Analyze'];
  });

  useEffect(() => {
    localStorage.setItem('mantua-recent-chats', JSON.stringify(recentChats));
  }, [recentChats]);

  const [hasInteracted, setHasInteracted] = useState(false);

  const theme = isDark ? themes.dark : themes.light;

  // Parse swap command from user input
  const parseSwapCommand = (input) => {
    const swapRegex = /swap\s+(\d*\.?\d+)?\s*(\w+)?\s*(?:for|to|->|→)?\s*(\w+)?(?:\s+(?:using|with)\s+(.+))?/i;
    const match = input.match(swapRegex);
    
    if (match || input.toLowerCase().includes('swap')) {
      return {
        fromAmount: match?.[1] || '',
        fromToken: match?.[2]?.toUpperCase() || '',
        toToken: match?.[3]?.toUpperCase() || '',
        hook: match?.[4]?.trim() || ''
      };
    }
    return null;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setHasInteracted(true);

    // Check for Liquidity Intent
    if (inputValue.toLowerCase().includes('add liquidity') || inputValue.toLowerCase().includes('liquidity')) {
       setShowLiquidity(true);
       setShowSwap(false);
       setShowAgentBuilder(false);
       setMessages([...messages, { role: 'user', content: inputValue }]);
       setInputValue('');
       return;
    }

    // Check for Agent Builder Intent
    const agentKeywords = ['create an agent', 'build an agent', 'create a swap agent', 'build a liquidity agent', 'i want an ai agent', 'set up an agent', 'create a trading bot', 'build a defi agent'];
    if (agentKeywords.some(keyword => inputValue.toLowerCase().includes(keyword))) {
        setShowAgentBuilder(true);
        setShowSwap(false);
        setShowLiquidity(false);
        setMessages([...messages, { role: 'user', content: inputValue }]);
        setInputValue('');
        return;
    }

    // Check for Portfolio Intent
    const portfolioKeywords = ['portfolio', 'open portfolio', 'show my portfolio', 'user portfolio', 'agent portfolio', 'show agent portfolio'];
    if (portfolioKeywords.some(keyword => inputValue.toLowerCase().includes(keyword))) {
        setHasInteracted(true);
        if (inputValue.toLowerCase().includes('agent')) {
            setPortfolioType('Agent');
            setShowPortfolioModal(true);
        } else if (inputValue.toLowerCase().includes('user') || inputValue.toLowerCase().includes('my')) {
            setPortfolioType('User');
            setShowPortfolioModal(true);
        } else {
           // Ambiguous - open sidebar dropdown
           setPortfolioOpen(true);
           setSidebarOpen(true);
           // Maybe focus on sidebar? For now just opening is enough indication
        }
        setMessages([...messages, { role: 'user', content: inputValue }]);
        setInputValue('');
        
        // Hide other modals if opening portfolio
        if (inputValue.toLowerCase().includes('agent') || inputValue.toLowerCase().includes('user') || inputValue.toLowerCase().includes('my')) {
           setShowSwap(false);
           setShowLiquidity(false);
           setShowAgentBuilder(false);
        }
        return;
    }

    const swapCmd = parseSwapCommand(inputValue);
    if (swapCmd) {
      setSwapDetails(swapCmd);
      setShowSwap(true);
      setShowLiquidity(false);
      setShowAgentBuilder(false);
      setMessages([...messages, { role: 'user', content: inputValue }]);
    } else {
      // Regular message
      setMessages([...messages, { role: 'user', content: inputValue }]);
    }
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif', background: theme.bgSecondary, color: theme.textPrimary, transition: 'all 0.3s ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        input::placeholder { color: ${theme.textMuted}; }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: sidebarOpen ? 260 : 0, minHeight: '100vh', background: theme.bgSidebar, borderRight: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'width 0.3s ease' }}>
        <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
          {/* New Chat */}
          <button onClick={() => { 
             setShowSwap(false); 
             setShowLiquidity(false); 
             setShowAgentBuilder(false); 
             setMessages([]); 
             setHasInteracted(false); // Reset interaction state on New Chat
          }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.accent, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 8 }}>
            <MessageSquarePlusIcon /> New Chat
          </button>

          {/* Recent Chats */}
          <div style={{ marginBottom: 8 }}>
            <button onClick={() => setRecentChatsOpen(!recentChatsOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MessageSquareIcon /> Recent Chats</span>
              {recentChatsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
            {recentChatsOpen && isConnected && (
              <div style={{ paddingLeft: 20, marginTop: 4 }}>
                {recentChats.map((chat, i) => (
                  <RecentChatItem 
                    key={i} 
                    chat={chat} 
                    theme={theme} 
                    onDelete={() => {
                      const newChats = [...recentChats];
                      newChats.splice(i, 1);
                      setRecentChats(newChats);
                    }} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Swap */}
          <button onClick={() => { setShowSwap(true); setShowLiquidity(false); setShowAgentBuilder(false); setSwapDetails(null); setHasInteracted(true); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <ArrowLeftRightIcon /> Swap
          </button>

          {/* Liquidity */}
          <button onClick={() => { setShowLiquidity(true); setShowSwap(false); setShowAgentBuilder(false); setHasInteracted(true); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <DropletsIcon /> Liquidity
          </button>

          {/* Agent */}
          <button onClick={() => { setShowAgentBuilder(true); setShowSwap(false); setShowLiquidity(false); setHasInteracted(true); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <BotIcon /> Agent
          </button>

          {/* Portfolio */}
          <div style={{ marginBottom: 8 }}>
            <button onClick={() => setPortfolioOpen(!portfolioOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><WalletIcon /> Portfolio</span>
              {portfolioOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
            {portfolioOpen && (
              <div style={{ paddingLeft: 20, marginTop: 4 }}>
                <button 
                  onClick={() => {
                    setPortfolioType('User');
                    setShowPortfolioModal(true);
                    setHasInteracted(true);
                    setShowSwap(false);
                    setShowLiquidity(false);
                    setShowAgentBuilder(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'transparent', border: 'none', borderRadius: 6, color: theme.textSecondary, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                >
                  User Portfolio
                </button>
                <button 
                   onClick={() => {
                    setPortfolioType('Agent');
                    setShowPortfolioModal(true);
                    setHasInteracted(true);
                    setShowSwap(false);
                    setShowLiquidity(false);
                    setShowAgentBuilder(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'transparent', border: 'none', borderRadius: 6, color: theme.textSecondary, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
                >
                  Agent Portfolio
                </button>
              </div>
            )}
          </div>

          {/* Faucet */}
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <DropletIcon /> Faucet
          </button>

          {/* Links Section */}
          <div style={{ marginTop: 24 }}>
            <div style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: theme.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Links</div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textSecondary, fontSize: 14, cursor: 'pointer' }}><ExternalLinkIcon /> About</button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textSecondary, fontSize: 14, cursor: 'pointer' }}><FileTextIcon /> Docs</button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textSecondary, fontSize: 14, cursor: 'pointer' }}><XIcon size={16} color={isDark ? '#ffffff' : '#000000'} /> X</button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textSecondary, fontSize: 14, cursor: 'pointer' }}><FarcasterIcon size={16} /> Farcaster</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', background: theme.bgPrimary, borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MenuIcon />
            </button>
            <div onClick={() => setLocation('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <img src={isDark ? logoBlack : logoWhite} alt="Mantua.AI" style={{ height: 32 }} />
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em' }}>Mantua.AI</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setIsDark(!isDark)} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {isConnected ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '8px 16px', border: `1px solid ${theme.border}`, borderRadius: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{walletAddress}</span>
                <span style={{ fontSize: 12, color: theme.textMuted }}>{walletBalance}</span>
              </div>
            ) : (
              <button onClick={() => setIsConnected(true)} style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)', border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Connect wallet
              </button>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: theme.bgPrimary, overflow: 'hidden', position: 'relative' }}>
          
          {/* Portfolio Overlay */}
          {showPortfolioModal && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 150, // Higher than other modals
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
                <PortfolioInterface 
                  type={portfolioType} 
                  onClose={() => setShowPortfolioModal(false)}
                  theme={theme}
                  isDark={isDark}
                />
            </div>
          )}

          {isConnected ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              
              {/* Chat Container - Scrollable */}
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                overflowY: 'auto', 
                padding: '40px 20px 140px' // Bottom padding for fixed input
              }}>
                <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                  {!hasInteracted && !showSwap && !showLiquidity && !showAgentBuilder && (
                    <div style={{ textAlign: 'center' }}>
                      <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, marginBottom: 12, letterSpacing: '-0.02em' }}>Hi, {walletAddress}</h1>
                      <p style={{ fontSize: 16, color: theme.textSecondary }}>What can I help you with today?</p>
                    </div>
                  )}

                  {messages.map((msg, idx) => (
                    <div key={idx} style={{ 
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      background: msg.role === 'user' ? theme.accentLight : theme.bgCard,
                      padding: '12px 16px',
                      borderRadius: 12,
                      maxWidth: '80%',
                      marginBottom: 12,
                      border: `1px solid ${theme.border}`
                    }}>
                      {msg.content}
                    </div>
                  ))}

                  {/* Swap Overlay - Stacked within scrolling container but sticky if needed, or just inline */}
                  {showSwap && !showLiquidity && !showAgentBuilder && (
                    <div style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
                      <SwapInterface 
                        onClose={() => setShowSwap(false)} 
                        swapDetails={swapDetails} 
                        theme={theme} 
                        isDark={isDark} 
                      />
                    </div>
                  )}

                  {/* Liquidity Overlay */}
                  {showLiquidity && !showSwap && !showAgentBuilder && (
                    <div style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
                      <LiquidityInterface 
                        onClose={() => setShowLiquidity(false)} 
                        theme={theme} 
                        isDark={isDark} 
                      />
                    </div>
                  )}

                  {/* Agent Builder Overlay */}
                  {showAgentBuilder && !showSwap && !showLiquidity && (
                    <div style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
                      <AgentBuilderInterface 
                        onClose={() => setShowAgentBuilder(false)} 
                        theme={theme} 
                        isDark={isDark} 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Chat Input Area */}
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                padding: '20px 40px 40px', 
                background: `linear-gradient(to top, ${theme.bgPrimary} 80%, transparent)`,
                zIndex: 100,
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div style={{ width: '100%', maxWidth: 700, background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '16px 20px', boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Mantua - swap, analyze, add liquidity..."
                    style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: theme.textPrimary, marginBottom: 12 }}
                  />
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: theme.accentLight, borderRadius: 20 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
                      <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 500 }}>Base Sepolia</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', color: theme.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                        <MicIcon />
                      </button>
                      <button onClick={handleSend} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', color: theme.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                        <SendIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <div style={{ textAlign: 'center', maxWidth: 500 }}>
                <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Meet Mantua.AI,<br />your personal DeFi Assistant
                </h1>
                <p style={{ fontSize: 16, color: theme.textSecondary }}>Connect your wallet to get started</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}