import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import { TrendingUp, BarChart2, PieChart as PieIcon, Activity, Calendar, Info } from 'lucide-react';

interface AnalysisCardProps {
  type: 'price' | 'volume' | 'comparison' | 'portfolio' | 'performance' | 'tvl';
  title: string;
  subtitle?: string;
  data: any[];
  summary: string;
  insights: string[];
  theme: any;
  isDark: boolean;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({
  type,
  title,
  subtitle,
  data,
  summary,
  insights,
  theme,
  isDark
}) => {
  const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];
  
  const renderChart = () => {
    switch (type) {
      case 'price':
      case 'tvl':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: theme.textSecondary }} 
                axisLine={false}
                tickLine={false}
                minTickGap={20}
              />
              <YAxis 
                hide={true} 
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.bgCard, 
                  borderColor: theme.border, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme.textPrimary
                }}
                itemStyle={{ color: theme.textPrimary }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, type === 'tvl' ? 'TVL' : 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 4, fill: '#8b5cf6' }} 
              />
              {type === 'tvl' && (
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
              )}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'volume':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: theme.textSecondary }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                contentStyle={{ 
                  backgroundColor: theme.bgCard, 
                  borderColor: theme.border, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme.textPrimary
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Volume']}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'comparison':
        const keys = Object.keys(data[0]).filter(k => k !== 'name');
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: theme.textSecondary }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                contentStyle={{ 
                  backgroundColor: theme.bgCard, 
                  borderColor: theme.border, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme.textPrimary
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}/>
              {keys.map((key, index) => (
                <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'portfolio':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.bgCard, 
                  borderColor: theme.border, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme.textPrimary
                }}
                formatter={(value: number) => [`${value}%`, 'Allocation']}
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: theme.textSecondary }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.bgCard, 
                  borderColor: theme.border, 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: theme.textPrimary
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'price': return <TrendingUp size={16} color="#8b5cf6" />;
      case 'volume': return <BarChart2 size={16} color="#3b82f6" />;
      case 'portfolio': return <PieIcon size={16} color="#f59e0b" />;
      case 'performance': return <Activity size={16} color="#10b981" />;
      default: return <Activity size={16} color={theme.textSecondary} />;
    }
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '450px',
      background: theme.bgCard, // Using card background
      border: `1px solid ${theme.border}`,
      borderRadius: '16px',
      overflow: 'hidden',
      marginTop: '8px',
      marginBottom: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            padding: '8px', 
            borderRadius: '8px', 
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {getIcon()}
          </div>
          <div>
            <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '15px' }}>{title}</div>
            <div style={{ color: theme.textSecondary, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={10} />
              {subtitle || 'Last 7 Days'}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '220px', padding: '20px 20px 0 0', width: '100%' }}>
        {renderChart()}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <div style={{ 
          fontSize: '14px', 
          color: theme.textSecondary, 
          lineHeight: '1.6', 
          marginBottom: '16px',
          paddingBottom: '16px',
          borderBottom: `1px dashed ${theme.border}`
        }}>
          {summary}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {insights.map((insight, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: theme.textPrimary }}>
              <span style={{ fontSize: '14px' }}>
                {insight.includes('Highest') || insight.includes('up') || insight.includes('increase') ? '📈' : 
                 insight.includes('Lowest') || insight.includes('down') || insight.includes('decrease') ? '📉' : 
                 insight.includes('Avg') ? '📊' : '💡'}
              </span>
              {insight}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        padding: '10px 20px', 
        background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '11px', color: theme.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Info size={10} /> Data: Testnet Simulated
        </div>
        <div style={{ fontSize: '11px', color: theme.textMuted }}>
          Updated just now
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;
