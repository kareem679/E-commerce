"use client"
import Cart from "./Cart"
import TableHeadPart from "@/app/components/parts/tables/TableHeadPart"
import HeroCom from "@/app/components/HeroCom"
import CheckoutCom from "@/app/components/CheckoutCom"
import TableTrCom from "@/app/components/parts/tables/TableTrPart"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Checklogin from "@/app/components/check/Checklogin"





const page = () => {

  

  const [mycart,setmycart] = useState([])
  const [err,seterror] = useState("")
  const [total,settotal] = useState(0)
  const [isloading,setisloading] = useState(false)
  const [subtotal,setsubtotal] = useState(10)

  const router = useRouter()
  useEffect(function(){
      setisloading(true)
      const userStr = localStorage.getItem("user")
      if(!userStr) return
      const user = JSON.parse(userStr)
      const accessToken = user.accessToken
      
     
      
      
    const fetchCart = async () => {
      const response = await Cart({accessToken})
      if (response.success) {
        setmycart(response.data.cart.products)   
      } else {
        seterror(response.msg) 
      }
    
    }

    fetchCart()

    setisloading(false)
  }, [])

  useEffect(function(){
    const newTotal = mycart.reduce((acc,item)=>{
      return acc + (item.productId.price * item.quantity)
    },0)
    settotal(newTotal + subtotal)
  },[mycart])

  return (
    <div >
      <Checklogin/>
      <HeroCom title="#Cart"/>
      
      {isloading ? (
        <p className="items-center text-center text-4xl font-bold my-32">loading....</p>
      ):(
        <>
        {mycart.length > 0 ? (
          <>
           
          <p className="text-3xl text-red-500 font-bold">{err}</p>
          <table className="w-full mt-10 items-center">


          <TableHeadPart/>
          <tbody>
          {mycart.map((item) => (
            <TableTrCom Loading={isloading} setisloading={setisloading} item={item} key={item._id}/>
          ))}
          </tbody>

        </table>

          
          </>
        ):(
          <>
             <p className="items-center text-center text-4xl font-bold my-13">your cart is empty</p>
            <Link href="/views/Products"><p className="items-center text-center text-2xl font-semibold underline text-blue-600 cursor-pointer my-13">add somthing</p> </Link>
          </>

        )}
        <CheckoutCom subtotal={subtotal} total={total}/>
        </>
      )}
      



    </div>
  )
}

export default page