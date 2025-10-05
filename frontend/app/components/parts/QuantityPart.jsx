import NegativeQuantityButton from "./buttons/NegativeQuantityButton"
import PostiveQuantityButton from "./buttons/PostiveQuantityButton"

const QuantityPart = ({ item, Loading, setisloading }) => {
  return (
    <td className="px-6 py-4 text-center text-2xl">
      <div className="flex items-center justify-center gap-3">
        
        <NegativeQuantityButton
          Loading={Loading}
          setisloading={setisloading}
          product_id={item.productId._id}
        />

        
        <span className="min-w-[40px] text-center font-bold">
          {item.quantity}
        </span>

        
        <PostiveQuantityButton
          Loading={Loading}
          setisloading={setisloading}
          product_id={item.productId._id}
        />
      </div>
    </td>
  )
}

export default QuantityPart