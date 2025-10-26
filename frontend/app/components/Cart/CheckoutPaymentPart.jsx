"use client";
import { useState } from "react";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { AddOrderAction } from "@/app/actions/OrderAction";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = { message: "", success: null };

const CheckoutPaymentPart = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [state, formAction, pending] = useActionState(AddOrderAction, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.push("/views/Orders");
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="full_name"
          required
          placeholder="Enter your full name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          required
          placeholder="Enter your phone number"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Governorate
        </label>
        <input
          type="text"
          name="governorate"
          required
          placeholder="Enter your governorate"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">Street</label>
        <input
          type="text"
          name="street"
          required
          placeholder="Enter your street"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="space-y-4">
        <label
          className={`flex items-center gap-3 cursor-pointer border p-3 rounded-lg transition ${
            paymentMethod === "visa"
              ? "border-green-600 bg-green-50"
              : "hover:border-green-500"
          }`}
        >
          <input
            type="radio"
            name="payment_method"
            value="visa"
            checked={paymentMethod === "visa"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="accent-green-600"
          />
          <Image src="/visa.png" alt="Visa" width={70} height={30} />
        </label>

        <label
          className={`flex items-center gap-3 cursor-pointer border p-3 rounded-lg transition ${
            paymentMethod === "cash"
              ? "border-green-600 bg-green-50"
              : "hover:border-green-500"
          }`}
        >
          <input
            type="radio"
            name="payment_method"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="accent-green-600"
          />
          <h4 className="uppercase font-semibold">Pay Cash</h4>
        </label>
      </div>

      {paymentMethod === "visa" && (
        <div
          className={`space-y-4 mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
            paymentMethod === "visa"
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}

      <button
        disabled={pending}
        className={`bg-green-500 text-white py-3 w-full text-md font-semibold rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-200 ${
          pending ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {pending ? "Processing..." : "Submit Order"}
      </button>
    </form>
  );
};

export default CheckoutPaymentPart;
