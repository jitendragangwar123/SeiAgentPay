"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { billsData } from "./Data";
import PaymentModal from "./PaymentModal";
import SuccessModal from "./SuccessModal";
import { toast } from "react-hot-toast";
import ChatBox from "../ChatBox";
import { MessageCircle } from 'lucide-react'
import { STABLECOINPAYMENT_ABI, STABLECOINPAYMENT_ADDRESS } from "../../../constant/index";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

function BillsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stablecoin, setStablecoin] = useState<string>("USDT");
  const [modalData, setModalData] = useState<{ conversionRate: string } | null>(null);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    async function fetchStablecoin() {
      try {
        const response = await fetch("https://47f3-34-172-233-23.ngrok-free.app/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: 109, merchant_category: "Healthcare", transaction_purpose: "Hospital Bill" }),
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setStablecoin(data.recommended_stablecoin || "USDT");
      } catch (error) {
        console.error("Failed to fetch stablecoin:", error);
      }
    }
    fetchStablecoin();
  }, []);

  const handlePayClick = () => {
    setModalData({
      conversionRate: `1 USD ≈ 1`,
    });
  };

  const handlePayment = async () => {
    if (!isConnected) {
      toast.error("Please Connect your wallet!");
      return;
    }
    if (!amount || !address) {
      toast.error("Please enter both amount and merchant address.");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(STABLECOINPAYMENT_ADDRESS, STABLECOINPAYMENT_ABI, signer);
      const amountInWei = ethers.parseUnits(amount, 18);
      const tx = await contract.payMerchant(address, stablecoin, amountInWei);
      await tx.wait();
      setIsSuccess(true);
      setModalData(null);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("An error occurred while processing the payment.");
    } finally {
      setLoading(false);
    }
  };


  const filteredBills = selectedCategory ? billsData.filter((bill) => bill.category === selectedCategory) : billsData;

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-950 text-white p-6 pt-20 mt-10">
      <h1 className="text-4xl font-bold mb-6 text-teal-400">💰 Bills Dashboard</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Array.from(new Set(billsData.map((bill) => bill.category))).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={clsx(
              "px-5 py-2 rounded-lg transition-all text-sm font-semibold shadow-md",
              selectedCategory === category ? "bg-teal-500 text-white shadow-lg scale-105" : "bg-gray-800 hover:bg-teal-600 text-gray-300"
            )}
          >
            {category}
          </button>
        ))}
        <button onClick={() => setSelectedCategory(null)} className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all shadow-md">
          Reset
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {filteredBills.map((bill, index) => (
          <div
            key={index}
            className="p-6 bg-transparent rounded-2xl shadow-lg border border-gray-700 transition-transform duration-200 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center"
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <bill.icon className={`h-12 w-12 ${bill.color} drop-shadow-md`} />
              <h2 className={`text-xl font-bold ${bill.color}`}>{bill.category}</h2>
            </div>
            <p className="text-gray-400 text-sm">{bill.purpose}</p>
            <button
              className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg"
              onClick={handlePayClick}
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>

      {modalData && (
        <PaymentModal
          stablecoin={stablecoin}
          amount={amount}
          address={address}
          setAmount={setAmount}
          setAddress={setAddress}
          setStablecoin={setStablecoin}
          conversionRate={modalData.conversionRate}
          onClose={() => setModalData(null)}
          onConfirmPayment={handlePayment}
          loading={loading}
        />
      )}

      {isSuccess && (
        <SuccessModal
          amount={amount}
          stablecoin={stablecoin}
          onClose={() => setIsSuccess(false)}
        />
      )}

      <button onClick={() => setIsChatOpen(!isChatOpen)} className="fixed bottom-8 right-8 bg-teal-400 hover:bg-teal-600 p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300">
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}

export default BillsDashboard;
