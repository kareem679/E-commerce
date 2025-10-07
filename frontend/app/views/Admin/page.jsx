"use client";
import { useState, useEffect } from "react";
import AdminCom from "@/app/components/Admin/AdminCom";
import showAllOrders from "./showAllOrders";
import HeroCom from "@/app/components/HeroCom";
import Checklogin from "@/app/components/check/Checklogin";
const page = () => {
  const [orders, setOrders] = useState([]);

useEffect(() => {
  const fetchOrders = async () => {
    const res = await showAllOrders();
    if (res.success) {
      setOrders(res.data); 
    } else {
      console.error("Failed to fetch orders:", res.msg);
    }
  };
  fetchOrders();
}, []);

  return (
    <>
      <Checklogin/>
      <HeroCom title="#Admin" />
      <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {orders.length > 0 ? (
          orders.map((order) => <AdminCom key={order._id} order={order} setOrders={setOrders}/>)
        ) : (
          <p>Loading orders...</p>
        )}
      </div>
    </>
  );
};

export default page;