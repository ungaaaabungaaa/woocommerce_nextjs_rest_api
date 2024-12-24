"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../../components/ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <>
      <div className="w-full h-full py-5 hidden lg:block">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 dark:text-black font-sans">
          Shop FootWare!.
        </h2>
        <br></br>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full ">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Style Redefined - Your Perfect Fit Awaits
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                Join over 100,000 trendsetters who trust us for high-quality,
                stylish clothing. From casual to couture, we&apos;ve got you
                covered.
              </p>
            </div>
            <Image
              src="/air1.png"
              width={1500}
              height={1500}
              alt="linear demo image"
              className="absolute -right-4 lg:-right-[40%]  filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px]">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              No excuses, no limits, just style.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              When comfort meets confidence, you&apos;re always dressed to win.
              Discover your perfect fit today.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Step into fashion-forward trends with our exclusive clothing
                collection!
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                Join over 50,000 happy customers who trust us for premium
                quality & cutting-edge styles.
              </p>
            </div>
            <Image
              src="/air2.png"
              width={800}
              height={800}
              alt="linear demo image"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      </div>
    </>
  );
}
