"use client"
import { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({ children, user: initialUser }) => {
  const [user, setUser] = useState(initialUser || null)
  const registerContext = (user)=>setUser(user)
  const loginContext = (user) => setUser(user)
  const logoutContext = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext, registerContext}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider