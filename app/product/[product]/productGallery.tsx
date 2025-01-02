"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react"; // Import the Lucide React icon
import { ImageData } from "../../types/imagedata";

interface ProductGalleryProps {
  images: ImageData[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const router = useRouter();

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
              {index === 0 && (
                <button
                  onClick={() => router.back()}
                  className="absolute top-5 left-5 z-10 inline-flex items-center justify-center rounded-full w-9 h-9 bg-black text-white"
                  aria-label="Go back"
                >
                  <ChevronLeft size={20} />{" "}
                  {/* Use the Lucide ArrowLeft icon */}
                </button>
              )}
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
