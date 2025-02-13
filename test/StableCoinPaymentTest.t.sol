// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {StableCoinPayment} from "../src/StableCoinPayment.sol";
import {DAI} from "../src/DAI.sol";
import {USDT} from "../src/USDT.sol";
import {USDC} from "../src/USDC.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StableCoinPaymentTest is Test {
    StableCoinPayment public paymentContract;
    DAI public dai;
    USDT public usdt;
    USDC public usdc;
    address public admin;
    address public user;
    address public merchant;

    function setUp() public {
        admin = address(this);
        user = address(0x123);
        merchant = address(0x456);

        dai = new DAI();
        usdt = new USDT();
        usdc = new USDC();

        paymentContract = new StableCoinPayment(address(dai), address(usdt), address(usdc));

        dai.transfer(user, 1000 * 10**6);
        usdt.transfer(user, 1000 * 10**6);
        usdc.transfer(user, 1000 * 10**6);
    }

    function test_Payment_Success() public {
        vm.startPrank(user);
        dai.approve(address(paymentContract), 500 * 10**6);
        paymentContract.payMerchant(merchant, "DAI", 500 * 10**6);
        vm.stopPrank();

        assertEq(dai.balanceOf(merchant), 500 * 10**6);
    }

    function test_Revert_When_UnsupportedStablecoin() public {
        vm.startPrank(user);
        dai.approve(address(paymentContract), 500 * 10**6);
        vm.expectRevert("Unsupported stablecoin");
        paymentContract.payMerchant(merchant, "INVALID", 500 * 10**6);
        vm.stopPrank();
    }

    function test_Revert_When_InsufficientBalance() public {
        vm.startPrank(user);
        dai.approve(address(paymentContract), 5000 * 10**6); 
        vm.expectRevert("Insufficient balance");
        paymentContract.payMerchant(merchant, "DAI", 5000 * 10**6);
        vm.stopPrank();
    }

    function test_Revert_When_InsufficientAllowance() public {
        vm.startPrank(user);
        vm.expectRevert("Insufficient allowance");
        paymentContract.payMerchant(merchant, "DAI", 500 * 10**6); 
        vm.stopPrank();
    }

    function test_UpdateStablecoinAddress_Success() public {
        address newDaiAddress = address(0x999);
        paymentContract.updateStablecoinAddress("DAI", newDaiAddress);
        assertEq(paymentContract.getStablecoinAddress("DAI"), newDaiAddress);
    }

    function test_Revert_When_UpdateStablecoinAddressByNonAdmin() public {
        address newDaiAddress = address(0x999);
        vm.startPrank(user);
        vm.expectRevert("Only admin can perform this action");
        paymentContract.updateStablecoinAddress("DAI", newDaiAddress);
        vm.stopPrank();
    }

    function test_ChangeAdmin_Success() public {
        address newAdmin = address(0x789);
        paymentContract.changeAdmin(newAdmin);
        assertEq(paymentContract.admin(), newAdmin);
    }

    function test_Revert_When_ChangeAdminByNonAdmin() public {
        vm.startPrank(user);
        vm.expectRevert("Only admin can perform this action");
        paymentContract.changeAdmin(user);
        vm.stopPrank();
    }
}
