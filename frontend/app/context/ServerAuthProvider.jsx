"use server"
import AuthProviderWrapper from "../context/AuthProviderWrapper"
import { AuthActionMe } from "../actions/AuthAction"

export default async function ServerAuthProvider({ children }) {
  const data = await AuthActionMe()
  const user = data.user || null

  return <AuthProviderWrapper user={user}>{children}</AuthProviderWrapper>
}