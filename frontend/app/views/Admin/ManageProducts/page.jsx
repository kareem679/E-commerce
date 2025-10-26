"use server";

import HeroCom from "@/app/components/HeroCom";
import ManageProductCart from "@/app/components/products/ManageProductCart";

import { AllProductAction } from "@/app/actions/ProductAction";

const ManageProductsPage = async () => {
  const res = await AllProductAction();

  return (
    <div>
      <HeroCom title="Manage Products" />

      {res?.success && res?.products?.length > 0 ? (
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-15 my-15">
          {res.products.map((product) => (
            <ManageProductCart product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p>No Products</p>
      )}
      
    </div>
  );
};

export default ManageProductsPage;
