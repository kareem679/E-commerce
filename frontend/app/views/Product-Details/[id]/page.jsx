import ProductDetailsPart from "@/app/components/products/ProductDetailsPart"
import { OneProductAction } from "@/app/actions/ProductAction"

const Page = async ({ params }) => {
  const { id } = params

  const result = await OneProductAction({ id })

  if (!result.success) {
    return <p className="text-center mt-20 text-red-500">{result.message}</p>
  }

  const product = result.products

  return (
    <div>
      <ProductDetailsPart product={product} />
    </div>
  )
}

export default Page