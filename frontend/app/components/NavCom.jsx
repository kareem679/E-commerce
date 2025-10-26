"use client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";

const NavCom = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-teal-700 to-teal-900/50 backdrop-blur-md shadow-lg py-2">
      <div className="flex items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-teal-200 transition">
          MyStore
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className="text-lg font-medium hover:text-teal-200 transition-colors">Home</Link>
          </li>

          {!user && (
            <>
              <li>
                <Link href="/views/Register" className="text-lg font-medium hover:text-teal-200 transition-colors">Register</Link>
              </li>
              <li>
                <Link href="/views/Login" className="text-lg font-medium hover:text-teal-200 transition-colors">Login</Link>
              </li>
            </>
          )}

          {user?.roles === "user" && (
            <>
              <li>
                <Link href="/views/Shop" className="text-lg font-medium hover:text-teal-200 transition-colors">Shop</Link>
              </li>
              <li>
                <Link href="/views/Cart" className="text-lg font-medium hover:text-teal-200 transition-colors">Cart</Link>
              </li>
            </>
          )}

          {user?.roles === "admin" && (
            <>
              <li>
                <Link href="/views/Admin/ManagePanel" className="text-lg font-medium hover:text-teal-200 transition-colors">Admin Panel</Link>
              </li>
              <li>
                <Link href="/views/Admin/ManageProducts" className="text-lg font-medium hover:text-teal-200 transition-colors">Manage Products</Link>
              </li>
            </>
          )}

          {user && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavCom;
