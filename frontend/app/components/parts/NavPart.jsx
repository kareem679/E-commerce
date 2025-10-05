import Link from "next/link"

const NavPart = ({ userstate }) => {
  
  if (!userstate) {
    return (
      <ul className="flex justify-around">
        <li className="text-lg underline text-white font-semibold"><Link href="/">Home</Link></li>
        <li className="text-lg underline text-white font-semibold"><Link href="/views/Register">Register</Link></li>
        <li className="text-lg underline text-white font-semibold"><Link href="/views/Login">Login</Link></li>
      </ul>
    )
  }

  
  if (userstate.role === "admin") {
    return (
      <ul className="flex justify-around">
        <li className="text-lg underline text-white font-semibold"><Link href="/">Home</Link></li>
        <li className="text-lg underline text-white font-semibold"><Link href="/views/Products">Product</Link></li>
        <li className="text-lg underline text-white font-semibold"><Link href="/views/Cart">Cart</Link></li>
        <li className="text-lg underline text-white font-semibold"><Link href="/views/Orders">Orders</Link></li>
        <li className="text-lg underline text-white font-semibold"><Link href="/views/Admin">Admin</Link></li>
        <li className="text-lg underline text-white font-semibold"><Link href="/views/Logout">Logout</Link></li>
      </ul>
    )
  }

  
  return (
    <ul className="flex justify-around">
      <li className="text-lg underline text-white font-semibold"><Link href="/">Home</Link></li>
      <li className="text-lg underline text-white font-semibold"><Link href="/views/Products">Product</Link></li>
      <li className="text-lg underline text-white font-semibold"><Link href="/views/Cart">Cart</Link></li>
      <li className="text-lg underline text-white font-semibold"><Link href="/views/Orders">Orders</Link></li>
      <li className="text-lg underline text-white font-semibold"><Link href="/views/Logout">Logout</Link></li>
    </ul>
  )
}

export default NavPart
