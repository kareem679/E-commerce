"use client";
import PostiveQuantity from "@/app/views/Cart/PostiveQuantity";
import { ToastContainer, toast } from "react-toastify";

const PostiveQuantityButton = ({
  product_id,
  Loading,
  setisloading,
  setmycart,
}) => {
  const handlePostive = async () => {
    try {
      setisloading(true);

      const response = await PostiveQuantity({ product_id });

      if (response.success) {
        toast.success("Quantity increased successfully");

        setmycart(prev => prev.map(item =>
          item.productId._id === product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
          ));
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
      onClick={handlePostive}
      disabled={Loading}
      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
    >
      +
    </button>
  );
};

export default PostiveQuantityButton;
