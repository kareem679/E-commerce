"use server"
import OrderPart from "@/app/components/parts/OrderPart"
import { UserOrderAction } from "@/app/actions/OrderAction"
import HeroCom from "@/app/components/HeroCom"
const page = async () => {

  const res = await UserOrderAction()

  return (

    <div>
      <HeroCom title="Orders"/>
     <div className="max-w-4xl mx-auto p-6 mt-20">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className=" space-y-10">
        {res?.message && res?.orders?.length > 0 ? (
          res.orders.map((item)=>(
            <OrderPart item={item} key={item.id} />
          ))
        ): (
          <p className="text-center py-20 text-4xl font-bold">No Orders </p>
        )}
    </div>

</div>
    </div>
  )
}

export default page


