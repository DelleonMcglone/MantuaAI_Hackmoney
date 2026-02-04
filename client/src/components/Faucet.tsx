import { useEffect, useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { MOCK_TOKEN_FACTORY, MOCK_TOKENS } from "../config/tokens";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const FACTORY_ABI = [
  {
    name: "claimAllFaucets",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "checkAllFaucets",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "symbols", type: "string[]" },
      { name: "canClaim", type: "bool[]" },
      { name: "timeUntilNext", type: "uint256[]" },
    ],
  },
] as const;

const TOKEN_ABI = [
  {
    name: "faucet",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
] as const;

export function Faucet() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});

  // Read faucet status from factory
  const { data: faucetStatus, refetch } = useReadContract({
    address: MOCK_TOKEN_FACTORY,
    abi: FACTORY_ABI,
    functionName: "checkAllFaucets",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  // Update countdowns every second
  useEffect(() => {
    if (!faucetStatus) return;

    const [symbols, canClaim, timeUntilNext] = faucetStatus;

    const interval = setInterval(() => {
      const newCountdowns: { [key: string]: number } = {};
      symbols.forEach((symbol, index) => {
        if (!canClaim[index]) {
          const remaining = Number(timeUntilNext[index]);
          const elapsed = Math.floor(Date.now() / 1000) - (Date.now() / 1000 - remaining);
          newCountdowns[symbol] = Math.max(0, remaining - Math.floor(Date.now() / 1000 - Date.now() / 1000));
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [faucetStatus]);

  const handleClaimAll = async () => {
    try {
      writeContract(
        {
          address: MOCK_TOKEN_FACTORY,
          abi: FACTORY_ABI,
          functionName: "claimAllFaucets",
        },
        {
          onSuccess: () => {
            setTimeout(() => refetch(), 2000);
          },
        }
      );
    } catch (error) {
      console.error("Error claiming all faucets:", error);
    }
  };

  const handleClaimSingle = async (tokenAddress: `0x${string}`) => {
    try {
      writeContract(
        {
          address: tokenAddress,
          abi: TOKEN_ABI,
          functionName: "faucet",
        },
        {
          onSuccess: () => {
            setTimeout(() => refetch(), 2000);
          },
        }
      );
    } catch (error) {
      console.error("Error claiming faucet:", error);
    }
  };

  const formatCountdown = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getTokenStatus = (symbol: string): { canClaim: boolean; timeRemaining: number } => {
    if (!faucetStatus) return { canClaim: false, timeRemaining: 0 };

    const [symbols, canClaim, timeUntilNext] = faucetStatus;
    const index = symbols.findIndex((s) => s === symbol);

    if (index === -1) return { canClaim: false, timeRemaining: 0 };

    return {
      canClaim: canClaim[index],
      timeRemaining: Number(timeUntilNext[index]),
    };
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Token Faucet</CardTitle>
          <CardDescription>Get testnet tokens for trading</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Connect wallet to use faucet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Token Faucet</CardTitle>
            <CardDescription>Claim testnet tokens every hour</CardDescription>
          </div>
          <Button onClick={handleClaimAll} size="sm">
            Claim All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {MOCK_TOKENS.map((token) => {
            const status = getTokenStatus(token.symbol);
            const countdown = countdowns[token.symbol] || status.timeRemaining;

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
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {token.faucetAmount} per claim
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {status.canClaim ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Ready
                      </span>
                      <Button
                        onClick={() => handleClaimSingle(token.address)}
                        size="sm"
                      >
                        Claim
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-yellow-600 dark:text-yellow-400">
                        {formatCountdown(countdown)}
                      </span>
                      <Button size="sm" disabled>
                        Claim
                      </Button>
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
