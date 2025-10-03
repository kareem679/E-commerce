

const AddToOrders = async ({token}) => {
  try{
   const res = await fetch("http://127.0.0.1:8000/api/orders",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
      "Authorization":`Bearer ${token}`
    }
  })
  
  const data = await res.json()

  if(res.ok){
    return {success:true,data}
  }else{
    return {success:false,message:data.message}
  }
  }
  catch(err){
    return {success:false,message:"server error"}
  }

}

export default AddToOrders