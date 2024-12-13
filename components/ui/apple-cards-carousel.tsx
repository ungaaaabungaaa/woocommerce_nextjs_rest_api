"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useRouter } from "next/navigation";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  title?: string;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0, title = "Featured" }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="w-full h-full py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 mb-4">
          <h2 className="text-xl md:text-5xl font-bold text-neutral-200 dark:text-black font-sans mr-auto">
            {title}
          </h2>
          <div className="flex items-center space-x-2 shrink-0">
            <button 
              onClick={scrollLeft} 
              disabled={!canScrollLeft}
              className="group/button bg-white text-black dark:bg-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <IconArrowNarrowLeft className="h-5 w-5 bg-white text-black dark:bg-black dark:text-white group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button 
              onClick={scrollRight} 
              disabled={!canScrollRight}
              className="group/button bg-white text-black dark:bg-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <IconArrowNarrowRight className="h-5 w-5 text-black dark:bg-black dark:text-white group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
        <div className="relative w-full">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-0.5 p-4"
            onScroll={checkScrollability}
          >
            <div
              className={cn(
                "flex flex-row justify-start gap-4 pl-4",
                "max-w-7xl mx-auto"
              )}
            >
              {items.map((item, index) => (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                    },
                  }}
                  key={"card" + index}
                  className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

// The rest of the code remains the same (Card and BlurImage components)
export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const { onCardClose } = useContext(CarouselContext);
  const router = useRouter();

  const handleCardClick = () => {
    console.log('Card category:', card.category);
    router.push(`/store/${card.category}`);
    onCardClose(index);
  };

  return (
    <motion.button
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={handleCardClick}
      className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
    >
      <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
      <div className="relative z-40 p-8">
        <motion.p
          layoutId={layout ? `category-${card.category}` : undefined}
          className="text-white text-sm md:text-base font-medium font-sans text-left"
        >
          {card.category}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
        >
          {card.title}
        </motion.p>
      </div>
      <BlurImage
        src={card.src}
        alt={card.title}
        fill
        className="object-cover absolute z-10 inset-0"
      />
    </motion.button>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};