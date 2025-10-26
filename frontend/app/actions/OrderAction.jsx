"use server"
import { cookies } from "next/headers"
import { postFetch } from "../utils/fetch"
import { getFetch } from "../utils/fetch"
import { putFetch } from "../utils/fetch"
import { deleteFetch } from "../utils/fetch"



const UserOrderAction = async () =>{
    const cookieStore = await cookies()
    const user_token = cookieStore.get("user_token")

    if (!user_token) {
        const error = "token problem"
        console.log(error)
        return {error}
    }
    /* Get */

    const data = await getFetch({
        url:"orders/index",
        headers:{
            Authorization: `Bearer ${user_token.value}`,
        }
    })

    if(data.status === "success"){
        return {success:true,message:"Fetched successfully",orders:data.orders}
    }else{
        return {success:false,message:data.message }
    }

}
// صح 
const AddOrderAction = async (_,formData) =>{
    const full_name = formData.get("full_name")
    const phone = formData.get("phone")
    const governorate = formData.get("governorate")
    const street = formData.get("street")
    const payment_method = formData.get("payment_method")
     
    
    const cookieStore = await cookies()
    const user_token = cookieStore.get("user_token")

    if (!user_token) {
        const error = "token problem"
        console.log(error)
        return {error}
    }

    /* Post */
    const data = await postFetch({
        url:"orders/store",
        headers:{
            Authorization: `Bearer ${user_token.value}`
        },
        body:{full_name,payment_method,phone,governorate,street}
    })
    
    if(data.status === "success"){
        return {success:true,message:data.message}
    }else{
        return { success:false,message:data.message }
    }

}
// صح 



export {UserOrderAction,AddOrderAction}
