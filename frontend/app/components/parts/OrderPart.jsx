import Image from "next/image";

const OrderPart = ({ item }) => {
  const statusColors = {
    pending: "text-yellow-600 bg-yellow-100",
    completed: "text-green-600 bg-green-100",
    canceled: "text-red-600 bg-red-100",
  };

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl shadow bg-white border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              Order #{item.id}
            </h2>

            <p
              className={`inline-block mt-1 px-2 py-1 text-sm font-medium rounded-lg ${
                statusColors[item.status] || "text-gray-700 bg-gray-100"
              }`}
            >
              {item.status.toUpperCase()}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg text-green-600">
              {item.total_price} EGP
            </p>
            <p className="text-sm text-gray-500">
              {item.payment_method === "cash" ? "Cash" : "Visa"}
            </p>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Full Name:</span> {item.full_name}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Phone:</span> {item.phone}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Address:</span> {item.governorate},{" "}
            {item.street}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {item.products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.title}
                  width={60}
                  height={60}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {product.pivot.quantity}
                  </p>
                </div>
              </div>

              <p className="font-medium text-gray-800">{product.price} EGP</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPart;
