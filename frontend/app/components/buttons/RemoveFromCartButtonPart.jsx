"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { DelteCartAction } from "@/app/actions/CartAction";
import { useRouter } from "next/navigation";

const RemoveFromCartButtonPart = ({ itemId }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();

  const handleremovefromcart = () => {
    startTransition(async () => {
      const res = await DelteCartAction({ id: itemId });
      if (res.success) {
        router.refresh()
        toast.success("Cart Deleted from cart!");
      } else {
        toast.error(res.message || "Failed to add to cart!");
      }
    });
  };

  return (
    <button
      className="text-red-500 cursor-pointer "
      onClick={handleremovefromcart}
      disabled={isPending}
    >
      {isPending ? "..." : "X"}
    </button>
  );
};

export default RemoveFromCartButtonPart;
