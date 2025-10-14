"use client";
import { useEffect, useState } from "react";
import Order from "../views/Orders/Order";
import { toast } from "react-toastify";

const OrderCom = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.accessToken;

        if (!token) {
          setError("User not authenticated");
          toast.error("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await Order({ accessToken: token });
        if (response.success) {
          setOrders(response.data);
        } else {
          setError(response.msg);
          toast.error(response.msg);
        }
      } catch (err) {
        setError("Something went wrong");
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-center mt-5">Loading orders...</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center my-20">Your Orders</h1>
          <div className=" grid grid-cols-1 lg:grid-cols-3 mt-8 space-y-6 gap-5">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="p-4 border rounded-xl shadow">
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p>
                    Status:{" "}
                    <span className="text-blue-600">{order.status}</span>
                  </p>
                  <p>
                    Total Price:{" "}
                    <span className="font-semibold">${order.totalPrice}</span>
                  </p>
                  <p>Payment: {order.shoppingInfo.paymentMethod}</p>
                  <p>Address: {order.shoppingInfo.address}</p>
                  <p>Phone: {order.shoppingInfo.phone}</p>

                  <div className="mt-3">
                    <h3 className="font-semibold mb-2">Products:</h3>
                    <ul className="space-y-1">
                      {order.products.map((item) => (
                        <li key={item._id} className="border p-2 rounded-md">
                          <p>Name: {item.productId.name}</p>
                          <p>Price: ${item.productId.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderCom;
