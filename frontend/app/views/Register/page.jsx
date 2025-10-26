"use client";

import { AuthActionRegister } from "@/app/actions/AuthAction";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthProvider";
const initialState = { success: null, message: "" };

const page = () => {
  
  const [state, formAction, pending] = useActionState(
    AuthActionRegister,
    initialState
  );
  const {registerContext} = useContext(AuthContext)
  const router = useRouter();
  useEffect(() => {
    if (state.message) {
      if (state.success === true) {
        registerContext(state.user)
        router.push("/")
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form action={formAction} className="space-y-4">
          <div className="mt-6">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              name
            </label>
            <input
              className="block w-full p-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-indigo-500"
              name="name"
              type="text"
              placeholder="name"
              id="name"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              email
            </label>
            <input
              className="block w-full p-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-indigo-500"
              name="email"
              type="email"
              placeholder="email"
              id="email"
              required
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              password
            </label>
            <input
              className="block w-full p-3 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-indigo-500"
              name="password"
              type="password"
              placeholder="••••••••"
              id="password"
              required
            />
          </div>

          <button
            disabled={pending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 mt-10 rounded-xl transition"
            type="submit"
          >
            {pending ? "Register..." : "Register"}
          </button>

          {state?.message && (
            <p className="text-center text-sm text-yellow-700">
              {state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default page;
