"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { StoreCartAction } from "@/app/actions/CartAction";

const AddToCartButton = ({ productId }) => {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const res = await StoreCartAction({ id: productId });

      if (res.success) {
        toast.success("Product added to cart!");
      } else {
        toast.error(res.message || "Failed to add to cart!");
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className={`${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"} bg-green-500 z-30 cursor-pointer text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300 active:scale-95`}>
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;