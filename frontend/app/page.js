"use server"
import SwiperCom from "./components/SwiperCom";
import AllProducts from "./components/products/AllProducts";
import Refresh from "./components/parts/Refresh";

export default async function Home () {
 
  return (
    <>
    <Refresh/>
    <div className="relative ">
      <SwiperCom/>
    </div>
    <AllProducts/>
    </>
    
  );
}
