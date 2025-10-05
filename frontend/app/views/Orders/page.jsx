
import HeroCom from "@/app/components/HeroCom"
import OrderCom from "@/app/components/OrderCom"

const page = () => {
  return (
    <div>
      <HeroCom title="#Orders"/>

      <div>
        <OrderCom/>
      </div>

    </div>
  )
}

export default page