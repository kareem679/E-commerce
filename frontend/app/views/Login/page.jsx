"use client";
import { AuthActionLogin } from "@/app/actions/AuthAction";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthProvider";

const initialState = { success: null, message: "" };

export default function LoginPage() {
  const { loginContext } = useContext(AuthContext);
  const [state, formAction, pending] = useActionState(AuthActionLogin, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        loginContext(state.user);
        toast.success(state.message);
        router.push("/")
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router, loginContext]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form action={formAction} className="space-y-4">
          <div className="mt-6">
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              className="block w-full p-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-indigo-500"
              type="email"
              placeholder="email"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              className="block w-full p-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-indigo-500"
              type="password"
              placeholder="••••••••"
              id="password"
              name="password"
              required
            />
          </div>

          <button
            disabled={pending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 mt-10 rounded-xl cursor-pointer transition"
            type="submit"
          >
            {pending ? "Logging in..." : "Login"}
          </button>

          {state?.message && (
            <p className="text-center text-sm text-yellow-700">{state.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
