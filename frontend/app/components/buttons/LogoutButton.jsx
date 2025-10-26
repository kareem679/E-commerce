"use client";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthProvider";
import { AuthActionLogout } from "@/app/actions/AuthAction";

const LogoutButton = () => {
  const {logoutContext} = useContext(AuthContext)

  const handleSubmit = async () => {
    try {
      const res = await AuthActionLogout(); 
      if (res.success) {
        logoutContext();
        toast.success("Logout successfuly");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  return (
    <button onClick={handleSubmit} className=" text-lg font-medium hover:text-teal-200 transition-colors cursor-pointer">
      Logout
    </button>
  );
};

export default LogoutButton;