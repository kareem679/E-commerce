import { Geist} from "next/font/google";
import "./globals.css";
import NavCom from "./components/NavCom";
import { ToastContainer } from "react-toastify"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} text-white antialiased bg-gray-900`}>
        <ToastContainer/>
        <NavCom/>
        {children}
      </body>
    </html>
  );
}
