'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Gallery / Portfolio Section Component
 * 
 * Prestige Expo Style:
 * - Section pin hoti hai
 * - Images sequentially appear hote hain scroll ke saath
 * - Phir section unpin hoti hai
 */
export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  const galleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      title: 'Project Alpha',
      category: 'Design',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      title: 'Project Beta',
      category: 'Development',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      title: 'Project Gamma',
      category: 'Marketing',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      title: 'Project Delta',
      category: 'Consulting',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      title: 'Project Epsilon',
      category: 'Design',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      title: 'Project Zeta',
      category: 'Development',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      // Pin section aur scroll animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=180%', // 1.8x section height ke liye scroll
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Header animation
          if (headerRef.current) {
            const headerProgress = Math.min(progress * 2.5, 1)
            gsap.to(headerRef.current, {
              opacity: headerProgress,
              y: (1 - headerProgress) * 50,
              duration: 0.1,
            })
          }
          
          // Gallery items sequentially appear
          itemsRef.current.forEach((item, index) => {
            if (item) {
              const itemStart = 0.15 + (index / itemsRef.current.length) * 0.7
              const itemEnd = itemStart + 0.12
              
              if (progress >= itemStart && progress <= itemEnd) {
                const itemProgress = (progress - itemStart) / (itemEnd - itemStart)
                gsap.to(item, {
                  opacity: itemProgress,
                  scale: 0.8 + itemProgress * 0.2,
                  y: (1 - itemProgress) * 80,
                  duration: 0.1,
                })
              } else if (progress < itemStart) {
                gsap.set(item, { opacity: 0, scale: 0.8, y: 80 })
              } else {
                gsap.set(item, { opacity: 1, scale: 1, y: 0 })
              }
            }
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center"
      id="gallery"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent work and see how we've helped clients achieve their goals
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el
              }}
              className="group relative overflow-hidden rounded-xl shadow-lg
                         hover:shadow-2xl transition-shadow duration-300 cursor-pointer opacity-0"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -5, duration: 0.3 })
                const img = e.currentTarget.querySelector('img')
                const overlay = e.currentTarget.querySelector('.overlay')
                if (img) gsap.to(img, { scale: 1.1, duration: 0.4 })
                if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, duration: 0.3 })
                const img = e.currentTarget.querySelector('img')
                const overlay = e.currentTarget.querySelector('.overlay')
                if (img) gsap.to(img, { scale: 1, duration: 0.4 })
                if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
              }}
            >
              {/* Image */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on Hover */}
                <div className="overlay absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
