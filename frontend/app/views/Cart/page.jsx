"use server";
import HeroCom from "@/app/components/HeroCom";
import { AllCartAction } from "@/app/actions/CartAction";
import CheckoutCom from "@/app/components/Cart/CheckoutCom";
import TableTrCom from "@/app/components/Cart/TableTrCom";

const page = async () => {
  const res = await AllCartAction();
  return (
    <>
      <HeroCom title="Cart" showOrdersLink />
      <table className="w-full mt-10 items-center">
        <thead className="border-b">
          <tr>
            <th className="text-2xl">Image</th>
            <th className="text-2xl">Title</th>
            <th className="text-2xl">Price</th>
            <th className="text-2xl">Quantity</th>
            <th className="text-2xl">Remove</th>
          </tr>
        </thead>

        <tbody>
          {res?.success && res?.cart?.length > 0 ? (
            res.cart.map((item) => <TableTrCom item={item} key={item.id} />)
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-20 text-4xl font-bold" >
               🛒 Cart is empty 😅
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CheckoutCom subtotal={10} total={res.total} />
    </>
  );
};

export default page;
