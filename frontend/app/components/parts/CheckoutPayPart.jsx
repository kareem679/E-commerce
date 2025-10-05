"use client"
import CheckoutPaymentPart from "./CheckoutPaymentPart"
import AddToOrders from "@/app/views/Orders/AddToOrders"
import { useState } from "react"
import { toast } from "react-toastify"
const CheckoutPayPart = () => {

    const [shoppingInfo,setshoppingInfo]= useState({fullname:"",address:"",phone:"",paymentMethod:"cash"})
    
    const [loading,setloading] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setloading(true)

        const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken
        if(!accessToken){
            toast.error("User not authenticated")
            setloading(false)
            return
        }
        
        const response = await AddToOrders({accessToken,shoppingInfo})
        if(response.success){
            toast.success("Added To Order Successfully")
        }else{
            toast.error(response.msg) 
        }
        setloading(false)
    }

  return (



    <form onSubmit={handleSubmit} className="space-y-5">
        <CheckoutPaymentPart shoppingInfo={shoppingInfo} setshoppingInfo={setshoppingInfo}/>

        <button className="bg-green-500 text-white p-3 rounded-md mt-5 w-full" type='submit' disabled={loading}>{loading ? "Loading...":"Submit"}</button>
    </form>
  )
}

export default CheckoutPayPart