"use server"

import { getFetch } from "../utils/fetch"



const AllProductAction = async () =>{

    const data = await getFetch({
        url:"product/index",
    })

    if(data.status === "success"){
        return {success:true,message: data.message, products: data.products}
    }else{
        return { success: false, message: data.message };
    }
}
const OneProductAction = async ({id}) =>{

    const data = await getFetch({
        url:`product/show/${id}`,
    })

    if(data.status === "success"){
        return {success:true,message: data.message, products: data.product}
    }else{
        return { success: false, message: data.message };
    }
}



export {AllProductAction,OneProductAction}