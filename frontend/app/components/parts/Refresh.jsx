"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Refresh = () => {
    const router = useRouter()
    useEffect(()=>{
        router.refresh()
    },[router])
  return null
}

export default Refresh