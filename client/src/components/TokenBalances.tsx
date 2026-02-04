import { useAccount, useBalance, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { erc20Abi } from "viem";
import {
  NATIVE_ETH,
  STABLECOINS,
  RWA_TOKENS,
  LST_TOKENS,
  WRAPPED_TOKENS,
  type Token,
} from "../config/tokens";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface TokenCategory {
  name: string;
  tokens: Token[];
}

const TOKEN_CATEGORIES: TokenCategory[] = [
  { name: "Stablecoins", tokens: STABLECOINS },
  { name: "Real World Assets", tokens: RWA_TOKENS },
  { name: "Liquid Staking", tokens: LST_TOKENS },
  { name: "Wrapped Assets", tokens: WRAPPED_TOKENS },
];

// Flatten all tokens for batch read
const ALL_MOCK_TOKENS = [
  ...STABLECOINS,
  ...RWA_TOKENS,
  ...LST_TOKENS,
  ...WRAPPED_TOKENS,
];

export function TokenBalances() {
  const { address, isConnected } = useAccount();

  // Get native ETH balance
  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address,
    query: {
      enabled: !!address && isConnected,
    },
  });

  // Get all ERC20 token balances
  const { data: tokenBalances, isLoading: tokensLoading } = useReadContracts({
    contracts: ALL_MOCK_TOKENS.map((token) => ({
      address: token.address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: address ? [address] : undefined,
    })),
    query: {
      enabled: !!address && isConnected,
    },
  });

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>💰 Token Balances</CardTitle>
          <CardDescription>Your wallet balances</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Connect wallet to view balances
          </p>
        </CardContent>
      </Card>
    );
  }

  const isLoading = ethLoading || tokensLoading;

  const getTokenBalance = (token: Token): string => {
    const tokenIndex = ALL_MOCK_TOKENS.findIndex(
      (t) => t.address.toLowerCase() === token.address.toLowerCase()
    );

    if (tokenIndex === -1) return "0.00";

    const balanceData = tokenBalances?.[tokenIndex];
    const balance = balanceData?.result as bigint | undefined;

    if (balance === undefined) return "0.00";

    const formatted = Number(formatUnits(balance, token.decimals));

    // Show more decimals for small balances
    if (formatted < 0.01 && formatted > 0) {
      return formatted.toFixed(6);
    }
    return formatted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>💰 Token Balances</CardTitle>
        <CardDescription>Your wallet balances (22 tokens)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Native ETH Balance */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Native
            </h3>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-accent/30">
              <div className="flex items-center gap-3">
                <img
                  src={NATIVE_ETH.logoURI}
                  alt={NATIVE_ETH.symbol}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/32';
                  }}
                />
                <div>
                  <div className="font-medium">{NATIVE_ETH.symbol}</div>
                  <div className="text-sm text-muted-foreground">{NATIVE_ETH.name}</div>
                </div>
              </div>
              <div className="text-right">
                {isLoading ? (
                  <Skeleton className="h-6 w-24" />
                ) : (
                  <div className="font-medium text-lg">
                    {ethBalance
                      ? Number(formatUnits(ethBalance.value, ethBalance.decimals)).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 6 }
                        )
                      : "0.00"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mock Token Balances by Category */}
          {TOKEN_CATEGORIES.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.tokens.map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/32';
                        }}
                      />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {token.symbol}
                          {token.isMock && (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                              Mock
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {isLoading ? (
                        <Skeleton className="h-6 w-24" />
                      ) : (
                        <div className="font-medium">
                          {getTokenBalance(token)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
