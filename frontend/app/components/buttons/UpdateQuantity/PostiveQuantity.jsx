"use client";

import { useTransition } from "react";

import { UpdateCartAction } from "@/app/actions/CartAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PostiveQuantity = ({itemId}) => {
  const router = useRouter()
  const [isPending,startTransition] = useTransition()

  const handlePostive = ()=>{
    startTransition(async ()=>{
      const res = await UpdateCartAction({id:itemId,quantity:1})

      if(res.success){
        toast.success(res.message)
        router.refresh()
      }else{
        toast.error(res.message)
      }
    })
  }

  return (
    <button disabled={isPending} onClick={handlePostive} className="bg-green-600 hover:bg-green-700 text-white w-10 h-10 rounded-lg text-2xl font-bold transition-transform active:scale-95 cursor-pointer">
      {isPending? "...": "+"}
    </button>
  );
};

export default PostiveQuantity;
