// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/tokens/MockTokenFactory.sol";

/**
 * @title DeployMockTokens
 * @notice Deploys the MockTokenFactory and all mock tokens
 */
contract DeployMockTokens is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy factory
        MockTokenFactory factory = new MockTokenFactory();
        console.log("MockTokenFactory deployed at:", address(factory));

        // Deploy all tokens
        factory.deployAllTokens();
        console.log("All tokens deployed");

        console.log("\n=== Token Addresses ===");
        console.log("mUSDC:", address(factory.mUSDC()));
        console.log("mETH:", address(factory.mETH()));
        console.log("mDAI:", address(factory.mDAI()));
        console.log("mBTC:", address(factory.mBTC()));
        console.log("mLINK:", address(factory.mLINK()));
        console.log("mUSDT:", address(factory.mUSDT()));
        console.log("mUSDE:", address(factory.mUSDE()));

        console.log("\n=== Update frontend tokens.ts with these addresses ===");
        console.log("MOCK_TOKEN_FACTORY:", address(factory));

        vm.stopBroadcast();
    }
}

/**
 * @title SeedLiquidity
 * @notice Seeds initial liquidity to tokens (optional script)
 */
contract SeedLiquidity is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address factoryAddress = vm.envAddress("MOCK_TOKEN_FACTORY");

        vm.startBroadcast(deployerPrivateKey);

        MockTokenFactory factory = MockTokenFactory(factoryAddress);

        // Mint initial liquidity
        // 1M USDC (6 decimals)
        factory.mintLiquidity(address(factory.mUSDC()), msg.sender, 1_000_000 * 10**6);

        // 1M DAI (18 decimals)
        factory.mintLiquidity(address(factory.mDAI()), msg.sender, 1_000_000 * 10**18);

        // 1M USDT (6 decimals)
        factory.mintLiquidity(address(factory.mUSDT()), msg.sender, 1_000_000 * 10**6);

        // 1M USDe (18 decimals)
        factory.mintLiquidity(address(factory.mUSDE()), msg.sender, 1_000_000 * 10**18);

        // 1K mETH (18 decimals)
        factory.mintLiquidity(address(factory.mETH()), msg.sender, 1_000 * 10**18);

        // 100 mBTC (8 decimals)
        factory.mintLiquidity(address(factory.mBTC()), msg.sender, 100 * 10**8);

        // 10K mLINK (18 decimals)
        factory.mintLiquidity(address(factory.mLINK()), msg.sender, 10_000 * 10**18);

        console.log("Liquidity seeded to:", msg.sender);

        vm.stopBroadcast();
    }
}
