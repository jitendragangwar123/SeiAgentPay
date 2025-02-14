"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Zap, ShieldCheck, Banknote, Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-900 text-white">
      <Header />

      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-10 text-center sm:px-12 lg:px-24 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent animate-pulse-slow"></div>
          <div className="absolute top-32 left-1/3 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-1/3 w-48 h-48 sm:w-96 sm:h-96 bg-pink-500/30 rounded-full blur-3xl animate-float delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-4 sm:px-0">
          <Image className="mx-auto drop-shadow-lg" src="/logo.png" alt="logo" width={200} height={200} priority />
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold text-transparent bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text animate-slide-up">
            Smart. Secure. Seamless.
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 animate-slide-up delay-200">
            Empowering Merchants and Consumers with AI-Driven Crypto Payments for a Frictionless Financial Future
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6 animate-slide-up delay-400">
            <Link href="/bills-dashboard">
              <button className="px-8 sm:px-10 py-3 sm:py-4 font-semibold text-white transition-transform duration-300 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl hover:scale-105 hover:shadow-lg">
                Pay Bills
              </button>
            </Link>
            <Link href="https://github.com/jitendragangwar123/SeiAgentPay">
              <button className="px-8 sm:px-10 py-3 sm:py-4 font-semibold text-white transition-transform duration-300 border border-blue-400 rounded-xl hover:bg-blue-500/20 hover:scale-105">
                Learn More →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-center py-16 px-6 sm:px-12 lg:px-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Why Choose SeiAgentX?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
          {[{
            title: "AI-Driven Transactions", desc: "Experience ultra-fast payments powered by AI automation.", icon: Zap, color: "from-purple-700 to-purple-900 border-purple-500/50", text: "text-yellow-400"
          }, {
            title: "Decentralized Security", desc: "Built on Sei Network, ensuring trustless and secure transactions.", icon: ShieldCheck, color: "from-blue-700 to-blue-900 border-blue-500/50", text: "text-green-400"
          }, {
            title: "Seamless Fiat Integration", desc: "Easily swap and process payments between crypto and fiat.", icon: Banknote, color: "from-teal-700 to-teal-900 border-teal-500/50", text: "text-orange-400"
          }, {
            title: "Global Accessibility", desc: "Borderless payments with instant access worldwide.", icon: Globe, color: "from-red-700 to-red-900 border-red-500/50", text: "text-blue-400"
          }].map(({ title, desc, icon: Icon, color, text }, index) => (
            <div key={index} className={`bg-gradient-to-br ${color} p-6 sm:p-8 rounded-2xl border backdrop-blur-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg w-full sm:w-64`}> 
              <div className="flex items-center justify-center mb-4">
                <Icon className={`h-10 w-10 sm:h-12 sm:w-12 ${text}`} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
