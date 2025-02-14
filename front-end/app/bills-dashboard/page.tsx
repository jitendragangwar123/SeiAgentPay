import Header from "../components/Header";
import Footer from "../components/Footer";
import BillsDashboard from "../components/BillsDashboard/BillsDashboard";

export default async function Page() {
  return (
    <div className="">
      <Header/>
      <BillsDashboard />
      <Footer/>
    </div>
  );
}