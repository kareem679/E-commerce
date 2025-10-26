"use server";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../buttons/AddToCartButton";


const CardCom = ({ product }) => {
  return (
    <div className="group relative w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      <div className="w-full h-64  flex items-center justify-center overflow-hidden">
        <Link href={`/views/Product-Details/${product.id}`}>
          <Image
            src={`http://127.0.0.1:8000${product.image}`}
            alt={product.title}
            width={300}
            height={400}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="px-4 py-3 text-center flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-xl font-bold text-red-600 mt-1">${product.price}</p>
      </div>

      <div className="p-4 pt-0 flex justify-center">
        <AddToCartButton productId={product.id}/>
      </div>  

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
    </div>
  );
};

export default CardCom;
