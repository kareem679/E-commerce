"use server"
import Image from "next/image";
import ManageProductButtons from "../buttons/ManageProductButtons/ManageProductButtons";
import ManageProductFormPart from "../parts/ManageProductFormPart";
const ManageProductCart = ({product}) => {



  return (
    <div className="card border p-4 rounded shadow-md w-80">
        <ManageProductFormPart/>

        <>
          <Image src={`http://127.0.0.1:8000${product.image}`} alt={product.title} width={500} height={500} className="w-full h-48 object-cover rounded mt-5"/>

          <h3 className="font-bold mt-2">{product.title}</h3>
          <p>{product.description}</p>
          <p className="font-semibold">${product.price}</p>

          <div className="flex gap-2 mt-2">
            <ManageProductButtons/>
          </div>
        </>
    </div>
  );
}

export default ManageProductCart