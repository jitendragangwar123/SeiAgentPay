// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title USDT Token Contract
 * @author Jitendra Kumar
 * @notice This contract implements a simple USDT token with mint and burn functionality.
 * @dev The contract follows the ERC20 standard and allows the owner to mint new tokens.
 */
contract USDT is ERC20 {
    /// @notice Address of the contract owner
    address public owner;

    /**
     * @notice Constructor that initializes the USDT token and mints an initial supply to the deployer.
     */
    constructor() ERC20("Tether USD", "USDT") {
        owner = msg.sender;
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Mint 1M USDT
    }

    /**
     * @notice Mints new tokens to a specified address.
     * @dev Only the owner can call this function.
     * @param to The address receiving the newly minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint");
        _mint(to, amount);
    }

    /**
     * @notice Burns tokens from the caller's balance.
     * @param amount The amount of tokens to burn.
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @notice Overrides the default ERC20 decimals to match USDT's 6 decimal places.
     * @return The number of decimals used by the token.
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
