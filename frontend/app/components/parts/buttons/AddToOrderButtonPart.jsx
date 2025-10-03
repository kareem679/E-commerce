"use client"
import { useState } from "react"
import AddToOrders from "@/app/views/Orders/AddToOrders"
import { useRouter } from "next/navigation"
import { ToastContainer,toast } from "react-toastify"

const AddToOrderButtonPart =  () => {
  const [loading, setLoading] = useState(false)
  const router =  useRouter() 
  const handleAddToOrders = async () => {
    const userStr = localStorage.getItem("user")


    const user = JSON.parse(userStr)
    const token = user.user_token
    
    if(!token){
        toast.error("you must logged in")
        return
    }
    
    setLoading(true)
    const res = await AddToOrders({token})
    setLoading(false)

    if (res.success) {
      toast.success("Cart add to Orders ✅ ")
    } else {
      toast.error(res.message)
    }
    router.push("/views/Orders")
  }
  return (
    <button onClick={handleAddToOrders} type="button" disabled={loading} className="w-full mt-4 cursor-pointer bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">Proceed To Checkout</button>
  )
}

export default AddToOrderButtonPart