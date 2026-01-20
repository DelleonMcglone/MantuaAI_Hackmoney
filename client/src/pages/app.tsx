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

// ============ ICONS ============
const MenuIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const MoonIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const SunIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MessageSquarePlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="9" y1="11" x2="15" y2="11"/></svg>;
const MessageSquareIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const ChevronDownIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;
const ChevronUpIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>;
const ArrowLeftRightIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4M7 4L3 8M7 4L11 8"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>;
const DropletsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>;
const WalletIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></svg>;
const DropletIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
const ExternalLinkIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const FileTextIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const SendIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const MicIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const SwapIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4M7 4L3 8M7 4L11 8"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>;
const ShieldIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const BoltIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const TrendIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const CodeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
const InfoIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
const SettingsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const CloseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const BotIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>;
const XIcon = ({ size = 18, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

// Farcaster icon placeholder
const FarcasterIcon = ({ size = 18 }) => (
  <div style={{ width: size, height: size, borderRadius: 4, background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ color: 'white', fontSize: size * 0.6, fontWeight: 'bold' }}>F</span>
  </div>
);

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

const TokenSelect = ({ token, balance, usdValue, side, amount }) => (
  <div style={{
    background: 'rgba(249, 250, 251, 0.8)',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid rgba(139, 92, 246, 0.1)',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>{side}</span>
      <span style={{ color: '#9ca3af', fontSize: '12px' }}>Balance: {balance}</span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <input
        type="text"
        defaultValue={amount}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#111827',
          fontSize: '28px',
          fontWeight: '600',
          width: '60%',
          outline: 'none',
          fontFamily: 'SF Mono, Monaco, monospace',
        }}
      />
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '10px',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        background: 'white',
        color: '#1f2937',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: '600',
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: token === 'ETH' 
            ? 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)'
            : 'linear-gradient(135deg, #2775CA 0%, #4A9FE8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: token === 'ETH' ? '14px' : '10px',
          fontWeight: '700',
          color: 'white',
        }}>
          {token === 'ETH' ? 'Ξ' : '$'}
        </div>
        {token}
        <ChevronDownIcon />
      </button>
    </div>
    <div style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>≈ ${usdValue}</div>
  </div>
);

const HookOption = ({ name, description, icon, benefit, recommended, selected, onClick, tag, compact }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: compact ? '12px' : '14px',
      borderRadius: '12px',
      border: selected ? '2px solid #8b5cf6' : '1px solid rgba(139, 92, 246, 0.15)',
      background: selected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(249, 250, 251, 0.8)',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
      transition: 'all 0.2s',
      position: 'relative',
    }}
  >
    {recommended && (
      <div style={{
        position: 'absolute',
        top: '-8px',
        right: '12px',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
        color: 'white',
        fontSize: '9px',
        fontWeight: '700',
        padding: '3px 8px',
        borderRadius: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        <StarIcon /> Recommended
      </div>
    )}
    <div style={{
      width: compact ? '36px' : '40px',
      height: compact ? '36px' : '40px',
      borderRadius: '10px',
      background: selected ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: selected ? '#8b5cf6' : '#6b7280',
      flexShrink: 0,
    }}>
      {icon}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ color: '#1f2937', fontWeight: '600', fontSize: compact ? '13px' : '14px', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        {name}
        {selected && <CheckIcon />}
      </div>
      <div style={{ color: '#6b7280', fontSize: compact ? '11px' : '12px', lineHeight: '1.4' }}>{description}</div>
      {benefit && !compact && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '6px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: 'rgba(16, 185, 129, 0.1)',
          color: '#10b981',
          fontSize: '11px',
          fontWeight: '600',
        }}>
          {benefit}
        </div>
      )}
    </div>
  </button>
);

// ============ SWAP INTERFACE ============
const SwapInterface = ({ onClose, swapDetails }) => {
  const [selectedHook, setSelectedHook] = useState('mev');
  const [showAllHooks, setShowAllHooks] = useState(false);

  const hooks = [
    { id: 'auto', name: 'Auto (Smart Routing)', description: 'Mantua selects the optimal hook based on trade parameters', icon: <BoltIcon />, benefit: 'Best execution guaranteed' },
    { id: 'mev', name: 'MEV Protection', description: 'Randomized execution timing protects against sandwich attacks', icon: <ShieldIcon />, benefit: 'Save ~0.3% on trades >$1k', recommended: true },
    { id: 'directional', name: 'Directional Fee', description: 'Dynamic fees based on trade direction (Nezlobin algorithm)', icon: <TrendIcon />, benefit: 'Lower fees in stable markets' },
    { id: 'jit', name: 'JIT Rebalancing', description: 'Concentrates liquidity around your trade for better execution', icon: <BoltIcon />, benefit: 'Better rates on large trades' },
    { id: 'none', name: 'No Hook', description: 'Standard Uniswap v4 swap without modifications', icon: <SwapIcon /> },
  ];

  const getSelectedHookName = () => {
    if (selectedHook === 'custom') return 'Custom Hook';
    return hooks.find(h => h.id === selectedHook)?.name || 'Select Hook';
  };

  const getSelectedHookIcon = () => {
    if (selectedHook === 'custom') return <CodeIcon />;
    return hooks.find(h => h.id === selectedHook)?.icon || <SwapIcon />;
  };

  return (
    <div style={{ padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#fafafa', minHeight: '100%' }}>
      {/* AI Response Banner */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 20px',
        padding: '16px 20px',
        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(139, 92, 246, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '16px' }}>✨</span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5' }}>
            <span style={{ color: '#8b5cf6', fontWeight: '600' }}>Swapping {swapDetails?.fromAmount || '1.5'} {swapDetails?.fromToken || 'ETH'} → {swapDetails?.toToken || 'USDC'}</span>
            {' '}• I've enabled MEV Protection for this trade since it's over $1,000. This will protect you from sandwich attacks.
          </span>
        </div>
        <MiniChart data={[3200, 3180, 3220, 3250, 3230, 3280, 3245]} color="#8b5cf6" />
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Swap Panel */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(139, 92, 246, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#111827', fontSize: '18px', fontWeight: '700', margin: 0 }}>Swap</h2>
            <button style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '4px' }}>
              <SettingsIcon />
            </button>
          </div>

          <TokenSelect token={swapDetails?.fromToken || "ETH"} balance="3.245" usdValue="4,868.25" side="Sell" amount={swapDetails?.fromAmount || "1.5"} />
          
          <div style={{ display: 'flex', justifyContent: 'center', margin: '-8px 0', position: 'relative', zIndex: 2 }}>
            <button style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: '2px solid rgba(139, 92, 246, 0.2)',
              background: 'white',
              color: '#8b5cf6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            }}>
              <SwapIcon />
            </button>
          </div>

          <TokenSelect token={swapDetails?.toToken || "USDC"} balance="12,450.00" usdValue="4,868.25" side="Buy" amount="4,868.25" />

          {/* Hook Selection */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#374151', fontSize: '14px', fontWeight: '600' }}>Swap Hook</span>
                <div style={{ color: '#9ca3af', cursor: 'help' }}><InfoIcon /></div>
              </div>
              <button onClick={() => setShowAllHooks(!showAllHooks)} style={{ background: 'transparent', border: 'none', color: '#8b5cf6', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                {showAllHooks ? 'Collapse' : 'Show All'}
              </button>
            </div>

            {!showAllHooks ? (
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid rgba(139, 92, 246, 0.2)',
                background: 'rgba(139, 92, 246, 0.04)',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b5cf6',
                  }}>
                    {getSelectedHookIcon()}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: '#1f2937', fontWeight: '600', fontSize: '14px' }}>{getSelectedHookName()}</div>
                    <div style={{ color: '#10b981', fontSize: '12px', fontWeight: '500' }}>+$14.60 estimated savings</div>
                  </div>
                </div>
                <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px' }}>Change</span>
                  <ChevronDownIcon />
                </div>
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {hooks.slice(0, 3).map(hook => (
                  <HookOption key={hook.id} {...hook} selected={selectedHook === hook.id} onClick={() => setSelectedHook(hook.id)} compact />
                ))}
              </div>
            )}
          </div>

          {/* Swap Details */}
          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(249, 250, 251, 0.8)', borderRadius: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Rate</span>
              <span style={{ color: '#374151' }}>1 ETH = 3,245.50 USDC</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280' }}>Network Fee</span>
              <span style={{ color: '#374151' }}>~$2.45</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(139, 92, 246, 0.1)', marginTop: '8px', paddingTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Price Impact</span>
                <span style={{ color: '#10b981' }}>&lt;0.01%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Hook Benefit</span>
                <span style={{ color: '#10b981', fontWeight: '600' }}>+$14.60 saved</span>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <button style={{
            width: '100%',
            padding: '16px',
            marginTop: '16px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
          }}>
            Swap {swapDetails?.fromToken || 'ETH'} → {swapDetails?.toToken || 'USDC'} with {getSelectedHookName()}
          </button>
        </div>

        {/* Chart Panel */}
        <div>
          <div style={{
            background: 'linear-gradient(145deg, rgba(250, 250, 252, 0.9) 0%, rgba(243, 244, 246, 0.8) 100%)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(139, 92, 246, 0.15)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', color: 'white', marginRight: '-8px', zIndex: 2, border: '2px solid #fff' }}>Ξ</div>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #2775CA 0%, #4A9FE8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: 'white', border: '2px solid #fff' }}>$</div>
                  </div>
                  <span style={{ color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>ETH / USDC</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ color: '#111827', fontSize: '28px', fontWeight: '700', fontFamily: 'SF Mono, Monaco, monospace' }}>$3,245.50</span>
                  <span style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>↑ 2.34%</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['1H', '4H', '1D', '1W'].map((tf, i) => (
                  <button key={tf} style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', background: i === 2 ? 'rgba(139, 92, 246, 0.15)' : 'transparent', color: i === 2 ? '#8b5cf6' : '#6b7280', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>{tf}</button>
                ))}
              </div>
            </div>
            
            <div style={{ height: '180px', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              Price Chart Placeholder
            </div>
          </div>
          
          {/* Info Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
              <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>24h Volume</div>
              <div style={{ color: '#111827', fontSize: '18px', fontWeight: '700' }}>$2.4B</div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
              <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Pool TVL</div>
              <div style={{ color: '#111827', fontSize: '18px', fontWeight: '700' }}>$847M</div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid rgba(139, 92, 246, 0.1)' }}>
              <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>Current Fee</div>
              <div style={{ color: '#111827', fontSize: '18px', fontWeight: '700' }}>0.05%</div>
            </div>
          </div>
        </div>
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
  const [swapDetails, setSwapDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const walletAddress = '0xbaac...DC87';
  const walletBalance = '0.0021 ETH';
  
  const recentChats = ['swap', 'swap', 'pools', 'Swap ETH for USDC wi...', 'Swap ETH for USDC wi...', 'What is the price of ETh?', 'Analyze'];

  const theme = isDark ? themes.dark : themes.light;

  // Parse swap command from user input
  const parseSwapCommand = (input) => {
    const swapRegex = /swap\s+(\d*\.?\d+)?\s*(\w+)?\s*(?:for|to|->|→)?\s*(\w+)?/i;
    const match = input.match(swapRegex);
    
    if (match || input.toLowerCase().includes('swap')) {
      return {
        fromAmount: match?.[1] || '1.0',
        fromToken: match?.[2]?.toUpperCase() || 'ETH',
        toToken: match?.[3]?.toUpperCase() || 'USDC',
      };
    }
    return null;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const swapCmd = parseSwapCommand(inputValue);
    if (swapCmd) {
      setSwapDetails(swapCmd);
      setShowSwap(true);
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
          <button onClick={() => { setShowSwap(false); setMessages([]); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.accent, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 8 }}>
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
                  <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'transparent', border: 'none', borderRadius: 6, color: theme.textSecondary, fontSize: 13, cursor: 'pointer', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <MessageSquareIcon /> {chat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap */}
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <ArrowLeftRightIcon /> Swap
          </button>

          {/* Liquidity */}
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
            <DropletsIcon /> Liquidity
          </button>

          {/* Agent */}
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: 8, color: theme.textPrimary, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
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
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'transparent', border: 'none', borderRadius: 6, color: theme.textSecondary, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>User Portfolio</button>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'transparent', border: 'none', borderRadius: 6, color: theme.textSecondary, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>Agent Portfolio</button>
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
              <img src={isDark ? logoWhite : logoBlack} alt="Mantua.AI" style={{ height: 32 }} />
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
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: theme.bgPrimary, overflow: 'auto' }}>
          {showSwap ? (
            <SwapInterface onClose={() => setShowSwap(false)} swapDetails={swapDetails} />
          ) : isConnected ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                <div style={{ textAlign: 'center' }}>
                  <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, marginBottom: 12, letterSpacing: '-0.02em' }}>Hi, {walletAddress}</h1>
                  <p style={{ fontSize: 16, color: theme.textSecondary }}>What can I help you with today?</p>
                </div>

                {/* Chat Input */}
                <div style={{ width: '100%', background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '16px 20px', boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)' }}>
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