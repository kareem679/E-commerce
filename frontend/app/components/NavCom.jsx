"use client"


import { useState, useEffect } from "react"
import NavPart from "./parts/NavPart"

const NavCom = () => {
  const [userstate, setuserstate] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setuserstate(user)
  }, []) 

  return (
    <nav className="fixed bg-gray-900/30  top-0 w-full p-5 backdrop-blur-md">
      <NavPart userstate={userstate} />
    </nav>
  )
}

export default NavCom