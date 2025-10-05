"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
const CheckAdmin = () => {

  const router = useRouter()

   useEffect(() => {
    const AdminMode = JSON.parse(localStorage.getItem("user"))?.role

    if (!AdminMode || AdminMode !== "admin" ) {
      alert("Get out thief")
      router.push("/")
      return
    }
  }, [router])

  return <></>
}

export default CheckAdmin