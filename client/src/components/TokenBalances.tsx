import { useAccount, useBalance, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { erc20Abi } from "viem";
import { MOCK_TOKENS, NATIVE_ETH } from "../config/tokens";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

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
    contracts: MOCK_TOKENS.map((token) => ({
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
          <CardTitle>Token Balances</CardTitle>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Balances</CardTitle>
        <CardDescription>Your wallet balances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Native ETH Balance */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={NATIVE_ETH.logoURI}
                alt={NATIVE_ETH.symbol}
                className="w-8 h-8 rounded-full"
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
                <div className="font-medium">
                  {ethBalance
                    ? Number(formatUnits(ethBalance.value, ethBalance.decimals)).toFixed(6)
                    : "0.000000"}
                </div>
              )}
            </div>
          </div>

          {/* Mock Token Balances */}
          {MOCK_TOKENS.map((token, index) => {
            const balanceData = tokenBalances?.[index];
            const balance = balanceData?.result as bigint | undefined;

            return (
              <div
                key={token.symbol}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full"
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
                      {balance !== undefined
                        ? Number(formatUnits(balance, token.decimals)).toFixed(6)
                        : "0.000000"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
