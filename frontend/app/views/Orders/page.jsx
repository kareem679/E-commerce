"use server"

import Checklogin from "@/app/components/check/Checklogin"
import HeroCom from "@/app/components/HeroCom"
import OrderCom from "@/app/components/OrderCom"


const page = () => {
  return (
    <div>
      <Checklogin/>
      <HeroCom title="#Orders"/>

      <div>
        
        <OrderCom/>
      </div>

    </div>
  )
}

export default page