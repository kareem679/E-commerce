import CardsCom from "@/app/components/CardsCom"
import HeroCom from "@/app/components/HeroCom"
import Checklogin from "@/app/components/Checklogin"

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



const page = async  () => {

  const res = await fetching()
  return (
    <div className="space-y-10">
      <Checklogin/>
      <HeroCom title="#Products"/>
      <CardsCom res={res} /> 
    </div>
  )
}

export default page