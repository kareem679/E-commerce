"use server"
import { AllProductAction } from "@/app/actions/ProductAction"
import CardCom from "./CardCom"

const AllProducts = async  () => {
    
    const res = await AllProductAction()
  return (
    <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-15 my-15">
        {res.products.map((product)=>(
            <CardCom key={product.id} product={product}/>
        ))}
    </ul>
  )
}

export default AllProducts