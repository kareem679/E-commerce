

const Register = async ({name,email,password}) => {
    try{
        const res = await fetch("http://localhost:5000/api/users/register",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type": "application/json"
            },
            credentials:"include",
            body:JSON.stringify({name:String(name),email:String(email),password:String(password)})
        })
        const data = await res.json()
        if(!res.ok){
            return {success: false, msg:data.msg}
        }else{
            localStorage.setItem("user", JSON.stringify(data));
            return {success: true, msg:"Register successfully"}
        }
    }catch(err){
        return {success:false,msg:"server error",details: err.message}
    }

    

}

export default Register