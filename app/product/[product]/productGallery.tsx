"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from 'lucide-react';
import { ImageData } from "../../types/imagedata";
import { GalleryModal } from "@/app/component/gallery-modal"

interface ProductGalleryProps {
  images: ImageData[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const openModal = (index: number) => {
    setActiveImageIndex(index);
    setShowModal(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent, handler: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          <button
            className="relative aspect-square w-full overflow-hidden rounded-lg"
            onClick={() => openModal(activeImageIndex)}
            onKeyDown={(e) => handleKeyDown(e, () => openModal(activeImageIndex))}
            aria-label={`View ${images[activeImageIndex]?.alt || images[activeImageIndex]?.name} in gallery`}
          >
            <Image
              src={images[activeImageIndex]?.src || "/placeholder.svg"}
              alt={images[activeImageIndex]?.alt || images[activeImageIndex]?.name}
              fill
              className="object-cover"
            />
          </button>
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
                  src={image.src || "/placeholder.svg"}
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
            <button
              key={image.name}
              className={`relative ${
                index === 2 ? "aspect-[2/1] col-span-2" : "aspect-square"
              }`}
              onClick={() => openModal(index)}
              onKeyDown={(e) => handleKeyDown(e, () => openModal(index))}
              aria-label={`View ${image.alt || image.name} in gallery`}
            >
              {index === 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.back();
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    handleKeyDown(e, () => router.back());
                  }}
                  className="absolute top-5 left-5 z-10 inline-flex items-center justify-center rounded-full w-9 h-9 bg-black text-white"
                  aria-label="Go back"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt || image.name}
                fill
                className="object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Modal */}
      {showModal && (
        <GalleryModal
          images={images}
          initialIndex={activeImageIndex}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}