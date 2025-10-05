"use client"
import RemoveFromCart from "@/app/views/Cart/RemoveFromCart"
import { useState } from "react"
import { ToastContainer,toast } from "react-toastify"


const RemoveFromCartButtonPart = ({itemId,setisloading,Loading}) => {


  

  const handleRemoveFromCart = async () =>{
    setisloading(true)
    const usrStr = localStorage.getItem("user")
    const user = JSON.parse(usrStr)
    const accessToken = user.accessToken
    if(!accessToken){
      toast.error("you must logged in")
      return
    }

    
    const response = await RemoveFromCart({accessToken,itemId})
    
    if(response.success){
      toast.success("removed")
      setTimeout(() => {
        window.location.href = "http://localhost:3000/views/Cart"
      }, 1000) 
    }else{
      if(response.msg !="server error"){
        toast.error("item not found")
      }else{
        toast.error(response.msg)
      }
    }

    setisloading(false)
  }

  return (
     <button className="text-red-500 cursor-pointer " onClick={handleRemoveFromCart} disabled={Loading}>{Loading ? "..." : "X"}</button>
  )
}

export default RemoveFromCartButtonPart