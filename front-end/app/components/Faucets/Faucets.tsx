"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Loader2, Wallet, BarChart3, TrendingUp } from "lucide-react";
import FaucetSuccessModal from "./SuccessModal";
import { DAI_ABI, DAI_ADDRESS, USDC_ABI, USDC_ADDRESS, USDT_ABI, USDT_ADDRESS, STABLECOINPAYMENT_ADDRESS } from "../../../constant/index";
import { ethers } from "ethers";
import { TOKENS } from "./TokenData"
import { toast } from "react-hot-toast";

const TokenFaucet = () => {
    const { address, isConnected } = useAccount();
    const [loading, setLoading] = useState(false);
    const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
    const [successModal, setSuccessModal] = useState(false);
    const [balance, setBalance] = useState<string>("0");

    const handleTokenSelect = (tokenSymbol: string) => {
        const token = TOKENS.find((t) => t.symbol === tokenSymbol);
        if (token) {
            setSelectedToken(token);
        }
    };

    const fetchBalance = async () => {
        if (!isConnected || !address){
            toast.error("Please Connect your wallet!");
            return;
        }
       
        try {
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const tokenABI = selectedToken.symbol === "USDC" ? USDC_ABI :
                selectedToken.symbol === "USDT" ? USDT_ABI :
                    DAI_ABI;
            const tokenAddress = selectedToken.symbol === "USDC" ? USDC_ADDRESS :
                selectedToken.symbol === "USDT" ? USDT_ADDRESS :
                    DAI_ADDRESS;

            const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
            const balance = await tokenContract.balanceOf(address);
            setBalance(parseFloat(ethers.formatUnits(balance, 18)).toFixed(2));
        } catch (error) {
            console.error("Failed to fetch balance:", error);
        }
    };

    useEffect(() => {
        if (isConnected) {
            fetchBalance();
        }
    }, [isConnected, address, selectedToken]);

    const handleMint = async () => {
        if (!isConnected || !address) {
            toast.error("Please Connect your wallet!");
            return;
        }

        try {
            setLoading(true);
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();

            let tokenAddress, tokenABI;
            switch (selectedToken.symbol) {
                case "USDC":
                    tokenAddress = USDC_ADDRESS;
                    tokenABI = USDC_ABI;
                    break;
                case "USDT":
                    tokenAddress = USDT_ADDRESS;
                    tokenABI = USDT_ABI;
                    break;
                case "DAI":
                    tokenAddress = DAI_ADDRESS;
                    tokenABI = DAI_ABI;
                    break;
                default:
                    throw new Error("Unsupported token");
            }

            const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
            const mintTx = await tokenContract.mint(userAddress, ethers.parseUnits("100", 18));
            await mintTx.wait();
            const approveTx = await tokenContract.approve(STABLECOINPAYMENT_ADDRESS, ethers.parseUnits("100", 18));
            await approveTx.wait();
            setSuccessModal(true);
        } catch (error) {
            console.error("Minting/Approval failed:", error);
            toast.error("Transaction failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white px-4 sm:px-6 py-10 mt-10">
            <div
                className={`relative bg-gray-900/80 backdrop-blur-lg border border-gray-700 ${selectedToken.cardGlow} shadow-2xl rounded-2xl p-6 sm:p-8 max-w-lg sm:max-w-md w-full text-center transition-all duration-300`}
            >
                <div className="grid grid-cols-3 gap-3 mb-5 w-full">
                    {TOKENS.map((token) => (
                        <button
                            key={token.symbol}
                            onClick={() => handleTokenSelect(token.symbol)}
                            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 ${selectedToken.symbol === token.symbol
                                    ? `${selectedToken.buttonColor} text-white border border-gray-400 shadow-lg scale-105`
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            <img src={token.imageUrl} alt={token.name} className="w-4 h-4 sm:w-5 sm:h-5" />
                            {token.name}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center space-y-3">
                    <img
                        src={selectedToken.imageUrl}
                        alt={selectedToken.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 transition-all duration-300"
                    />
                    <h2 className="text-2xl sm:text-3xl font-bold">{selectedToken.name} Faucet</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Claim free {selectedToken.symbol} tokens instantly!
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-gray-800/80 px-5 py-4 rounded-lg shadow-inner mt-5 items-center text-center">
                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-400" /> Price
                        </p>
                        <p className={`text-lg font-bold ${selectedToken.color}`}>
                            ${selectedToken.price}
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-yellow-400" /> Market Cap
                        </p>
                        <p className={`text-lg font-bold ${selectedToken.color}`}>
                            {selectedToken.marketCap}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800/80 px-5 py-4 rounded-lg shadow-inner mt-5">
                    <p className="text-gray-400 text-xs sm:text-sm">Your Balance</p>
                    <p className={`text-xl sm:text-2xl font-bold ${selectedToken.color}`}>
                        {balance} {selectedToken.symbol}
                    </p>
                </div>

                <button
                    onClick={handleMint}
                    disabled={loading || !isConnected}
                    className={`w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 ${selectedToken.buttonColor}`}
                >
                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Claim 100 {selectedToken.symbol}</>}
                </button>

                {!isConnected && (
                    <p className="text-gray-400 text-xs sm:text-sm mt-4 flex items-center justify-center gap-2 transition-all duration-300">
                        <Wallet className="w-5 h-5" /> Connect your wallet to claim.
                    </p>
                )}
            </div>

            {successModal && (
                <FaucetSuccessModal
                    amount="100"
                    token={selectedToken.symbol}
                    onClose={() => setSuccessModal(false)}
                />
            )}
        </div>
    );
};

export default TokenFaucet;
