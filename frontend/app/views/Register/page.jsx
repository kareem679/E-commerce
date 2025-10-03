"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

import Checklogin from "@/app/components/Checklogin";
import Register from "@/app/views/Register/Register";
import Forminputpart from "@/app/components/parts/forms/Forminputpart";


export default function Home() {

  const [name,setname]= useState("")
  const [password,setpassword]=useState("")
  const [email,setemail] = useState("")
  const [isloading,setisloading] = useState(false)
  const [error,seterror] = useState("")

  const router = useRouter() 

  const handlesubmit = async (e)=>{



    e.preventDefault();
    setisloading(true)
    if(!name|| !password || !email){
      seterror("All inputs are required")
      setisloading(false)
      return
    }
    const response = await Register({name,password,email})
    
    if(!response.success){
      seterror(response.msg||"something went wrong")
    }else{
      seterror("")
      setemail("")
      setname("")
      setpassword("")
      router.push("/")
    }
    
        
  
    

    setisloading(false)
    
  }

  return (  
    <>
    <Checklogin/>
    {isloading ? (
      <p className="h-screen grid place-items-center text-3xl font-bold">Loading.....</p>
    ):(
      
      <div className="h-screen grid place-items-center">
        
      <form onSubmit={handlesubmit}  method="POST" className=" space-y-4 border-gray-300 border-1 w-full min-w-[350px] max-w-[500px] max-h-[600px] bg-white p-6 rounded shadow-md">
      <p className="text-lg text-red-600"> {error}</p>
        <Forminputpart name={name} setname={setname} setemail={setemail} email={email} setpassword={setpassword} password={password} isloading={isloading} />
        
        
      </form>

      
    </div>
    )}

    </>
    
  );
}
