"use server"
import { cookies } from "next/headers"
import { getFetch } from "../utils/fetch"
import { postFetch } from "../utils/fetch"
import { putFetch } from "../utils/fetch"
import { deleteFetch } from "../utils/fetch"


const AllCartAction = async () =>{

    const cookieStore = await cookies();
    const user_token = cookieStore.get("user_token");

    if (!user_token) {
        const error = "token problem"
        console.log(error)
        return {error}
    }
    const data = await getFetch({
        url:"cart/index",
        headers: {
            Authorization: `Bearer ${user_token.value}`,
        },
    })

    if(data.message === "success"){
        return {success:true,message: data.message,cart:data.cart,total:data.total}
    }else{
        return { success: false, message: data.message };
    }
}
// صح

const StoreCartAction = async ({id}) => {
    const cookieStore = await cookies();
    const user_token = cookieStore.get("user_token");

    if(!user_token){
        const error = "token problem"
        console.log(error)
        return {error}
    }
    const data = await  postFetch({
        url:`cart/store/${id}`,
        headers:{
            Authorization: `Bearer ${user_token.value}`
        }
    })

    if(data.status === "success"){
        return {success:true , message: data.message}
    }else{
        return {success:false,message:data.message}
    }
}
// صح

const UpdateCartAction = async ({ id, quantity }) => {
    const cookieStore = await cookies();
    const user_token = cookieStore.get("user_token");

    if (!user_token) {
        const error = "token problem";
        console.log(error);
        return { error };
    }

    const data = await putFetch({
        url: `cart/update/${id}`,
        headers: {
            Authorization: `Bearer ${user_token.value}`,
        },
        body: { quantity } 
    });

    if (data.status === "success") {
        return { success: true, message: data.message };
    } else {
        return { success: false, message: data.message };
    }
};
// صح

const DelteCartAction = async ({ id }) => {
    const cookieStore = await cookies();
    const user_token = cookieStore.get("user_token");

    if (!user_token) {
        const error = "token problem";
        console.log(error);
        return { error };
    }

    const data = await deleteFetch({
        url: `cart/destroy/${id}`,
        headers: {
            Authorization: `Bearer ${user_token.value}`,
        },
    });

    if (data.status === "success") {
        return { success: true, message: data.message };
    } else {
        return { success: false, message: data.message };
    }
};
// صح 


export {AllCartAction,StoreCartAction,UpdateCartAction,DelteCartAction}