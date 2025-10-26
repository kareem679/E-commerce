"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

const SwiperCom = () => {
const slides = [
  {
    src: "/Home/img1.jpg",
    title: "Explore the Latest Gear",
    desc: "Discover our newest collection of gadgets and accessories, crafted for your lifestyle."
  },
  {
    src: "/Home/img2.jpg",
    title: "Premium Quality Products",
    desc: "High-quality materials, designed for durability and style."
  },
  {
    src: "/Home/img3.jpg",
    title: "Fast & Secure Delivery",
    desc: "Get your orders delivered to your doorstep with speed and safety."
  }
];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className={`absolute w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}>
          <Image fill className="object-cover" src={slide.src} alt={`slide ${index}`} />
          <div className="absolute  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white  text-center">
            <h2 className={`text-3xl font-bold transition-opacity duration-1000 ${index === current ? "opacity-100":"opacity-0"}`}>{slide.title}</h2>
            <p className={`mt-4 transition-opacity duration-1000 ${index === current ? "opacity-100":"opacity-0"}`}>{slide.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwiperCom;