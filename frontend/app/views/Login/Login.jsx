

const Login = async ({email,password}) => {
    try{
        const res = await fetch("http://localhost:5000/api/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
            },
            credentials:"include",
            body:JSON.stringify({email:String(email),password: String(password)})
        })
        
        const data = await res.json()

        if(!res.ok){
            return { success: false, msg: data?.errors?.[0]?.msg || data?.msg || "Something went wrong" };
        }else{
            localStorage.setItem("user", JSON.stringify(data));
            return {success: true, msg:"Login successfully"}
        }
        
    }catch(err){
        return {success:false,msg:"server error",details: err.message} 
    } 
}

export default Login