import { format, subDays, subHours } from 'date-fns';

// Helper to generate dates
const generateDates = (count: number, interval: 'days' | 'hours' = 'days') => {
  const dates: string[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const date = interval === 'days' ? subDays(now, i) : subHours(now, i);
    dates.push(format(date, interval === 'days' ? 'MMM dd' : 'HH:mm'));
  }
  return dates;
};

// Mock Data Generators
export const getPriceData = (asset: string = 'ETH', timeRange: string = '7d') => {
  const count = timeRange === '24h' ? 24 : timeRange === '30d' ? 30 : 7;
  const interval = timeRange === '24h' ? 'hours' : 'days';
  const labels = generateDates(count, interval);
  
  let basePrice = asset === 'BTC' ? 95000 : asset === 'ETH' ? 3200 : 1;
  const volatility = asset === 'BTC' || asset === 'ETH' ? 0.05 : 0.001;

  return labels.map(label => {
    const change = basePrice * (Math.random() * volatility - (volatility / 2));
    basePrice += change;
    return {
      name: label,
      value: parseFloat(basePrice.toFixed(2))
    };
  });
};

export const getVolumeData = (asset: string = 'ETH', timeRange: string = '7d') => {
  const count = timeRange === '24h' ? 24 : timeRange === '30d' ? 30 : 7;
  const interval = timeRange === '24h' ? 'hours' : 'days';
  const labels = generateDates(count, interval);
  
  return labels.map(label => ({
    name: label,
    value: Math.floor(Math.random() * 5000000) + 1000000
  }));
};

export const getComparisonData = (assets: string[] = ['Nezlobin', 'JIT']) => {
  const labels = generateDates(7, 'days');
  return labels.map(label => {
    const data: any = { name: label };
    assets.forEach(asset => {
      data[asset] = Math.floor(Math.random() * 1000) + 500;
    });
    return data;
  });
};

export const getPortfolioData = () => {
  return [
    { name: 'ETH', value: 45 },
    { name: 'mUSDC', value: 30 },
    { name: 'mBTC', value: 15 },
    { name: 'LINK', value: 10 },
  ];
};

export const getPerformanceData = (timeRange: string = '7d') => {
    const count = timeRange === '24h' ? 24 : timeRange === '30d' ? 30 : 7;
    const interval = timeRange === '24h' ? 'hours' : 'days';
    const labels = generateDates(count, interval);
    
    let value = 10000;
    return labels.map(label => {
      value = value * (1 + (Math.random() * 0.04 - 0.015)); // Slight upward trend
      return {
        name: label,
        value: parseFloat(value.toFixed(2))
      };
    });
};

export const getTVLData = (pool: string = 'ETH/mUSDC') => {
  const labels = generateDates(30, 'days');
  let tvl = 5000000;
  return labels.map(label => {
    tvl = tvl * (1 + (Math.random() * 0.02 - 0.005));
    return {
      name: label,
      value: Math.floor(tvl)
    };
  });
};
