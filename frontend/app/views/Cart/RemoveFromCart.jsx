


const RemoveFromCart = async ({accessToken,itemId}) => {
    try{
        let res = await fetch(`http://localhost:5000/api/cart/delete/${itemId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":`Bearer ${accessToken}`,
        }
    })
    
    let data = await res.json()

    if(res.status === 401){
        const Ref = await fetch("http://localhost:5000/api/users/refreshToken",{
            method:"POST",
            headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            },
            credentials:"include"
        })

        const RefData= await Ref.json() 

        if(Ref.ok){
            const user = JSON.parse(localStorage.getItem("user"));
            user.accessToken = RefData.accessToken;
            localStorage.setItem("user", JSON.stringify(user));
            const newToken = JSON.parse(localStorage.getItem("user"))?.accessToken;

            let res = await fetch(`http://localhost:5000/api/cart/delete/${itemId}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${newToken}`,
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            })

            data = await res.json()

            if(res.ok){
                return {success:true,msg:"remove successfully",data}
            }else{
                return {success:false,msg:"something went wrwong"}
            }
        }else{
            return {success:false,msg:"invaild Refresh"}
        }

    }else{
      if(res.ok){
        return {success:true,msg:"remove successfully"}
      }else{
        return {success:false,msg:data.msg || "something went wrong"}
      }
    }
    }catch(err){
        return {success:false,msg:"server error",details: err.message}
    }


} 

export default RemoveFromCart