import Header from "../components/Header";
import Footer from "../components/Footer";
import Faucets from "../components/Faucets/Faucets";

export default async function Page() {
  return (
    <div className="">
      <Header/>
      <Faucets />
      <Footer/>
    </div>
  );
}