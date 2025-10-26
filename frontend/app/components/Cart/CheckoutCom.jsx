"use server"

import CheckoutPaymentPart from "./CheckoutPaymentPart"

const CheckoutCom = ({total,subtotal}) => {
  return (
    <div>
        <div className="flex justify-center w-full p-12">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6">
    
          <h1 className="text-2xl font-semibold text-gray-800 border-b pb-3">Cart Total</h1>

          <div className="flex justify-between text-gray-600">
            <h5>SubTotal</h5>
            <strong className="text-gray-900">${subtotal}</strong>
          </div>

          <div className="flex justify-between text-lg font-medium text-gray-800">
            <h5>Total</h5>
            <strong className="text-green-600">${total}</strong>
          </div>


          <CheckoutPaymentPart total={total}/>

          
        </div>
      </div>
    </div>
  )
}

export default CheckoutCom