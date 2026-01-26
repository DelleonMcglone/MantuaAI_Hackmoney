import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface PoolActivityChartProps {
  theme: any;
  isDark: boolean;
}

const PoolActivityChart: React.FC<PoolActivityChartProps> = ({ theme, isDark }) => {
  const data = [
    { name: 'Dec 12', volume: 120000, fee: 0.02 },
    { name: 'Dec 14', volume: 150000, fee: 0.022 },
    { name: 'Dec 16', volume: 180000, fee: 0.025 },
    { name: 'Dec 18', volume: 140000, fee: 0.021 },
    { name: 'Dec 20', volume: 200000, fee: 0.028 },
    { name: 'Dec 22', volume: 170000, fee: 0.026 },
    { name: 'Dec 24', volume: 220000, fee: 0.03 },
    { name: 'Dec 26', volume: 190000, fee: 0.027 },
    { name: 'Dec 28', volume: 210000, fee: 0.029 },
    { name: 'Jan 1', volume: 250000, fee: 0.032 },
    { name: 'Jan 3', volume: 230000, fee: 0.031 },
    { name: 'Jan 5', volume: 270000, fee: 0.035 },
    { name: 'Jan 7', volume: 240000, fee: 0.033 },
    { name: 'Jan 14', volume: 315000, fee: 0.04 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} strokeOpacity={0.5} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: theme.textSecondary, fontSize: 10 }}
            interval={2}
          />
          <YAxis 
            yAxisId="left"
            orientation="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: theme.textSecondary, fontSize: 10 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: theme.textSecondary, fontSize: 10 }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 0.05]}
          />
          <Tooltip 
             contentStyle={{
              backgroundColor: theme.bgCard,
              borderColor: theme.border,
              borderRadius: '8px',
              fontSize: '12px',
              color: theme.textPrimary
            }}
          />
          <Bar yAxisId="left" dataKey="volume" fill="#f97316" radius={[4, 4, 0, 0]} barSize={12} />
          <Line yAxisId="right" type="monotone" dataKey="fee" stroke={isDark ? '#9ca3af' : '#64748b'} strokeDasharray="3 3" dot={false} strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PoolActivityChart;
