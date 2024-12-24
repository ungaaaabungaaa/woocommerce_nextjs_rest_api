"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1580849198847-4c4cf1b74ef3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGVsaW5nfGVufDB8MHwwfHx8MA%3D%3D"
          alt="Street scene with people walking"
          width={1920}
          height={1080}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-16 lg:p-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-6"
        >
          <p className="text-white/90 text-sm md:text-base tracking-[0.2em] uppercase">
            Refined Simplicity, Elevated Comfort.
          </p>
          <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tight">
            SALE SALE SALE
          </h1>
          <div className="flex flex-wrap gap-4 pt-6">
            <Button className="bg-transparent text-white border-white">
              SHOP ALL
            </Button>
            <Button className="bg-white text-black hover:bg-white/90 transition-colors">
              BUY NOW
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
