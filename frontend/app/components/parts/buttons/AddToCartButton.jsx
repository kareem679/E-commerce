"use client";
import { useRouter } from "next/navigation";
import AddToCart from "../../AddToCart";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

const AddToCartButton = ({ productId, setisloading, isloading }) => {
  const router = useRouter()
  const [token, setToken] = useState(null);
  const quantity = 1;

  const [isuser,setisuser] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setisuser(true)
      setToken(JSON.parse(storedUser).accessToken);
    }else{
      setisuser(false)
    }
  }, []);

  const handleAddToCart = async () => {
    if (!isuser) {
      
      router.push("/views/Login")
      return toast.error("You must be logged in first!");
      
    }
    

    setisloading(true);

    try {
      const response = await AddToCart({
        productId,
        quantity,
        currentToken: token,
      });

      if (response.newToken) {
        setToken(response.newToken);
      }

      if (!response.success) {
        toast.error(response.msg);
      } else {
        toast.success(response.msg);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setisloading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isloading }
        className="py-2 px-5 rounded-lg mt-5 font-semibold cursor-pointer bg-yellow-500"
      >
        {isloading ? "Adding..." : "Buy"}
      </button>
    </>
  );
};

export default AddToCartButton;
