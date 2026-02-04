// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./MockERC20.sol";

/**
 * @title MockTokenFactory
 * @notice Factory contract for deploying and managing mock testnet tokens
 * @dev Deploys all 21 mock tokens across 5 categories
 */
contract MockTokenFactory {
    // Stablecoins (5)
    MockERC20 public mUSDC;
    MockERC20 public mUSDT;
    MockERC20 public mDAI;
    MockERC20 public mUSDe;
    MockERC20 public mFRAX;

    // Real World Assets (5)
    MockERC20 public mOUSG;
    MockERC20 public mUSDY;
    MockERC20 public mBUIDL;
    MockERC20 public mTBILL;
    MockERC20 public mSTEUR;

    // Liquid Staking Tokens (5)
    MockERC20 public mETH;
    MockERC20 public mstETH;
    MockERC20 public mcbETH;
    MockERC20 public mrETH;
    MockERC20 public mwstETH;

    // Wrapped Assets (6)
    MockERC20 public mWBTC;
    MockERC20 public mWETH;
    MockERC20 public mWSOL;
    MockERC20 public mWAVAX;
    MockERC20 public mWMATIC;
    MockERC20 public mBTC;

    address[] public allTokens;
    bool public deployed;

    event TokensDeployed(address[] tokens);
    event FaucetsClaimed(address indexed user, uint256 tokensClaimed);
    event LiquidityMinted(address indexed token, address indexed to, uint256 amount);

    error AlreadyDeployed();
    error NotDeployed();
    error NotTokenOwner();

    /**
     * @notice Deploys all mock tokens (21 total)
     * @dev Can only be called once
     */
    function deployAllTokens() external {
        if (deployed) revert AlreadyDeployed();

        // ===== Stablecoins (5) =====

        // mUSDC - 6 decimals, 10,000 per claim
        mUSDC = new MockERC20(
            "Mantua USD Coin",
            "mUSDC",
            6,
            10_000 * 10**6,
            address(this)
        );

        // mUSDT - 6 decimals, 10,000 per claim
        mUSDT = new MockERC20(
            "Mantua Tether",
            "mUSDT",
            6,
            10_000 * 10**6,
            address(this)
        );

        // mDAI - 18 decimals, 10,000 per claim
        mDAI = new MockERC20(
            "Mantua DAI",
            "mDAI",
            18,
            10_000 * 10**18,
            address(this)
        );

        // mUSDe - 18 decimals, 10,000 per claim
        mUSDe = new MockERC20(
            "Mantua USDe",
            "mUSDe",
            18,
            10_000 * 10**18,
            address(this)
        );

        // mFRAX - 18 decimals, 10,000 per claim
        mFRAX = new MockERC20(
            "Mantua FRAX",
            "mFRAX",
            18,
            10_000 * 10**18,
            address(this)
        );

        // ===== Real World Assets (5) =====

        // mOUSG - 18 decimals, 100 per claim
        mOUSG = new MockERC20(
            "Mantua OUSG",
            "mOUSG",
            18,
            100 * 10**18,
            address(this)
        );

        // mUSDY - 18 decimals, 10,000 per claim
        mUSDY = new MockERC20(
            "Mantua USDY",
            "mUSDY",
            18,
            10_000 * 10**18,
            address(this)
        );

        // mBUIDL - 6 decimals, 10,000 per claim
        mBUIDL = new MockERC20(
            "Mantua BUIDL",
            "mBUIDL",
            6,
            10_000 * 10**6,
            address(this)
        );

        // mTBILL - 18 decimals, 10,000 per claim
        mTBILL = new MockERC20(
            "Mantua TBILL",
            "mTBILL",
            18,
            10_000 * 10**18,
            address(this)
        );

        // mSTEUR - 18 decimals, 10,000 per claim
        mSTEUR = new MockERC20(
            "Mantua stEUR",
            "mSTEUR",
            18,
            10_000 * 10**18,
            address(this)
        );

        // ===== Liquid Staking Tokens (5) =====

        // mETH - 18 decimals, 10 per claim
        mETH = new MockERC20(
            "Mantua ETH",
            "mETH",
            18,
            10 * 10**18,
            address(this)
        );

        // mstETH - 18 decimals, 10 per claim
        mstETH = new MockERC20(
            "Mantua stETH",
            "mstETH",
            18,
            10 * 10**18,
            address(this)
        );

        // mcbETH - 18 decimals, 10 per claim
        mcbETH = new MockERC20(
            "Mantua cbETH",
            "mcbETH",
            18,
            10 * 10**18,
            address(this)
        );

        // mrETH - 18 decimals, 10 per claim
        mrETH = new MockERC20(
            "Mantua rETH",
            "mrETH",
            18,
            10 * 10**18,
            address(this)
        );

        // mwstETH - 18 decimals, 10 per claim
        mwstETH = new MockERC20(
            "Mantua wstETH",
            "mwstETH",
            18,
            10 * 10**18,
            address(this)
        );

        // ===== Wrapped Assets (6) =====

        // mWBTC - 8 decimals, 1 per claim
        mWBTC = new MockERC20(
            "Mantua Wrapped BTC",
            "mWBTC",
            8,
            1 * 10**8,
            address(this)
        );

        // mWETH - 18 decimals, 10 per claim
        mWETH = new MockERC20(
            "Mantua Wrapped ETH",
            "mWETH",
            18,
            10 * 10**18,
            address(this)
        );

        // mWSOL - 9 decimals, 100 per claim
        mWSOL = new MockERC20(
            "Mantua Wrapped SOL",
            "mWSOL",
            9,
            100 * 10**9,
            address(this)
        );

        // mWAVAX - 18 decimals, 100 per claim
        mWAVAX = new MockERC20(
            "Mantua Wrapped AVAX",
            "mWAVAX",
            18,
            100 * 10**18,
            address(this)
        );

        // mWMATIC - 18 decimals, 1,000 per claim
        mWMATIC = new MockERC20(
            "Mantua Wrapped MATIC",
            "mWMATIC",
            18,
            1_000 * 10**18,
            address(this)
        );

        // mBTC - 8 decimals, 1 per claim
        mBTC = new MockERC20(
            "Mantua BTC",
            "mBTC",
            8,
            1 * 10**8,
            address(this)
        );

        // Populate allTokens array
        // Stablecoins
        allTokens.push(address(mUSDC));
        allTokens.push(address(mUSDT));
        allTokens.push(address(mDAI));
        allTokens.push(address(mUSDe));
        allTokens.push(address(mFRAX));

        // RWA
        allTokens.push(address(mOUSG));
        allTokens.push(address(mUSDY));
        allTokens.push(address(mBUIDL));
        allTokens.push(address(mTBILL));
        allTokens.push(address(mSTEUR));

        // LST
        allTokens.push(address(mETH));
        allTokens.push(address(mstETH));
        allTokens.push(address(mcbETH));
        allTokens.push(address(mrETH));
        allTokens.push(address(mwstETH));

        // Wrapped
        allTokens.push(address(mWBTC));
        allTokens.push(address(mWETH));
        allTokens.push(address(mWSOL));
        allTokens.push(address(mWAVAX));
        allTokens.push(address(mWMATIC));
        allTokens.push(address(mBTC));

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
        // Stablecoins
        try mUSDC.faucetFor(msg.sender) { claimed++; } catch {}
        try mUSDT.faucetFor(msg.sender) { claimed++; } catch {}
        try mDAI.faucetFor(msg.sender) { claimed++; } catch {}
        try mUSDe.faucetFor(msg.sender) { claimed++; } catch {}
        try mFRAX.faucetFor(msg.sender) { claimed++; } catch {}

        // RWA
        try mOUSG.faucetFor(msg.sender) { claimed++; } catch {}
        try mUSDY.faucetFor(msg.sender) { claimed++; } catch {}
        try mBUIDL.faucetFor(msg.sender) { claimed++; } catch {}
        try mTBILL.faucetFor(msg.sender) { claimed++; } catch {}
        try mSTEUR.faucetFor(msg.sender) { claimed++; } catch {}

        // LST
        try mETH.faucetFor(msg.sender) { claimed++; } catch {}
        try mstETH.faucetFor(msg.sender) { claimed++; } catch {}
        try mcbETH.faucetFor(msg.sender) { claimed++; } catch {}
        try mrETH.faucetFor(msg.sender) { claimed++; } catch {}
        try mwstETH.faucetFor(msg.sender) { claimed++; } catch {}

        // Wrapped
        try mWBTC.faucetFor(msg.sender) { claimed++; } catch {}
        try mWETH.faucetFor(msg.sender) { claimed++; } catch {}
        try mWSOL.faucetFor(msg.sender) { claimed++; } catch {}
        try mWAVAX.faucetFor(msg.sender) { claimed++; } catch {}
        try mWMATIC.faucetFor(msg.sender) { claimed++; } catch {}
        try mBTC.faucetFor(msg.sender) { claimed++; } catch {}

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

        symbols = new string[](21);
        canClaim = new bool[](21);
        timeUntilNext = new uint256[](21);

        // Stablecoins
        symbols[0] = "mUSDC";
        (canClaim[0], timeUntilNext[0]) = mUSDC.canClaimFaucet(user);

        symbols[1] = "mUSDT";
        (canClaim[1], timeUntilNext[1]) = mUSDT.canClaimFaucet(user);

        symbols[2] = "mDAI";
        (canClaim[2], timeUntilNext[2]) = mDAI.canClaimFaucet(user);

        symbols[3] = "mUSDe";
        (canClaim[3], timeUntilNext[3]) = mUSDe.canClaimFaucet(user);

        symbols[4] = "mFRAX";
        (canClaim[4], timeUntilNext[4]) = mFRAX.canClaimFaucet(user);

        // RWA
        symbols[5] = "mOUSG";
        (canClaim[5], timeUntilNext[5]) = mOUSG.canClaimFaucet(user);

        symbols[6] = "mUSDY";
        (canClaim[6], timeUntilNext[6]) = mUSDY.canClaimFaucet(user);

        symbols[7] = "mBUIDL";
        (canClaim[7], timeUntilNext[7]) = mBUIDL.canClaimFaucet(user);

        symbols[8] = "mTBILL";
        (canClaim[8], timeUntilNext[8]) = mTBILL.canClaimFaucet(user);

        symbols[9] = "mSTEUR";
        (canClaim[9], timeUntilNext[9]) = mSTEUR.canClaimFaucet(user);

        // LST
        symbols[10] = "mETH";
        (canClaim[10], timeUntilNext[10]) = mETH.canClaimFaucet(user);

        symbols[11] = "mstETH";
        (canClaim[11], timeUntilNext[11]) = mstETH.canClaimFaucet(user);

        symbols[12] = "mcbETH";
        (canClaim[12], timeUntilNext[12]) = mcbETH.canClaimFaucet(user);

        symbols[13] = "mrETH";
        (canClaim[13], timeUntilNext[13]) = mrETH.canClaimFaucet(user);

        symbols[14] = "mwstETH";
        (canClaim[14], timeUntilNext[14]) = mwstETH.canClaimFaucet(user);

        // Wrapped
        symbols[15] = "mWBTC";
        (canClaim[15], timeUntilNext[15]) = mWBTC.canClaimFaucet(user);

        symbols[16] = "mWETH";
        (canClaim[16], timeUntilNext[16]) = mWETH.canClaimFaucet(user);

        symbols[17] = "mWSOL";
        (canClaim[17], timeUntilNext[17]) = mWSOL.canClaimFaucet(user);

        symbols[18] = "mWAVAX";
        (canClaim[18], timeUntilNext[18]) = mWAVAX.canClaimFaucet(user);

        symbols[19] = "mWMATIC";
        (canClaim[19], timeUntilNext[19]) = mWMATIC.canClaimFaucet(user);

        symbols[20] = "mBTC";
        (canClaim[20], timeUntilNext[20]) = mBTC.canClaimFaucet(user);
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
