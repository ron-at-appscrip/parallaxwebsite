"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative h-[450px] w-[350px] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 cursor-pointer"
      layout={layout}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative h-full w-full">
        <img
          src={card.src}
          alt={card.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
        <p className="text-sm font-medium mb-2 text-white/80">{card.category}</p>
        <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
        <div className="text-base text-white/90">{card.content}</div>
      </div>

      {/* Hover Effect */}
      {hoveredIndex === index && (
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            background: "radial-gradient(600px circle at center, rgba(255, 255, 255, 0.15), transparent 40%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export const AppleCardsCarousel = ({
  items,
  initialScroll = 0,
}: {
  items: JSX.Element[];
  initialScroll?: number;
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useMotionValue(initialScroll);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        scrollX.set(scrollLeft);
        
        // Calculate active index based on scroll position
        const cardWidth = 350 + 24; // card width + gap
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(index);
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollX]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
              }}
            >
              {item}
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

