"use client"
import AddToCart from "../../AddToCart"
import { useState, useEffect } from "react"

import { ToastContainer,toast } from "react-toastify"

const AddToCartButton = ({ productId, setisloading, isloading }) => {
  const [token, setToken] = useState(null)
  const quantity = 1
  

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setToken(JSON.parse(storedUser).accessToken)
    }
  }, [])

  const handleAddToCart = async () => {
  if (!token) return toast.error("You must be logged in first!")

  setisloading(true)

  try {
    const response = await AddToCart({ productId, quantity, currentToken: token })

    if (response.newToken) {
      setToken(response.newToken) 
    }

    if (!response.success) {
      toast.error(response.msg)
    }else {
      toast.success( response.msg)
    }
  } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
  } finally {
    setisloading(false)
  }
}

  return (
    <>
    
    <button onClick={handleAddToCart} disabled={isloading || !token} className="py-2 px-5 rounded-lg mt-5 font-semibold cursor-pointer bg-yellow-500">
      {isloading ? "Adding..." : "Buy"}
    </button>
    </>

  )
}

export default AddToCartButton