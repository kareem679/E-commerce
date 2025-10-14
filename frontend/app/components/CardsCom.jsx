"use client";
import CardCom from "./parts/CardCom";
import { useState } from "react";

const CardsCom = ({ res }) => {
  const [isloading, setisloading] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = res.data.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {isloading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 p-5 shadow-lg bg-white rounded-xl w-[310px] h-[400px]"
                >
                  <Skeleton height={250} />
                  <div className="mt-5 space-y-3">
                    <Skeleton width="70%" height={25} />
                    <Skeleton width="50%" height={20} />
                    <Skeleton count={2} />
                  </div>
                </div>
              ))
          : filteredProducts.map((product, index) => (
              <CardCom
                key={index}
                product={product}
                setisloading={setisloading}
                isloading={isloading}
              />
            ))}
      </div>
    </div>
  );
};

export default CardsCom;
