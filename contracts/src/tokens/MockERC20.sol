// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockERC20
 * @notice Mock ERC20 token with public faucet for testnet use
 * @dev Includes a time-gated faucet and custom decimal support
 */
contract MockERC20 is ERC20, Ownable {
    uint8 private immutable _decimals;
    uint256 public immutable faucetAmount;
    uint256 public constant FAUCET_COOLDOWN = 1 hours;

    mapping(address => uint256) public lastFaucetClaim;

    event FaucetClaimed(address indexed claimer, uint256 amount, uint256 nextClaimTime);

    error FaucetCooldownActive(uint256 timeRemaining);

    /**
     * @notice Constructs the MockERC20 token
     * @param name_ Token name
     * @param symbol_ Token symbol
     * @param decimals_ Number of decimals
     * @param faucetAmount_ Amount minted per faucet claim
     * @param owner_ Initial owner of the contract
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 faucetAmount_,
        address owner_
    ) ERC20(name_, symbol_) Ownable(owner_) {
        _decimals = decimals_;
        faucetAmount = faucetAmount_;
    }

    /**
     * @notice Returns the number of decimals for this token
     * @return The number of decimals
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    /**
     * @notice Claims tokens from the faucet
     * @dev Enforces a 1-hour cooldown between claims
     */
    function faucet() external {
        _claimFaucet(msg.sender);
    }

    /**
     * @notice Claims tokens from the faucet for a specific user (owner only)
     * @param user The user to claim for
     * @dev Allows factory to claim on behalf of users
     */
    function faucetFor(address user) external onlyOwner {
        _claimFaucet(user);
    }

    /**
     * @notice Internal function to handle faucet claims
     * @param user The user claiming tokens
     */
    function _claimFaucet(address user) internal {
        (bool canClaim, uint256 timeRemaining) = canClaimFaucet(user);

        if (!canClaim) {
            revert FaucetCooldownActive(timeRemaining);
        }

        lastFaucetClaim[user] = block.timestamp;
        uint256 nextClaimTime = block.timestamp + FAUCET_COOLDOWN;

        _mint(user, faucetAmount);

        emit FaucetClaimed(user, faucetAmount, nextClaimTime);
    }

    /**
     * @notice Checks if an address can claim from the faucet
     * @param user The address to check
     * @return canClaim Whether the user can claim
     * @return timeRemaining Seconds until next claim (0 if can claim)
     */
    function canClaimFaucet(address user) public view returns (bool canClaim, uint256 timeRemaining) {
        uint256 lastClaim = lastFaucetClaim[user];

        if (lastClaim == 0) {
            return (true, 0);
        }

        uint256 timeSinceLastClaim = block.timestamp - lastClaim;

        if (timeSinceLastClaim >= FAUCET_COOLDOWN) {
            return (true, 0);
        } else {
            return (false, FAUCET_COOLDOWN - timeSinceLastClaim);
        }
    }

    /**
     * @notice Owner can mint unlimited tokens for liquidity seeding
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
