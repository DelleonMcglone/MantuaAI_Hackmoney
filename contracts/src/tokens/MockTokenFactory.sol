// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./MockERC20.sol";

/**
 * @title MockTokenFactory
 * @notice Factory contract for deploying and managing mock testnet tokens
 * @dev Deploys all mock tokens and provides batch operations
 */
contract MockTokenFactory {
    // Mock token addresses
    MockERC20 public mUSDC;
    MockERC20 public mETH;
    MockERC20 public mDAI;
    MockERC20 public mBTC;
    MockERC20 public mLINK;
    MockERC20 public mUSDT;
    MockERC20 public mUSDE;

    address[] public allTokens;
    bool public deployed;

    event TokensDeployed(address[] tokens);
    event FaucetsClaimed(address indexed user, uint256 tokensClaimed);
    event LiquidityMinted(address indexed token, address indexed to, uint256 amount);

    error AlreadyDeployed();
    error NotDeployed();
    error NotTokenOwner();

    /**
     * @notice Deploys all mock tokens
     * @dev Can only be called once
     */
    function deployAllTokens() external {
        if (deployed) revert AlreadyDeployed();

        // Deploy mUSDC (6 decimals, 10,000 per claim)
        mUSDC = new MockERC20(
            "Mantua USDC",
            "mUSDC",
            6,
            10_000 * 10**6,
            address(this)
        );

        // Deploy mETH (18 decimals, 10 per claim)
        mETH = new MockERC20(
            "Mantua ETH",
            "mETH",
            18,
            10 * 10**18,
            address(this)
        );

        // Deploy mDAI (18 decimals, 10,000 per claim)
        mDAI = new MockERC20(
            "Mantua DAI",
            "mDAI",
            18,
            10_000 * 10**18,
            address(this)
        );

        // Deploy mBTC (8 decimals, 1 per claim)
        mBTC = new MockERC20(
            "Mantua BTC",
            "mBTC",
            8,
            1 * 10**8,
            address(this)
        );

        // Deploy mLINK (18 decimals, 100 per claim)
        mLINK = new MockERC20(
            "Mantua LINK",
            "mLINK",
            18,
            100 * 10**18,
            address(this)
        );

        // Deploy mUSDT (6 decimals, 10,000 per claim)
        mUSDT = new MockERC20(
            "Mantua USDT",
            "mUSDT",
            6,
            10_000 * 10**6,
            address(this)
        );

        // Deploy mUSDe (18 decimals, 10,000 per claim)
        mUSDE = new MockERC20(
            "Mantua USDe",
            "mUSDE",
            18,
            10_000 * 10**18,
            address(this)
        );

        // Populate allTokens array
        allTokens.push(address(mUSDC));
        allTokens.push(address(mETH));
        allTokens.push(address(mDAI));
        allTokens.push(address(mBTC));
        allTokens.push(address(mLINK));
        allTokens.push(address(mUSDT));
        allTokens.push(address(mUSDE));

        deployed = true;

        emit TokensDeployed(allTokens);
    }

    /**
     * @notice Returns all token addresses
     * @return Array of token addresses
     */
    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }

    /**
     * @notice Claims faucet from all tokens that are available
     * @dev Uses try/catch to skip tokens on cooldown
     */
    function claimAllFaucets() external {
        if (!deployed) revert NotDeployed();

        uint256 claimed = 0;

        // Try to claim from each token for msg.sender
        try mUSDC.faucetFor(msg.sender) { claimed++; } catch {}
        try mETH.faucetFor(msg.sender) { claimed++; } catch {}
        try mDAI.faucetFor(msg.sender) { claimed++; } catch {}
        try mBTC.faucetFor(msg.sender) { claimed++; } catch {}
        try mLINK.faucetFor(msg.sender) { claimed++; } catch {}
        try mUSDT.faucetFor(msg.sender) { claimed++; } catch {}
        try mUSDE.faucetFor(msg.sender) { claimed++; } catch {}

        emit FaucetsClaimed(msg.sender, claimed);
    }

    /**
     * @notice Checks faucet status for all tokens for a given user
     * @param user The user address to check
     * @return symbols Array of token symbols
     * @return canClaim Array of booleans indicating if user can claim
     * @return timeUntilNext Array of seconds until next claim
     */
    function checkAllFaucets(address user)
        external
        view
        returns (
            string[] memory symbols,
            bool[] memory canClaim,
            uint256[] memory timeUntilNext
        )
    {
        if (!deployed) revert NotDeployed();

        symbols = new string[](7);
        canClaim = new bool[](7);
        timeUntilNext = new uint256[](7);

        symbols[0] = "mUSDC";
        (canClaim[0], timeUntilNext[0]) = mUSDC.canClaimFaucet(user);

        symbols[1] = "mETH";
        (canClaim[1], timeUntilNext[1]) = mETH.canClaimFaucet(user);

        symbols[2] = "mDAI";
        (canClaim[2], timeUntilNext[2]) = mDAI.canClaimFaucet(user);

        symbols[3] = "mBTC";
        (canClaim[3], timeUntilNext[3]) = mBTC.canClaimFaucet(user);

        symbols[4] = "mLINK";
        (canClaim[4], timeUntilNext[4]) = mLINK.canClaimFaucet(user);

        symbols[5] = "mUSDT";
        (canClaim[5], timeUntilNext[5]) = mUSDT.canClaimFaucet(user);

        symbols[6] = "mUSDE";
        (canClaim[6], timeUntilNext[6]) = mUSDE.canClaimFaucet(user);
    }

    /**
     * @notice Mints liquidity to a specified address (factory is owner)
     * @param token The token address to mint
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mintLiquidity(address token, address to, uint256 amount) external {
        if (!deployed) revert NotDeployed();

        // Verify it's one of our tokens
        bool isOurToken = false;
        for (uint256 i = 0; i < allTokens.length; i++) {
            if (allTokens[i] == token) {
                isOurToken = true;
                break;
            }
        }

        if (!isOurToken) revert NotTokenOwner();

        MockERC20(token).mint(to, amount);

        emit LiquidityMinted(token, to, amount);
    }
}
