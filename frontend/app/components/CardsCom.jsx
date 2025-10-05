"use client"
import CardCom from "./parts/CardCom"
import { useState } from "react"


const CardsCom = ({res}) => {

  const [isloading,setisloading] = useState(false)

  return (
    <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 space-y-10">
    {isloading ? (
      <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Loading....</p>
    ) : (
      res.data.map((product, index) => (
        <CardCom key={index} product={product} setisloading={setisloading}  />
      ))
    )}

    </div>
  )
}

export default CardsCom