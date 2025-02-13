// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title DAI Stablecoin
 * @author Jitendra Kumar
 * @dev A simple ERC20 implementation of a mock DAI stablecoin with minting and burning functions.
 */
contract DAI is ERC20 {
    /// @notice Address of the contract owner
    address public owner;

    /**
     * @notice Constructor that initializes the DAI stablecoin and mints an initial supply.
     * @dev Mints 1,000,000 DAI tokens to the deployer.
     */
    constructor() ERC20("Dai Stablecoin", "DAI") {
        owner = msg.sender;
        _mint(msg.sender, 1_000_000 * 10 ** decimals()); // Mint 1M DAI
    }

    /**
     * @notice Allows the owner to mint new DAI tokens.
     * @dev Only the contract owner can call this function.
     * @param to The address receiving the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint");
        _mint(to, amount);
    }

    /**
     * @notice Allows users to burn their own DAI tokens.
     * @param amount The amount of tokens to burn.
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @notice Returns the number of decimal places used by the token.
     * @return The number of decimals (18).
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
