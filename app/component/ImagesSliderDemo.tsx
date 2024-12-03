"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../../components/ui/images-slider";
import { useRouter } from "next/navigation";

export function ImagesSliderDemo() {
  const router = useRouter();
  const images = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleShopClick = () => {
    router.push("/store");
  };

  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Elevate Your Wardrobe <br />  Style Meets Comfort
        </motion.p>
        <button onClick={handleShopClick} className="px-4 py-2 backdrop-blur-sm border bg-black-300/10 border-black-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span onClick={handleShopClick} >Shop Now → </span>
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
