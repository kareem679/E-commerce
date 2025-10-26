"use server"

import AllProducts from "@/app/components/products/AllProducts"
import HeroCom from "@/app/components/HeroCom"
const page =  () => {
  
 return(  
  <>
    <HeroCom title="Shop"/>
    <AllProducts/>
  </>

    
  )
}

export default page