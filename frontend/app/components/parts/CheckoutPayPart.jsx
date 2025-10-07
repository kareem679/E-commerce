"use client";
import CheckoutPaymentPart from "./CheckoutPaymentPart";
import AddToOrders from "@/app/views/Orders/AddToOrders";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const CheckoutPayPart = ({ setmycart, setisloading, mycart }) => {
  const [shoppingInfo, setshoppingInfo] = useState({
    fullname: "",
    address: "",
    phone: "",
    paymentMethod: "cash",
  });
  const [cartempty, setcartempty] = useState(false);
  useEffect(() => {
    if (!mycart || mycart.length === 0) {
      setcartempty(true);
    } else {
      setcartempty(false);
    }
  }, [mycart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisloading(true);

    const response = await AddToOrders({ shoppingInfo });
    if (response.success) {
      toast.success("Added To Order Successfully");
      setmycart([]);
    } else {
      toast.error(response.msg);
    }
    setisloading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <CheckoutPaymentPart
        shoppingInfo={shoppingInfo}
        setshoppingInfo={setshoppingInfo}
      />

      <button
        className="bg-green-500 text-white p-3 rounded-md mt-5 w-full"
        type="submit"
        disabled={cartempty}
      >
        Submit
      </button>
    </form>
  );
};

export default CheckoutPayPart;
