"use client";
import { toast } from "react-toastify";
import { useTransition, useState } from "react";
import {
  DeleteOrderAction,
  UpdateOrderAction,
} from "@/app/actions/AdminAction";
import { useRouter } from "next/navigation";

const ManagePanelButtons = ({ id }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("");

  const handleDelete = () => {
    startTransition(async () => {
      const res = await DeleteOrderAction({ id });  
      if (res.success){
        router.refresh();
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
    });
  };

  const handleUpdate = () => {
    if (!status) {
      toast("Please select a status first");
      return;
    }

    startTransition(async () => {
      const res = await UpdateOrderAction({ id, status });
      if (res.success){
        router.refresh();
        toast.success(res.message)
      }else{
        toast.error(res.message)
      }
    });
  };

  return (
    <div className="flex justify-between">
      <div className="flex justify-around  gap-5">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={isPending}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">Select status</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={handleUpdate}
          disabled={isPending}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 active:bg-blue-400 disabled:opacity-60"
        >
          {isPending ? "..." : "Update"}
        </button>
      </div>

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:bg-red-400 disabled:opacity-60"
      >
        {isPending ? "..." : "Delete"}
      </button>
    </div>
  );
};

export default ManagePanelButtons;
