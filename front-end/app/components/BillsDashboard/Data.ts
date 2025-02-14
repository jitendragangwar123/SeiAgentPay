import { ShoppingCart, Lightbulb, Film, Home, Utensils, Package, Phone, Bus, HeartPulse, GraduationCap } from "lucide-react";

export const billsData = [
  { category: "Groceries", purpose: "Buying Food", icon: ShoppingCart, color: "text-yellow-400" },
  { category: "Utilities", purpose: "Paying Electricity Bill", icon: Lightbulb, color: "text-blue-400" },
  { category: "Entertainment", purpose: "Movie Tickets", icon: Film, color: "text-pink-400" },
  { category: "Rent", purpose: "Monthly Rent", icon: Home, color: "text-green-400" },
  { category: "Dining", purpose: "Restaurant", icon: Utensils, color: "text-red-400" },
  { category: "Online Shopping", purpose: "Amazon Purchase", icon: Package, color: "text-purple-400" },
  { category: "Bills", purpose: "Phone Bill", icon: Phone, color: "text-teal-400" },
  { category: "Transport", purpose: "Taxi Fare", icon: Bus, color: "text-orange-400" },
  { category: "Healthcare", purpose: "Hospital Bill", icon: HeartPulse, color: "text-red-500" },
  { category: "Education", purpose: "College Fees", icon: GraduationCap, color: "text-indigo-400" },
];

export const stablecoinData = [
  { token: "USDT", imageUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=034" },
  { token: "USDC", imageUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=034" },
  { token: "DAI", imageUrl: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=034" },
];
