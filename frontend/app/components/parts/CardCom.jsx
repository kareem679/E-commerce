import Image from "next/image"
import AddToCartButton from "./buttons/AddToCartButton"
import Link from "next/link"
const CardCom = ({product,setisloading}) => {
  return (
    <div className="border-gray-200 border-1  p-5 shadow-lg bg-white rounded-lg">
      
        <Link href={`/views/ProductInfo/${product._id}`}><Image src={`http://localhost:5000/${product.image}`} alt={product.name} width={310} height={250} /></Link>
        <div className="mt-5">
          <h3 className="text-2xl font-semibold">{product.name}</h3>
          <h2 className="text-green-500 font-semibold text-lg">{product.price}$</h2>
          <p className="text-lg text-gray-400">{product.description}</p>
          <AddToCartButton productId={product._id} setisloading={setisloading}/>
        </div>
    </div>
  )
}

export default CardCom