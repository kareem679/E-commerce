"use client";

import { useTransition } from "react";
import { UpdateCartAction } from "@/app/actions/CartAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NegativeQuantity = ({ itemId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNegative = () => {
    startTransition(async () => {
      const res = await UpdateCartAction({ id: itemId, quantity: -1 });

      if (res.success) {
        toast.success("Quantity decreased successfully!");
        router.refresh();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    });
  };

  return (
    <button
      onClick={handleNegative}
      disabled={isPending}
      className={`w-10 h-10 flex items-center justify-center rounded-lg text-2xl font-bold text-white transition-transform active:scale-95 cursor-pointer ${
        isPending
          ? "bg-red-400 cursor-wait"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {isPending ? "..." : "-"}
    </button>
  );
};

export default NegativeQuantity;