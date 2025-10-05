
import Image from "next/image"
const CheckoutPaymentPart = ({shoppingInfo,setshoppingInfo}) => {
    
  return (
    <div>
          <div className="space-y-4 text-black">
            
            <label className={`flex items-center gap-3 cursor-pointer border p-3 rounded-lg transition ${
              shoppingInfo.paymentMethod === "visa" ? "border-green-600 bg-green-50" : "hover:border-green-500"}`}>

              <input type="radio" name="payment" value="visa" checked={shoppingInfo.paymentMethod === "visa"}  onChange={(e) => setshoppingInfo({...shoppingInfo,paymentMethod:e.target.value})} className="accent-green-600"/>
              <Image src="/visa.png" alt="Visa" width={70} height={30} />
            </label>

            
            <label className={`flex items-center gap-3 cursor-pointer border p-3 rounded-lg transition ${
              shoppingInfo.paymentMethod === "cash" ? "border-green-600 bg-green-50" : "hover:border-green-500"
            }`}>
              <input type="radio" name="payment" value="cash" checked={shoppingInfo.paymentMethod === "cash"}  onChange={(e) => setshoppingInfo({...shoppingInfo,paymentMethod:e.target.value})} className="accent-green-600"/>
              <h4 className="uppercase font-semibold">Pay Cash</h4>
            </label>
          </div>

          
          {shoppingInfo.paymentMethod === "visa" && (
            <div className={`space-y-4 mt-4 text-black overflow-hidden transition-all duration-500 ease-in-out ${shoppingInfo.paymentMethod === "visa" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>

              <input type="text" placeholder="Card Number" className="w-full transition-all duration-500 ease-in-out p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>

              <input type="text" placeholder="Expiry Date (MM/YY)" className="w-full transition-all duration-500 ease-in-out p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
              
              <input type="text" placeholder="CVV" className="w-full transition-all duration-500 ease-in-out p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
          )}

          <div className="space-y-5">
            <label>some Shopping Info</label>
            <input type="text" onChange={(e)=> setshoppingInfo({...shoppingInfo,fullname:e.target.value})} value={shoppingInfo.fullname} placeholder="fullName" className="w-full  transition-all duration-500 ease-in-out p-3 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input type="text" onChange={(e)=> setshoppingInfo({...shoppingInfo,address:e.target.value})} value={shoppingInfo.address} placeholder="address" className="w-full transition-all duration-500 ease-in-out p-3 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input type="tel" onChange={(e)=> setshoppingInfo({...shoppingInfo,phone:e.target.value})} value={shoppingInfo.phone} placeholder="phone" className="w-full transition-all duration-500 ease-in-out p-3 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            
          </div>

    </div>
  )
}

export default CheckoutPaymentPart