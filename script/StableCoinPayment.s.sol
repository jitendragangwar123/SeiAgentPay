// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {StableCoinPayment} from "../src/StableCoinPayment.sol";
import {DAI} from "../src/DAI.sol";
import {USDT} from "../src/USDT.sol";
import {USDC} from "../src/USDC.sol";

contract DeployStableCoinPayment is Script {
    function run() public returns (StableCoinPayment,DAI,USDT,USDC) { 
        vm.startBroadcast();

        DAI dai = new DAI();
        console.log("DAI deployed at:", address(dai));

        USDT usdt = new USDT();
        console.log("USDT deployed at:", address(usdt));

        USDC usdc = new USDC();
        console.log("USDC deployed at:", address(usdc));

        StableCoinPayment paymentContract = new StableCoinPayment(address(dai), address(usdt), address(usdc));
        console.log("StableCoinPayment deployed at:", address(paymentContract));

        vm.stopBroadcast();
        return (paymentContract,dai,usdt,usdc);
    }
}
