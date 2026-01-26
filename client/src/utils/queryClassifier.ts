export type QueryType = 'price' | 'volume' | 'comparison' | 'portfolio' | 'performance' | 'tvl' | 'action' | 'general';

export interface ClassifiedQuery {
  type: QueryType;
  assets: string[];
  timeRange: string;
  chartType: 'line' | 'bar' | 'pie' | 'area';
  hook?: string;
}

export const classifyQuery = (input: string): ClassifiedQuery => {
  const lowerInput = input.toLowerCase();
  
  // Default classification
  const result: ClassifiedQuery = {
    type: 'general',
    assets: [],
    timeRange: '7d', // Default to 7 days
    chartType: 'line'
  };

  // Detect Assets
  const assetsMap: Record<string, string> = {
    'eth': 'ETH', 'ethereum': 'ETH',
    'btc': 'BTC', 'bitcoin': 'BTC',
    'usdc': 'mUSDC', 'musdc': 'mUSDC',
    'usdt': 'mUSDT', 'musdt': 'mUSDT',
    'dai': 'mDAI', 'mdai': 'mDAI',
    'link': 'LINK',
    'uni': 'UNI',
    'wbtc': 'WBTC',
    'weth': 'WETH'
  };

  for (const [key, value] of Object.entries(assetsMap)) {
    if (lowerInput.includes(key)) {
      if (!result.assets.includes(value)) {
        result.assets.push(value);
      }
    }
  }

  // Detect Time Range
  if (lowerInput.includes('yesterday') || lowerInput.includes('24h') || lowerInput.includes('24 hours') || lowerInput.includes('today')) {
    result.timeRange = '24h';
  } else if (lowerInput.includes('week') || lowerInput.includes('7d') || lowerInput.includes('7 days')) {
    result.timeRange = '7d';
  } else if (lowerInput.includes('month') || lowerInput.includes('30d') || lowerInput.includes('30 days')) {
    result.timeRange = '30d';
  } else if (lowerInput.includes('year') || lowerInput.includes('1y')) {
    result.timeRange = '1y';
  }

  // Detect Query Type
  if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('worth') || lowerInput.includes('trading at')) {
    result.type = 'price';
    result.chartType = 'line';
  } else if (lowerInput.includes('volume') || lowerInput.includes('traded') || lowerInput.includes('transactions') || lowerInput.includes('activity')) {
    result.type = 'volume';
    result.chartType = 'bar';
  } else if (lowerInput.includes('compare') || lowerInput.includes('vs') || lowerInput.includes('versus') || lowerInput.includes('difference') || lowerInput.includes('better')) {
    result.type = 'comparison';
    result.chartType = 'bar'; // Grouped bar usually
  } else if (lowerInput.includes('portfolio') || lowerInput.includes('holdings') || lowerInput.includes('breakdown') || lowerInput.includes('allocation')) {
    result.type = 'portfolio';
    result.chartType = 'pie';
  } else if (lowerInput.includes('performance') || lowerInput.includes('profit') || lowerInput.includes('loss') || lowerInput.includes('pnl') || lowerInput.includes('return')) {
    result.type = 'performance';
    result.chartType = 'area';
  } else if (lowerInput.includes('tvl') || lowerInput.includes('liquidity') || lowerInput.includes('locked')) {
    result.type = 'tvl';
    result.chartType = 'area';
  } else if (lowerInput.includes('swap') || lowerInput.includes('buy') || lowerInput.includes('sell') || lowerInput.includes('add liquidity') || lowerInput.includes('create pool')) {
    result.type = 'action';
  }

  // Detect Hooks
  if (lowerInput.includes('nezlobin')) result.hook = 'Nezlobin';
  else if (lowerInput.includes('jit') || lowerInput.includes('just-in-time')) result.hook = 'JIT Rebalancing';
  else if (lowerInput.includes('mev') || lowerInput.includes('protection')) result.hook = 'MEV Protection';
  else if (lowerInput.includes('directional')) result.hook = 'Directional Fee';

  return result;
};
