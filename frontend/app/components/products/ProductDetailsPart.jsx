import AddToCartButton from "../buttons/AddToCartButton";
import Image from "next/image";
import HeroCom from "../HeroCom";

const ProductDetailsPart = ({ product }) => {
  return (
    <>
      <HeroCom title={`Product ${product.id}`} />
      <div className="flex justify-center gap-40 mt-10">
        <Image
          src={`http://127.0.0.1:8000${product.image}`}
          alt={product.title}
          width={500}
          height={500}
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">
            This is a placeholder description for {product.title}.
          </p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPart;
