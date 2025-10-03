"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

const SwiperCom = () => {
  const slides = [
    {
      src: "/img1.jpg",
      title: "Lorem ipsum dolor sit amet.",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, accusamus!"
    },
    {
      src: "/img2.jpg",
      title: "Lorem ipsum dolor sit amet.",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, accusamus!"
    },
    {
      src: "/img3.jpg",
      title: "Lorem ipsum dolor sit amet.",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, accusamus!"
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