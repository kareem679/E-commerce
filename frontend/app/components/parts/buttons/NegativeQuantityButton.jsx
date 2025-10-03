"use client"
import NegitveQuantity from "@/app/views/Cart/NegitveQuantity"
import { ToastContainer,toast } from "react-toastify"
import { useRouter } from "next/navigation"
const NegativeQuantityButton = ({ product_id, Loading, setisloading }) => {

  const handleNegative = async () => {
    try {
      setisloading(true);

      const response = await NegitveQuantity({ product_id });

      if (response.success) {
        toast.success("Quantity decreased successfully");
        
        window.location.reload();
      } else {
        toast.error(response.msg || "Something went wrong");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setisloading(false);
    }
  };

  return (
    <button onClick={handleNegative}  disabled={Loading}className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50">-</button>
  )
}

export default NegativeQuantityButton
