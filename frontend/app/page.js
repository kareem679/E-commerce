import CardsCom from "./components/CardsCom"
import SwiperCom from "./components/SwiperCom"

const fetching = async () =>{
  try{
    const res = await fetch("http://localhost:5000/api/products", { cache: "no-store" }) 
    const data = await res.json()

    if(res.ok){
      return { data, message: "" }
    } else {
      return { data: [], message: "error" }
    }
  }catch(err){
    return { data: [], message: "error" }
  }
}

const page = async () => {
  const res = await fetching()
  return (
    <div>
      <div className="relative ">
        <SwiperCom/>
      </div>
      <div className="my-30">
        <h1 className="text-4xl text-white font-bold text-center my-15">Products</h1>
        <CardsCom res={res}/>
      </div>

    </div>
  )
}

export default page