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
      // Mouse event
      if (event.detail === 1) {
        setScale(2)
      } else if (event.detail === 2) {
        setScale(1)
      }
    } else {
      // Keyboard event
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
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm focus:outline-none"
      onKeyDown={handleKeyDown}
      role="dialog"
      tabIndex={-1}
    >
      <div className="fixed inset-0 bg-black">
        <button
          aria-label="Close gallery"
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 text-foreground/80 backdrop-blur-sm transition hover:bg-background/60"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div
          aria-label={`Image ${currentIndex + 1} of ${images.length}. Click or press Enter to zoom.`}
          className="relative h-full w-full focus:outline-none"
          onClick={handleZoom}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleZoom(e)
            }
          }}
          ref={containerRef}
          role="button"
          tabIndex={0}
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
          className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground/80 backdrop-blur-sm transition hover:bg-background/60"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground/80 backdrop-blur-sm transition hover:bg-background/60"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          aria-label="Image thumbnails"
          className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 flex gap-2 px-4"
          role="region"
        >
          {images.map((image, index) => (
            <button
              key={image.name}
              aria-current={index === currentIndex ? "true" : "false"}
              aria-label={`View image ${index + 1}`}
              className={`relative h-16 w-16 overflow-hidden rounded-md ${
                index === currentIndex ? "ring-2 ring-primary" : ""
              }`}
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

