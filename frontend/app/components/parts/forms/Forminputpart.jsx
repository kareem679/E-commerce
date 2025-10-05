import Link from "next/link"


const Forminputpart = ({name,setname,setemail,email,setpassword,password,isloading}) => {
  return (
    <>
        <h1 className="text-center text-2xl font-bold my-5 text-black ">Register</h1>
        <div className="space-y-10">
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="text">name</label>
          <input required onChange={(e)=> setname(e.target.value)} value={name}  className="p-2 w-full bg-gray-100 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="name" type="text" id="text"  />

          <label className="block mb-1 font-semibold text-gray-700" htmlFor="email">Email</label>
          <input required onChange={(e)=> setemail(e.target.value)} value={email}   className="p-2 w-full bg-gray-100 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" type="email" id="email" />

          <label className="block mb-1 font-semibold text-gray-700" htmlFor="password">password</label>
          <input  required onChange={(e)=> setpassword(e.target.value)} value={password} className="p-2 w-full bg-gray-100 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="password" type="password" id="password" />

          <input disabled={isloading} className="p-2 mt-10 text-lg font-bold w-full bg-gray-100 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="submit" type="submit" id="submit" />
        </div>
        

        <h3 className="text-blue-600 underline "><Link href="/views/Login">Have Account Before</Link></h3>
    </>
  )
}

export default Forminputpart