import React, { useState, useEffect } from 'react';
import { 
  CloseIcon, SettingsIcon, ShieldIcon, TrendIcon, BoltIcon, 
  SwapIcon, InfoIcon, PlusIcon, ChevronDownIcon 
} from '../icons';
import PoolActivityChart from './PoolActivityChart';
import HookSelector from './HookSelector';

interface AddLiquidityModalProps {
  onClose: () => void;
  theme: any;
  isDark: boolean;
}

const AddLiquidityModal: React.FC<AddLiquidityModalProps> = ({ onClose, theme, isDark }) => {
  const [selectedHook, setSelectedHook] = useState('jit');
  const [isHookModalOpen, setIsHookModalOpen] = useState(false);
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');
  const [range, setRange] = useState('Full Range');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hooks = [
    { id: 'mev', name: 'MEV Protection', description: 'Randomized execution timing protects against sandwich attacks', icon: <ShieldIcon />, benefit: 'Save ~0.3% on trades >$1k', recommended: true },
    { id: 'directional', name: 'Directional Fee', description: 'Dynamic fees based on trade direction (Nezlobin algorithm)', icon: <TrendIcon />, benefit: 'Reduce IL by ~15% on trending markets' },
    { id: 'jit', name: 'JIT Rebalancing', description: 'Concentrates liquidity around your trade for better execution', icon: <BoltIcon />, benefit: 'Optimize fee capture on volatile pairs' },
    { id: 'none', name: 'No Hook', description: 'Standard Uniswap v4 swap without modifications', icon: <SwapIcon />, benefit: 'Standard execution' },
  ];

  const getSelectedHookObj = () => {
    return hooks.find(h => h.id === selectedHook) || hooks[2]; // Default to JIT
  };

  const selectedHookObj = getSelectedHookObj();
  
  // Dynamic styles based on hook color
  const getHookColor = (id: string) => {
    switch(id) {
      case 'mev': return '#8b5cf6'; // purple
      case 'directional': return '#f59e0b'; // orange
      case 'jit': return '#10b981'; // green
      default: return theme.textSecondary;
    }
  };

  const hookColor = getHookColor(selectedHook);

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      fontFamily: '"DM Sans", sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
       {/* Hook Selector Modal */}
       <HookSelector 
        isOpen={isHookModalOpen} 
        onClose={() => setIsHookModalOpen(false)} 
        hooks={hooks} 
        selectedHook={selectedHook} 
        onSelect={setSelectedHook} 
        theme={theme}
        isDark={isDark}
      />

      {/* Main Flex Container */}
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: '20px',
        width: '100%',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* LEFT PANEL: Pool Info & Chart */}
        <div style={{ 
          flex: '1.5',
          minWidth: isMobile ? '100%' : '500px',
          background: theme.bgCard,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
        }}>
           {/* Header Row */}
           <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                 <button onClick={onClose} style={{ 
                   background: theme.bgSecondary, 
                   border: 'none', 
                   borderRadius: '50%', 
                   width: '32px', 
                   height: '32px', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   cursor: 'pointer',
                   color: theme.textSecondary
                 }}>
                   ←
                 </button>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: 'white', marginRight: '-12px', zIndex: 2, border: `3px solid ${theme.bgCard}` }}>Ξ</div>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #F7931A 0%, #FFAB4A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: 'white', border: `3px solid ${theme.bgCard}` }}>₿</div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: theme.textPrimary, fontWeight: '700', fontSize: '20px' }}>ETH / mBTC</span>
                        <span style={{ 
                          background: `${hookColor}20`, 
                          color: hookColor, 
                          fontSize: '11px', 
                          fontWeight: '700', 
                          padding: '2px 8px', 
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {selectedHookObj.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                         <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '600' }}>↗ 0.029% Fee</span>
                         <span style={{ color: theme.textSecondary, fontSize: '13px' }}>TVL <span style={{ color: theme.textPrimary, fontWeight: '600' }}>$315,790</span></span>
                         <span style={{ color: theme.textSecondary, fontSize: '13px' }}>APY <span style={{ color: '#10b981', fontWeight: '600' }}>1.45%</span></span>
                      </div>
                    </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Chart Section */}
           <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
             <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
               {['Dynamic Fee', 'Volume', 'TVL'].map((tab, i) => (
                 <button key={tab} style={{
                   padding: '6px 12px',
                   borderRadius: '8px',
                   background: i === 1 ? theme.bgSecondary : 'transparent',
                   color: i === 1 ? theme.textPrimary : theme.textSecondary,
                   border: 'none',
                   fontSize: '13px',
                   fontWeight: '600',
                   cursor: 'pointer'
                 }}>
                   {tab}
                 </button>
               ))}
             </div>
             
             <div style={{ flex: 1, minHeight: '250px' }}>
                <PoolActivityChart theme={theme} isDark={isDark} />
             </div>
           </div>
        </div>

        {/* RIGHT PANEL: Add Form */}
        <div style={{
          width: isMobile ? '100%' : '420px',
          flexShrink: 0,
          background: theme.bgCard,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: theme.textPrimary, fontSize: '16px', fontWeight: '700', margin: 0, letterSpacing: '0.05em' }}>ADD LIQUIDITY</h2>
            <button style={{ background: 'transparent', border: 'none', color: theme.textMuted, cursor: 'pointer' }}>
              <SettingsIcon />
            </button>
          </div>

          {/* Liquidity Hook Selector */}
          <div>
            <label style={{ display: 'block', color: theme.textSecondary, fontSize: '11px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.05em' }}>LIQUIDITY HOOK</label>
            <button 
              onClick={() => setIsHookModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: `1px solid ${theme.border}`,
                background: theme.bgSecondary,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                   width: '36px', height: '36px', borderRadius: '8px',
                   background: `${hookColor}20`,
                   color: hookColor,
                   display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {selectedHookObj.icon}
                </div>
                <div>
                  <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '14px' }}>{selectedHookObj.name}</div>
                  <div style={{ color: hookColor, fontSize: '12px' }}>{selectedHookObj.benefit.split(' ').slice(0, 3).join(' ')}...</div>
                </div>
              </div>
              <span style={{ color: '#8b5cf6', fontSize: '13px', fontWeight: '600' }}>Change</span>
            </button>
          </div>

          {/* Range Selector */}
          <div>
             <label style={{ display: 'block', color: theme.textSecondary, fontSize: '11px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.05em' }}>RANGE</label>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
               {['Full Range', 'Wide', 'Narrow', 'Custom'].map(r => (
                 <button key={r} onClick={() => setRange(r)} style={{
                   padding: '8px 0',
                   borderRadius: '8px',
                   background: range === r ? (isDark ? '#fff' : '#1f2937') : theme.bgSecondary,
                   color: range === r ? (isDark ? '#000' : '#fff') : theme.textSecondary,
                   border: 'none',
                   fontSize: '12px',
                   fontWeight: '600',
                   cursor: 'pointer',
                   textAlign: 'center'
                 }}>
                   {r === 'Custom' ? '⟲ Custom' : r}
                 </button>
               ))}
             </div>
          </div>

          {/* Single Token Mode */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: theme.bgSecondary, borderRadius: '12px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
               <span style={{ color: theme.textPrimary, fontSize: '13px', fontWeight: '600' }}>Single Token Mode</span>
               <InfoIcon />
             </div>
             <div style={{ width: '40px', height: '20px', background: theme.border, borderRadius: '10px', position: 'relative' }}>
               <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
             </div>
          </div>

          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
             {/* Token 0 */}
             <div style={{ background: theme.bgSecondary, padding: '16px', borderRadius: '16px 16px 4px 4px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                 <span style={{ color: theme.textSecondary, fontSize: '12px', fontWeight: '600' }}>Amount</span>
                 <span style={{ color: theme.textSecondary, fontSize: '12px' }}>Bal: 1.45 ETH</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: theme.bgCard, padding: '6px 10px', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #627EEA 0%, #8B9FFF 100%)' }}></div>
                    <span style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '14px' }}>ETH</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <input 
                      type="text" 
                      value={amount0}
                      onChange={(e) => setAmount0(e.target.value)}
                      placeholder="0.0"
                      style={{ background: 'transparent', border: 'none', textAlign: 'right', color: theme.textPrimary, fontSize: '20px', fontWeight: '600', width: '100%', outline: 'none' }}
                    />
                    <div style={{ color: theme.textSecondary, fontSize: '12px' }}>$0.00</div>
                  </div>
               </div>
             </div>
             
             {/* Plus Divider */}
             <div style={{ display: 'flex', justifyContent: 'center', margin: '-12px 0', zIndex: 5 }}>
               <div style={{ background: theme.bgCard, borderRadius: '50%', padding: '4px', border: `4px solid ${theme.bgCard}` }}>
                 <div style={{ background: theme.bgSecondary, borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textSecondary }}>
                   <PlusIcon />
                 </div>
               </div>
             </div>

             {/* Token 1 */}
             <div style={{ background: theme.bgSecondary, padding: '16px', borderRadius: '4px 4px 16px 16px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                 <span style={{ color: theme.textSecondary, fontSize: '12px', fontWeight: '600' }}>Amount</span>
                 <span style={{ color: theme.textSecondary, fontSize: '12px' }}>Bal: 0.05 mBTC</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: theme.bgCard, padding: '6px 10px', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #F7931A 0%, #FFAB4A 100%)' }}></div>
                    <span style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '14px' }}>mBTC</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <input 
                      type="text" 
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                      placeholder="0.0"
                      style={{ background: 'transparent', border: 'none', textAlign: 'right', color: theme.textPrimary, fontSize: '20px', fontWeight: '600', width: '100%', outline: 'none' }}
                    />
                    <div style={{ color: theme.textSecondary, fontSize: '12px' }}>$0.00</div>
                  </div>
               </div>
             </div>
          </div>

          {/* Hook Benefits */}
          <div style={{ 
            background: `${hookColor}15`, 
            border: `1px solid ${hookColor}40`, 
            borderRadius: '12px', 
            padding: '12px'
          }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
               <span style={{ color: theme.textSecondary, fontSize: '13px' }}>Hook Benefit</span>
               <span style={{ color: hookColor, fontSize: '13px', fontWeight: '700' }}>{selectedHook === 'jit' ? '+12.4% fee capture' : selectedHook === 'mev' ? 'MEV Protected' : 'Optimized'}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span style={{ color: theme.textSecondary, fontSize: '13px' }}>Est. APY Boost</span>
               <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '700' }}>+0.23%</span>
             </div>
          </div>

          {/* Submit Button */}
          <button style={{
            background: `linear-gradient(135deg, ${hookColor} 0%, #8b5cf6 100%)`,
            border: 'none',
            borderRadius: '16px',
            padding: '16px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: `0 8px 20px ${hookColor}40`,
            marginTop: 'auto'
          }}>
            Add Liquidity with {selectedHookObj.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLiquidityModal;
