'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'

type Product = {
  title: string
  link: string
  thumbnail: string
}

const ProductCard = ({
  product,
  translate,
}: {
  product: Product
  translate: any
}) => {
  return (
    <motion.div
      style={{
        y: translate,
      }}
      whileHover={{
        scale: 1.05,
      }}
      className="group/product relative h-80 w-64 sm:h-96 sm:w-80 flex-shrink-0 cursor-pointer"
    >
      <a
        href={product.link}
        className="block relative h-full w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
      >
        <img
          src={product.thumbnail}
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover/product:scale-110"
          alt={product.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <h3 className="text-xl sm:text-2xl font-bold">{product.title}</h3>
        </div>
      </a>
    </motion.div>
  )
}

/**
 * Hero Parallax Section
 * 
 * A scroll effect with rotation, translation and opacity animations
 * Similar to Aceternity UI Hero Parallax component
 */
export default function HeroParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Sample products
  const products: Product[] = [
    {
      title: 'Moonbeam',
      link: '#',
      thumbnail: 'https://i.pinimg.com/736x/c3/c4/03/c3c403673f9e4ab5ec3c5b5d6e0a1279.jpg',
    },
    {
      title: 'Cursor',
      link: '#',
      thumbnail: 'https://i.pinimg.com/736x/93/7a/9d/937a9d3ce18a24edf0daff194ad4c8df.jpg',
    },
    {
      title: 'Rogue',
      link: '#',
      thumbnail: 'https://i.pinimg.com/1200x/f9/4c/58/f94c5898fcc5227a6b969b303bf8a1b6.jpg',
    },
    {
      title: 'Editorially',
      link: '#',
      thumbnail: 'https://i.pinimg.com/736x/4b/15/cd/4b15cdf3687d378cf29f69ed7769e5bb.jpg',
    },
    {
      title: 'Editrix AI',
      link: '#',
      thumbnail: 'https://i.pinimg.com/736x/b7/0c/fc/b70cfc2e6d68777f4c49e01024a8e72a.jpg',
    },
    {
      title: 'Pixel Perfect',
      link: '#',
      thumbnail: 'https://i.pinimg.com/736x/ae/d2/90/aed2903c6725382e986336a0949389f4.jpg',
    },
    {
      title: 'Algochurn',
      link: '#',
      thumbnail: 'https://i.pinimg.com/736x/c3/c4/03/c3c403673f9e4ab5ec3c5b5d6e0a1279.jpg',
    },
    {
      title: 'Aceternity UI',
      link: '#',
      thumbnail: 'https://i.pinimg.com/736x/93/7a/9d/937a9d3ce18a24edf0daff194ad4c8df.jpg',
    },
  ]

  const firstRow = products.slice(0, Math.ceil(products.length / 2))
  const secondRow = products.slice(Math.ceil(products.length / 2))

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black py-12 sm:py-16 md:py-20 min-h-[80vh]"
    >
      <div className="mb-12 sm:mb-16 md:mb-20 text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          The Ultimate Development Studio
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We build beautiful products with the latest technologies and frameworks. We are a team of passionate developers and designers that love to build amazing products.
        </p>
      </div>

      <div className="w-full flex flex-row items-start justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-hidden px-4">
        <motion.div 
          className="flex flex-row items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']),
          }}
        >
          {firstRow.map((product, idx) => {
            const y = useTransform(scrollYProgress, [0, 1], ['0%', `${(idx % 2 === 0 ? -1 : 1) * 30}%`])
            const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
            const translateY = useSpring(y, springConfig)

            return (
              <ProductCard
                key={`first-${product.title}-${idx}`}
                product={product}
                translate={translateY}
              />
            )
          })}
        </motion.div>
        <motion.div 
          className="flex flex-row items-start gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ['0%', '30%']),
          }}
        >
          {secondRow.map((product, idx) => {
            const y = useTransform(scrollYProgress, [0, 1], ['0%', `${(idx % 2 === 0 ? 1 : -1) * 30}%`])
            const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
            const translateY = useSpring(y, springConfig)

            return (
              <ProductCard
                key={`second-${product.title}-${idx}`}
                product={product}
                translate={translateY}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
