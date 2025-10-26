
"use client"
import AuthProvider from "./AuthProvider"

export default function AuthProviderWrapper({ children, user }) {
  return <AuthProvider user={user}>{children}</AuthProvider>
}