import Image from "next/image"
import RemoveFromCartButtonPart from "../buttons/RemoveFromCartButtonPart"
import QuantityPart from "../QuantityPart"
const TableTrCom = ({item,setisloading,Loading}) => {
  return (
       <tr>
            <td className="px-6 py-4 text-center">
              <Image src={`http://localhost:5000/${item.productId.image}`} alt="1234" width={200} height={200} className="mx-auto"/>
            </td>
            <td className="px-6 py-4 text-center text-2xl">{item.productId.name}</td>
            <td className="px-6 py-4 text-center text-2xl">${item.productId.price * item.quantity}</td>
            <QuantityPart item={item} Loading={Loading} setisloading={setisloading}/>
            <td className="px-6 py-4 text-center text-2xl "><RemoveFromCartButtonPart Loading={Loading} setisloading={setisloading} itemId={item.productId._id}/></td>
        </tr>
  )
}

export default TableTrCom