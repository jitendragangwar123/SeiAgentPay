// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title StableCoinPayment contract
 * @author Jitendra Kumar
 * @dev A smart contract facilitating payments using stablecoins.
 */
contract StableCoinPayment {
    using SafeERC20 for IERC20;

    /// @notice Address of the contract administrator
    address public admin;

    /// @notice Mapping of stablecoin symbols (hashed) to their contract addresses
    mapping(bytes32 => address) public stablecoins;

    /// @notice Emitted when a payment is processed successfully
    /// @param user The address of the payer
    /// @param merchant The address of the merchant receiving the payment
    /// @param stablecoin The stablecoin used for payment
    /// @param amount The amount transferred
    event PaymentProcessed(address indexed user, address indexed merchant, string stablecoin, uint256 amount);

    /// @notice Emitted when a stablecoin address is updated
    /// @param stablecoin The stablecoin symbol
    /// @param newAddress The new contract address of the stablecoin
    event StablecoinUpdated(string stablecoin, address newAddress);

    /// @notice Emitted when the admin address is updated
    /// @param newAdmin The new admin address
    event AdminUpdated(address newAdmin);

    /// @dev Ensures only the admin can perform certain actions
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    /**
     * @notice Constructor to initialize the contract with stablecoin addresses
     * @param dai Address of the DAI stablecoin contract
     * @param usdt Address of the USDT stablecoin contract
     * @param usdc Address of the USDC stablecoin contract
     */
    constructor(address dai, address usdt, address usdc) {
        require(dai != address(0) && usdt != address(0) && usdc != address(0), "Invalid stablecoin addresses");
        admin = msg.sender;
        stablecoins[keccak256("DAI")] = dai;
        stablecoins[keccak256("USDT")] = usdt;
        stablecoins[keccak256("USDC")] = usdc;
    }

    /**
     * @notice Allows a user to pay a merchant using a supported stablecoin
     * @param merchant The address of the merchant receiving the payment
     * @param stablecoin The symbol of the stablecoin being used
     * @param amount The amount to be transferred
     */
    function payMerchant(address merchant, string memory stablecoin, uint256 amount) external {
        require(merchant != address(0), "Invalid merchant address");
        require(amount > 0, "Amount must be greater than zero");

        bytes32 stablecoinKey = keccak256(abi.encodePacked(stablecoin));
        address tokenAddress = stablecoins[stablecoinKey];
        require(tokenAddress != address(0), "Unsupported stablecoin");

        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(token.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

        token.safeTransferFrom(msg.sender, merchant, amount);

        emit PaymentProcessed(msg.sender, merchant, stablecoin, amount);
    }

    /**
     * @notice Updates the contract address of a stablecoin
     * @dev Only the admin can call this function
     * @param stablecoin The symbol of the stablecoin
     * @param newAddress The new contract address of the stablecoin
     */
    function updateStablecoinAddress(string memory stablecoin, address newAddress) external onlyAdmin {
        require(newAddress != address(0), "Invalid new address");

        bytes32 stablecoinKey = keccak256(abi.encodePacked(stablecoin));
        require(stablecoins[stablecoinKey] != address(0), "Stablecoin not found");

        stablecoins[stablecoinKey] = newAddress;
        emit StablecoinUpdated(stablecoin, newAddress);
    }

    /**
     * @notice Changes the admin of the contract
     * @dev Only the current admin can call this function
     * @param newAdmin The address of the new admin
     */
    function changeAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid new admin");
        require(newAdmin != admin, "New admin must be different");

        admin = newAdmin;
        emit AdminUpdated(newAdmin);
    }

    /**
     * @notice Retrieves the contract address of a stablecoin
     * @param stablecoin The symbol of the stablecoin
     * @return The contract address of the requested stablecoin
     */
    function getStablecoinAddress(string memory stablecoin) external view returns (address) {
        return stablecoins[keccak256(abi.encodePacked(stablecoin))];
    }
}
