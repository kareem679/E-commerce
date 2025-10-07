import Image from "next/image";
import AdminButtons from "../parts/AdminButtons";
const AdminCom = ({ order,setOrders }) => {
  return (
    <div className="p-6 border rounded-2xl shadow-md bg-white text-black">
      
      <div className="mb-4">
        <p className="font-semibold text-lg mb-1">Order ID: {order._id}</p>
        <p className="mb-1">
          Status: <span className="text-blue-600">{order.status}</span>
        </p>
        <p className="mb-1">
          Total Price:{" "}
          <span className="font-semibold">${order.totalPrice}</span>
        </p>
        <p className="mb-1">Full Name: {order.shoppingInfo?.fullname}</p>
        <p className="mb-1">Payment: {order.shoppingInfo?.paymentMethod}</p>
        <p className="mb-1">Address: {order.shoppingInfo?.address}</p>
        <p className="mb-1">Phone: {order.shoppingInfo?.phone}</p>
      </div>

      
      <div className="mt-3">
        <h3 className="font-semibold mb-2">Products:</h3>
        <ul className="space-y-2">
          {order.products?.map((item) => (
            <li
              key={item._id}
              className="border p-2 rounded-md flex items-center gap-4"
            >
              <Image 
                src={`http://localhost:5000/${item.productId?.image}`}
                alt={item.productId?.name}
                width={310} height={250}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.productId?.name}</p>
                <p>Price: ${item.productId?.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
        
     <AdminButtons Order = {order} setOrders={setOrders} />
      
    </div>
  );
};

export default AdminCom;
