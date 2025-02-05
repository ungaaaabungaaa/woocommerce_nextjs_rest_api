"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { ImageData } from "../../types/imagedata"

interface GalleryModalProps {
  images: ImageData[]
  initialIndex: number
  onClose: () => void
}

export function GalleryModal({ images, initialIndex, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    setScale(1)
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    setScale(1)
  }, [images.length])

  const handleZoom = useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault()
    if ("detail" in event) {
      if (event.detail === 1) {
        setScale(2)
      } else if (event.detail === 2) {
        setScale(1)
      }
    } else {
      setScale((prev) => (prev === 1 ? 2 : 1))
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious()
      } else if (event.key === "ArrowRight") {
        handleNext()
      } else if (event.key === "Escape") {
        onClose()
      } else if (event.key === "Enter" || event.key === " ") {
        handleZoom(event)
      }
    },
    [handlePrevious, handleNext, onClose, handleZoom],
  )

  return (
    <div
      aria-label="Image Gallery"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 p-8 backdrop-blur-sm "
      onKeyDown={handleKeyDown}
      role="dialog"
      tabIndex={-1}
    >
      <div className="relative mx-auto h-full w-full rounded-sm bg-black dark:bg-white shadow-2xl">
        <button
          aria-label="Close gallery"
          className="absolute right-6 top-6 z-50 rounded-full p-2 bg-none"
          onClick={onClose}
        >
          <X className="h-6 w-6 text-white dark:text-black" />
        </button>

        <div
          aria-label={`Image ${currentIndex + 1} of ${images.length}`}
          className="relative h-full w-full p-8 focus:outline-none"
          ref={containerRef}
        >
          <div
            className="h-full w-full transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            <Image
              alt={images[currentIndex].alt || images[currentIndex].name}
              className="object-cover"
              draggable={false}
              fill
              priority
              src={images[currentIndex].src || "/placeholder.svg"}
            />
          </div>
        </div>

        <button
          aria-label="Previous image"
          className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full  p-3 bg-none shadow-none"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-8 w-8 text-white dark:text-black" />
        </button>
        <button
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full  p-3 bg-none shadow-none"
          onClick={handleNext}
        >
          <ChevronRight className="h-8 w-8 text-white dark:text-black" />
        </button>

        <div
          aria-label="Image thumbnails"
          className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 flex gap-4 rounded-lg bg-black dark:bg-white p-4 shadow-lg backdrop-blur-sm "
          role="region"
        >
          {images.map((image, index) => (
            <button
              key={image.name}
              aria-current={index === currentIndex ? "true" : "false"}
              aria-label={`View image ${index + 1}`}
              className={`relative h-20 w-20 overflow-hidden rounded-md border-1 transition-all
                ${index === currentIndex ? "border-black" : "border-transparent hover:border-gray-300"}`}
              onClick={() => {
                setCurrentIndex(index)
                setScale(1)
              }}
            >
              <Image
                alt={image.alt || image.name}
                className="object-cover"
                fill
                src={image.src || "/placeholder.svg"}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}