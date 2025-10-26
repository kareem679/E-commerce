"use server"
import Image from "next/image"
import RemoveFromCartButtonPart from "../buttons/RemoveFromCartButtonPart"
import NegativeQuantity from "../buttons/UpdateQuantity/NegitiveQuantity"
import PostiveQuantity from "../buttons/UpdateQuantity/PostiveQuantity"

const TableTrCom = ({item}) => {
  return (
       <tr>
            <td className="px-6 py-4 text-center">
              <Image src={`http://127.0.0.1:8000${item.image}`} alt="1234" width={200} height={200} className="mx-auto"/>
            </td>
            <td className="px-6 py-4 text-center text-2xl">{item.title}</td>
            <td className="px-6 py-4 text-center text-2xl">${item.price}</td>

            <td className="px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-4">
                <NegativeQuantity itemId={item.id} />
                <span className="text-2xl font-semibold text-gray-800 w-10 text-center">
                  {item.pivot.quantity}
                </span>
                <PostiveQuantity itemId={item.id} />
              </div>
            </td>
            
            <td className="px-6 py-4 text-center text-2xl "><RemoveFromCartButtonPart itemId={item.id}/></td>
        </tr>
  )
}

export default TableTrCom