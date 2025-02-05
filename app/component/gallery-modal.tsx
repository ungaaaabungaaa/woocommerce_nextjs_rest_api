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

  const handleZoom = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    if (event.detail === 1) {
      // Single click
      setScale(2)
    } else if (event.detail === 2) {
      // Double click
      setScale(1)
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
      }
    },
    [handlePrevious, handleNext, onClose],
  )

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="fixed inset-0 bg-black">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 text-foreground/80 backdrop-blur-sm transition hover:bg-background/60"
        >
          <X className="h-5 w-5" />
        </button>

        <div ref={containerRef} className="relative h-full w-full" onClick={handleZoom}>
          <div
            className="h-full w-full transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            <Image
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt || images[currentIndex].name}
              fill
              className="object-contain"
              draggable={false}
              priority
            />
          </div>
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground/80 backdrop-blur-sm transition hover:bg-background/60"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground/80 backdrop-blur-sm transition hover:bg-background/60"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 flex gap-2 px-4">
          {images.map((image, index) => (
            <button
              key={image.name}
              onClick={() => {
                setCurrentIndex(index)
                setScale(1)
              }}
              className={`relative h-16 w-16 overflow-hidden rounded-md ${
                index === currentIndex ? "ring-2 ring-primary" : ""
              }`}
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
  )
}

