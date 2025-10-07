  "use client"
  import { useEffect, useState } from "react"
  import { useRouter } from "next/navigation"
  import Checklogin from "@/app/components/check/Checklogin"

  import Logout from "@/app/views/Logout/Logout"
  import { ToastContainer,toast } from "react-toastify"



  const page = () => {

    const router = useRouter()
    const [isloading,setisloading] = useState(false)
  useEffect(()=>{
    
    
    setisloading(true)
  
    const handlelogout = async () =>{
      const AccessToken = JSON.parse(localStorage.getItem("user"))?.accessToken
      const Response = await Logout(AccessToken)

      if(Response.success){
        toast.success(Response.msg)
      }else{
        toast.error(Response.msg)
      }
      router.push("/views/Login")
      
    }
    handlelogout()
    
  },[])
    return (
      <>
      <Checklogin/>
      {isloading ? (
        <p className="h-screen grid place-items-center text-black">Loading ...</p>
      ): (
        <div className="h-screen grid place-items-center">
          <p className="text-center">welcome from Logout...</p>
        </div>
      )}
      </>
    )
  }

  export default page