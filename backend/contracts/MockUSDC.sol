// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Mock USDC Token
/// @notice ERC20 token for testing purposes with initial minting.
contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "MUSDC") {
        // Initial supply for the deployer
        _mint(msg.sender, 1000000 * 10 ** 18);
    }

/**
     * @notice Allows anyone to mint tokens to themselves.
     * @dev WARNING: This function is for testing only! 
     * It allows unrestricted token generation. Do not use in production.
     * @param to The address to receive the tokens.
     * @param amount The amount of tokens to mint (in wei).
*/
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
