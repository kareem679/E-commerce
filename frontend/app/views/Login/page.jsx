"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import FormInputLoginpart from "@/app/components/parts/forms/FormInputLoginpart"
import Login from "@/app/views/Login/Login"


const page = () => {

  const [isloading,setisloading] = useState(false);
  const [email,setemail] = useState("")
  const [password,setpassword]= useState("")
  const [error,seterror] = useState("")

  const router = useRouter()

  const handlesubmit = async (e) =>{
    e.preventDefault()
    setisloading(true)

    if(!email || !password){
      seterror("All inputs are required")
      setisloading(false)
      return
    }
    const response = await Login({email,password})

    if(!response.success){
      seterror(response.msg||"something went wrong")
    }else{
      seterror("")
      setemail("")
      setpassword("")
      router.push("/")
    }

    setisloading(false)
  }
  
  return (
    <>
    
    {isloading ? (
      <p className="h-screen grid place-items-center text-3xl font-bold">Loading.....</p>
    ):(
      
      <div className="h-screen grid place-items-center">
        
      <form onSubmit={handlesubmit}  method="POST" className=" space-y-4 border-gray-300 border-1 w-full min-w-[350px] max-w-[500px] max-h-[600px] bg-white p-6 rounded shadow-md">
      <p className="text-lg text-red-600"> {error}</p>
        <FormInputLoginpart setemail={setemail} email={email} setpassword={setpassword} password={password} isloading={isloading} />
        
        
      </form>

      
    </div>
    )}

    </>
  )
}

export default page