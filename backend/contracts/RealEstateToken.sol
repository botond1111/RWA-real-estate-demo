// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Real Estate Token (RWA)
/// @notice Represents fractional ownership of a real estate property with access control.
/// @dev Implements a whitelist mechanism to ensure compliance (KYC/AML).
contract RealEstateToken is ERC20, Ownable {
    IERC20 public immutable paymentToken;
    uint256 public constant TOKEN_PRICE = 1000 * 10**18; // 1000 USDC per token

    // State Variables
    mapping(address => bool) public isWhitelisted;

    // Custom Errors
    error NotWhitelisted();
    error InsufficientFunds();
    error InsufficientAllowance();

    // Events
    event WhitelistUpdated(address indexed user, bool status);
    event PropertySold(address indexed buyer, uint256 amount);

    constructor(address _paymentToken) ERC20("Budapest Penthouse", "BPT") Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
    }

    /// @dev Restricts access to whitelisted addresses only.
    modifier onlyWhitelisted() {
        if (!isWhitelisted[msg.sender]) revert NotWhitelisted();
        _;
    }

    /// @notice Adds or removes a user from the whitelist.
    /// @dev Only the contract owner can call this function.
    /// @param _user The address to update.
    /// @param _status True to whitelist, false to blacklist.
    function updateWhitelist(address _user, bool _status) external onlyOwner {
        isWhitelisted[_user] = _status;
        emit WhitelistUpdated(_user, _status);
    }

    /// @notice Allows whitelisted users to purchase property tokens.
    /// @param amount The number of tokens (units) to purchase.
    function buyToken(uint256 amount) external onlyWhitelisted {
        uint256 cost = amount * TOKEN_PRICE;
        
        // Checks
        if (paymentToken.balanceOf(msg.sender) < cost) revert InsufficientFunds();
        if (paymentToken.allowance(msg.sender, address(this)) < cost) revert InsufficientAllowance();

        // Effects & Interactions
        paymentToken.transferFrom(msg.sender, address(this), cost);
        _mint(msg.sender, amount * 10**18);
        
        emit PropertySold(msg.sender, amount);
    }
}
