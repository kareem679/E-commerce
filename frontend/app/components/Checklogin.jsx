"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Checklogin = () => {
  const router = useRouter()

  useEffect(() => {
    const userString = localStorage.getItem("user")

    if (!userString) {
      alert("you must login")
      router.push("/views/Login")
      return
    }

    try {
      const user = JSON.parse(userString)
      if (!user?.accessToken) {
        alert("you must login")
        router.push("/views/Login")
      }
    } catch (err) {
      console.error("Invalid user data", err)
      router.push("/views/Login")
    }
  }, [router])

  return <></>
}

export default Checklogin

