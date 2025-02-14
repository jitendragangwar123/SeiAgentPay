"use client";
import React, { useState } from "react";
import { stablecoinData } from "./Data";

interface PaymentModalProps {
    stablecoin: string;
    amount: string;
    address: string;
    setAmount: (amount: string) => void;
    setAddress: (address: string) => void;
    setStablecoin: (stablecoin: string) => void;
    conversionRate: string;
    onClose: () => void;
    onConfirmPayment: () => void;
    loading: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    stablecoin,
    amount,
    address,
    setAmount,
    setAddress,
    setStablecoin,
    conversionRate,
    onClose,
    onConfirmPayment,
    loading,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-lg">
            <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-white border border-gray-700 relative mt-20">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition" onClick={onClose}>
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-teal-400 flex justify-center items-center gap-2 mb-5">💳 Payment Details</h2>
                <div className="p-4 bg-gray-800 rounded-lg mb-5 border border-gray-700">
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>Conversion Rate:</span>
                        <span className="text-teal-400">{conversionRate} {stablecoin}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm mt-2">
                        <span>Recommended:</span>
                        <span className="text-teal-400 font-semibold">{stablecoin}</span>
                    </div>
                </div>
                <div className="mb-5">
                    <label className="text-gray-300 text-sm mb-1 block">Select Stablecoin</label>
                    <div className="relative">
                        <button className="bg-gray-800 p-3 rounded-lg text-white w-full flex items-center justify-between border border-gray-700 hover:bg-gray-700 transition" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <div className="flex items-center gap-2">
                                <img src={stablecoinData.find((item) => item.token === stablecoin)?.imageUrl} alt={stablecoin} className="w-6 h-6" />
                                <span className="text-gray-200 font-medium">{stablecoin}</span>
                            </div>
                            <span className="text-gray-400">▼</span>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-md max-h-40 overflow-auto border border-gray-700 z-10">
                                {stablecoinData.map((item) => (
                                    <div key={item.token} className="flex items-center gap-2 p-3 hover:bg-gray-700 cursor-pointer transition" onClick={() => { setStablecoin(item.token); setDropdownOpen(false); }}>
                                        <img src={item.imageUrl} alt={item.token} className="w-6 h-6" />
                                        <span className="text-gray-300 font-medium">{item.token}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-5">
                    <label className="text-gray-300 text-sm mb-1 block">Enter Amount</label>
                    <input type="number" className="bg-gray-800 p-3 rounded-lg text-white w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="text-gray-300 text-sm mb-1 block">Merchant Address</label>
                    <input type="text" className="bg-gray-800 p-3 rounded-lg text-white w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="Enter merchant address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="flex justify-center gap-3">
                    <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg transition border border-gray-600 text-white font-semibold" onClick={onClose}>Cancel</button>
                    <button className={`px-5 py-2 rounded-lg transition text-white font-semibold ${loading || !amount || !address ? "bg-gray-600 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-400"}`} onClick={onConfirmPayment} disabled={loading || !amount || !address}>
                        {loading ? "Processing..." : "Confirm Payment"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
