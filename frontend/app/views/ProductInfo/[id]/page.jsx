
"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import HeroCom from "@/app/components/HeroCom"
import AddToCartButton from "@/app/components/parts/buttons/AddToCartButton"
const page = () => {
 const params = useParams()  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${params.id}`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.msg || "Failed to fetch product")

        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  

  return (
<>
<HeroCom title="#ProductInfo"/>
<div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md my-10">
  
  {loading && <p className="text-center text-gray-500">Loading product...</p>}
  {error && <p className="text-red-500 text-center">{error}</p>}

  {product && (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0">
        <Image src={`http://localhost:5000/${product.image}`} alt={product.name} width={400} height={300} className="rounded-lg object-cover"/>
      </div>

      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
        <p className="text-gray-600 mb-4">Stock: {product.stock}</p>

        <AddToCartButton productId={product._id} setisloading={setLoading} />
      </div>
    </div>
  )}
</div>
</>

  )
}

export default page