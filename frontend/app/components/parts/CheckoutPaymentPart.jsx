"use client"
import { useState } from "react"
import Image from "next/image"
const CheckoutPaymentPart = () => {
    const [paymentMethod, setPaymentMethod] = useState("")
  return (
    <div>
          <div className="space-y-4 text-black">
            
            <label className={`flex items-center gap-3 cursor-pointer border p-3 rounded-lg transition ${
              paymentMethod === "visa" ? "border-green-600 bg-green-50" : "hover:border-green-500"}`}>

              <input type="radio" name="payment" value="visa" checked={paymentMethod === "visa"}  onChange={(e) => setPaymentMethod(e.target.value)} className="accent-green-600"/>
              <Image src="/visa.png" alt="Visa" width={70} height={30} />
            </label>

            
            <label className={`flex items-center gap-3 cursor-pointer border p-3 rounded-lg transition ${
              paymentMethod === "cash" ? "border-green-600 bg-green-50" : "hover:border-green-500"
            }`}>
              <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"}  onChange={(e) => setPaymentMethod(e.target.value)} className="accent-green-600"/>
              <h4 className="uppercase font-semibold">Pay Cash</h4>
            </label>
          </div>

          
          {paymentMethod === "visa" && (
            <div className={`space-y-4 mt-4 text-black overflow-hidden transition-all duration-500 ease-in-out ${paymentMethod === "visa" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>

              <input type="text" placeholder="Card Number" className="w-full transition-all duration-500 ease-in-out p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>

              <input type="text" placeholder="Expiry Date (MM/YY)" className="w-full transition-all duration-500 ease-in-out p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
              
              <input type="text" placeholder="CVV" className="w-full transition-all duration-500 ease-in-out p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
          )}
    </div>
  )
}

export default CheckoutPaymentPart