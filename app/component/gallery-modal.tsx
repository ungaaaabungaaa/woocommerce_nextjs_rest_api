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
      className="fixed inset-0 z-50 bg-white"
      onKeyDown={handleKeyDown}
      role="dialog"
      tabIndex={-1}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          aria-label="Close gallery"
          className="absolute right-4 top-4 z-50 rounded-full p-2 hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        <div
          aria-label={`Image ${currentIndex + 1} of ${images.length}`}
          className="relative h-[80vh] w-full max-w-4xl focus:outline-none"
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
              className="object-contain"
              draggable={false}
              fill
              priority
              src={images[currentIndex].src || "/placeholder.svg"}
            />
          </div>
        </div>

        <button
          aria-label="Previous image"
          className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <button
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>

        <div
          aria-label="Image thumbnails"
          className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 flex gap-4 bg-white p-4 rounded-lg shadow-lg"
          role="region"
        >
          {images.map((image, index) => (
            <button
              key={image.name}
              aria-current={index === currentIndex ? "true" : "false"}
              aria-label={`View image ${index + 1}`}
              className={`relative h-20 w-20 overflow-hidden rounded-md border-2 transition-all
                ${index === currentIndex ? "border-blue-500" : "border-transparent hover:border-gray-300"}`}
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