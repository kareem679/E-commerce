"use client";


import AdminCom from "./AdminCom";

const AdminMainCom = ({ orders, setOrders }) => {
  if (!orders || orders.length === 0) {
    return <p className="text-center mt-6">No orders found.</p>;
  }

  return (
    <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <AdminCom key={order._id} order={order} setOrders={setOrders} />
      ))}
    </div>
  );
};

export default AdminMainCom;
