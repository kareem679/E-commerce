"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import RemoveOrder from "@/app/views/Admin/RemoveOrder";
import UpdateOrder from "@/app/views/Admin/UpdateOrder";
import DeleteToOrderButton from "./buttons/DeleteToOrderButton";
import UpdateToOrderButton from "./buttons/UpdateToOrderButton";
import StatusPart from "../Admin/StatusPart";

const AdminButtons = ({ Order, setOrders }) => {
  const [status, setstatus] = useState(Order.status);
  const Order_Id = Order._id
  const handleStatus = (e) => {
    setstatus(e.target.value);
  };
  const handleRemove = async () => {
    const response = await RemoveOrder({ Order_Id });

    if (!response.success) {
      toast.error(response.msg);
    } else {
      setOrders((prev) => prev.filter((order) => order._id !== Order_Id));
      toast.success(response.msg);
    }
  };
  const handleUpdate = async () => {
    const response = await UpdateOrder({ Order_Id, status });

    if (!response.success) {
      toast.error(response.msg);
    } else {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === Order_Id ? { ...order, status } : order
        )
      );
      toast.success(response.msg);
    }
  };
  return (
    <div className="mt-4 flex gap-3">
      <UpdateToOrderButton handleUpdate={handleUpdate} />

      <StatusPart status={status} handleStatus={handleStatus} />

      <DeleteToOrderButton handleRemove={handleRemove} />
    </div>
  );
};

export default AdminButtons;
