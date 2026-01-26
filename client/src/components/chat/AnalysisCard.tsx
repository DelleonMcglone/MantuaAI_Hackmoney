import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import { TrendingUp, BarChart2, PieChart as PieIcon, Activity, Calendar, Info } from 'lucide-react';

interface AnalysisCardProps {
  title: string;           // "Price Analysis: ETH/USD"
  icon?: any;            // "📊" or icon component
  timeRange: string;       // "Jan 19 - Jan 26, 2026"
  chartType: 'area' | 'bar' | 'pie' | 'line';
  chartData: Array<{ [key: string]: string | number }>;
  summary: string;
  insights: Array<{ icon: string; label: string; value: string }>;
  source: string;          // "Testnet Simulated Data"
  theme: any;
  isDark: boolean;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({
  title,
  icon,
  timeRange,
  chartType,
  chartData,
  summary,
  insights,
  source,
  theme,
  isDark
}) => {
  // Theme Configurations
  const darkTheme = {
    cardBg: '#1e1e32',
    cardBorder: '#2a2a45',
    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1', // slate-300
    textMuted: '#64748b',     // slate-500
    insightBg: 'rgba(71, 85, 105, 0.5)', // slate-700/50
    badgeBg: 'linear-gradient(135deg, #8b5cf6, #6366f1)',  // purple gradient
    badgeText: '#c4b5fd',     // purple-300
  };

  const lightTheme = {
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',    // slate-200
    textPrimary: '#0f172a',   // slate-900
    textSecondary: '#475569', // slate-600
    textMuted: '#64748b',     // slate-500
    insightBg: '#f1f5f9',     // slate-100
    badgeBg: 'linear-gradient(135deg, #8b5cf6, #6366f1)',       // purple gradient
    badgeText: '#7c3aed',     // purple-600
  };

  const currentTheme = isDark ? darkTheme : lightTheme;
  const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  const renderChart = () => {
    switch (chartType) {
      case 'area':
      case 'line': // Mapping line to area for cleaner look as per prompt
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} strokeOpacity={0.5} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: currentTheme.textMuted, fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: currentTheme.textMuted, fontSize: 12 }}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
                domain={['auto', 'auto']}
                dx={-10}
              />
              <Tooltip 
                 contentStyle={{ 
                  backgroundColor: currentTheme.cardBg, 
                  borderColor: currentTheme.cardBorder, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: currentTheme.textPrimary
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fill="url(#priceGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        const keys = Object.keys(chartData[0] || {}).filter(k => k !== 'name' && k !== 'value');
        // Simple bar or grouped bar check
        const isGrouped = keys.length > 0;
        
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout={isGrouped ? "vertical" : "horizontal"}> {/* Prompt mentioned horizontal for volume comparison, let's keep it flexible or default horizontal */}
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} strokeOpacity={0.5} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: currentTheme.textMuted, fontSize: 12 }}
                type="category"
                dy={10}
              />
              <YAxis 
                 hide={!isGrouped}
                 axisLine={false} 
                 tickLine={false}
                 type="number"
              />
              <Tooltip 
                 cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                 contentStyle={{ 
                  backgroundColor: currentTheme.cardBg, 
                  borderColor: currentTheme.cardBorder, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: currentTheme.textPrimary
                }}
              />
              {isGrouped ? (
                 keys.map((key, index) => (
                    <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[4, 4, 0, 0]} />
                 ))
              ) : (
                 <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ 
                  backgroundColor: currentTheme.cardBg, 
                  borderColor: currentTheme.cardBorder, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: currentTheme.textPrimary
                }}
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={10} wrapperStyle={{ fontSize: '12px', color: currentTheme.textSecondary }} />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '600px', // Wider card as per prompt "Full width within chat container" but constrained for readability
      background: currentTheme.cardBg,
      border: `1px solid ${currentTheme.cardBorder}`,
      borderRadius: '16px',
      overflow: 'hidden',
      marginTop: '12px',
      marginBottom: '12px',
      fontFamily: '"DM Sans", sans-serif',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      {/* 1. HEADER SECTION */}
      <div style={{ 
        height: '68px',
        padding: '0 24px', 
        borderBottom: `1px solid ${currentTheme.cardBorder}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '40px',
            height: '40px',
            borderRadius: '8px', 
            background: currentTheme.badgeBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)'
          }}>
            {icon || <TrendingUp size={20} />}
          </div>
          <div style={{ 
            color: currentTheme.textPrimary, 
            fontWeight: '600', 
            fontSize: '18px',
            letterSpacing: '-0.01em'
          }}>
            {title}
          </div>
        </div>
        
        <div style={{ 
          padding: '6px 12px',
          borderRadius: '20px',
          background: isDark ? 'rgba(139, 92, 246, 0.15)' : '#f3e8ff',
          color: isDark ? '#c4b5fd' : '#7c3aed',
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
           <Calendar size={14} />
           {timeRange}
        </div>
      </div>

      {/* 2. CHART SECTION */}
      <div style={{ height: '260px', padding: '24px 24px 10px 10px', width: '100%' }}>
        {renderChart()}
      </div>

      {/* 3. SUMMARY SECTION */}
      <div style={{ 
        padding: '20px 24px',
        borderTop: `1px solid ${currentTheme.cardBorder}`,
      }}>
        <div style={{ 
          fontSize: '15px', 
          color: currentTheme.textSecondary, 
          lineHeight: '1.6',
        }}>
          {summary}
        </div>
      </div>

      {/* 4. INSIGHTS GRID */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        padding: '0 24px 20px 24px'
      }}>
        {insights.map((insight, i) => (
          <div key={i} style={{ 
            background: currentTheme.insightBg,
            padding: '14px 16px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px', 
          }}>
            <span style={{ fontSize: '18px' }}>{insight.icon}</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span style={{ 
                 fontSize: '12px', 
                 color: currentTheme.textMuted,
                 fontWeight: '600',
                 textTransform: 'uppercase',
                 letterSpacing: '0.5px'
               }}>{insight.label}</span>
               <span style={{ 
                 fontSize: '15px', 
                 color: currentTheme.textPrimary,
                 fontWeight: '600',
                 fontFamily: 'SF Mono, Monaco, monospace'
               }}>{insight.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. FOOTER SECTION */}
      <div style={{ 
        padding: '16px 24px', 
        borderTop: `1px solid ${currentTheme.cardBorder}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
      }}>
        <div style={{ fontSize: '12px', color: currentTheme.textMuted, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Info size={12} /> {source}
        </div>
        <div style={{ fontSize: '12px', color: currentTheme.textMuted }}>
          Updated just now
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;
