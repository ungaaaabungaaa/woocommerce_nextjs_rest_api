"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageData } from "../../types/imagedata";

interface ProductGalleryProps {
  images: ImageData[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={images[activeImageIndex]?.src}
              alt={
                images[activeImageIndex]?.alt || images[activeImageIndex]?.name
              }
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <button
                key={image.name}
                className={`relative aspect-square overflow-hidden rounded-md ${
                  index === activeImageIndex ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt || image.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={image.name}
              className={`relative ${
                index === 2 ? "aspect-[2/1] col-span-2" : "aspect-square"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt || image.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
