'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AppleCard } from './ui/AppleCard'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * About Section Component with AppleCard
 * 
 * Uses Aceternity UI AppleCard component with pointer highlight effect
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const aboutCards = [
    {
      title: 'Timeless Excellence',
      description: 'We are dedicated to providing exceptional experiences and innovative solutions that exceed expectations and set new industry standards.',
      src: 'https://i.pinimg.com/736x/c3/c4/03/c3c403673f9e4ab5ec3c5b5d6e0a1279.jpg',
    },
    {
      title: 'Innovation & Quality',
      description: 'With a commitment to excellence and a passion for innovation, we\'ve built a reputation for delivering outstanding results. Our team combines creativity with technical expertise.',
      src: 'https://i.pinimg.com/736x/93/7a/9d/937a9d3ce18a24edf0daff194ad4c8df.jpg',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      // Parallax scroll effect - dheere dheere upar aana (no pinning)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const scrollProgress = self.progress
          
          // Section ko parallax effect ke saath upar lao
          // Content scroll se thoda slow move hoga (parallax depth effect)
          if (sectionRef.current) {
            const parallaxAmount = 80 // Kitna upar move hoga
            const yMovement = scrollProgress * parallaxAmount
            gsap.set(sectionRef.current, {
              y: -yMovement, // Negative = upar move karega
            })
          }
          
          // Header text fade in smoothly
          if (headerRef.current) {
            const headerProgress = Math.min(scrollProgress * 1.5, 1)
            gsap.set(headerRef.current, {
              y: (1 - headerProgress) * 50,
              opacity: headerProgress,
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 min-h-screen flex items-center"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0" style={{ transform: 'translateY(50px)' }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing exceptional experiences and innovative solutions
            that exceed expectations and set new industry standards.
          </p>
        </div>

        {/* Apple Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {aboutCards.map((card, index) => (
            <AppleCard
              key={index}
              title={card.title}
              description={card.description}
              src={card.src}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
