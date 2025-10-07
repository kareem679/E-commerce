"use client";
import NegitveQuantity from "@/app/views/Cart/NegitveQuantity";
import {  toast } from "react-toastify";

const NegativeQuantityButton = ({
  product_id,
  Loading,
  setisloading,
  setmycart,
}) => {
  const handleNegative = async () => {
    try {
      setisloading(true);

      const response = await NegitveQuantity({ product_id });

      if (response.success) {
        toast.success("Quantity decreased successfully");

        setmycart((prev) =>
          prev
            .map((item) =>
              item.productId._id === product_id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
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
    <button
      onClick={handleNegative}
      disabled={Loading}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      -
    </button>
  );
};

export default NegativeQuantityButton;
