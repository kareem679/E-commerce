"use client";

import { useEffect, useState } from "react";
import showAllOrders from "./showAllOrders";
import HeroCom from "@/app/components/HeroCom";
import Checklogin from "@/app/components/check/Checklogin";
import Statistics from "@/app/components/Statistics";
import AdminMainCom from "@/app/components/Admin/AdminMainCom";
import { toast } from "react-toastify";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await showAllOrders();
      if (res.success) {
        setOrders(res.data);
      } else {
        toast.error(res.msg || "Failed to fetch orders");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <>
      <Checklogin />
      <HeroCom title="#Admin" />
      <Statistics orders={orders} />
      <AdminMainCom orders={orders} setOrders={setOrders} />
    </>
  );
};

export default Page;
