'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FeatureCardWithImage } from './ui/FeatureCardWithImage'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Services Section Component
 * 
 * Prestige Expo Style:
 * - Section pin hoti hai
 * - Header slide in hota hai
 * - Cards sequentially appear hote hain scroll ke saath
 * - Phir section unpin hoti hai
 */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      title: 'Consulting Services',
      description: 'Strategic consulting to help you make informed decisions and achieve your business objectives.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
    {
      title: 'Design Solutions',
      description: 'Creative design services that bring your ideas to life with stunning visuals and user experiences.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    },
    {
      title: 'Development',
      description: 'Custom development solutions built with cutting-edge technology and best practices.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
    {
      title: 'Marketing',
      description: 'Comprehensive marketing strategies to grow your brand and reach your target audience.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    },
    {
      title: 'Support & Maintenance',
      description: 'Ongoing support and maintenance to keep your systems running smoothly.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
    },
    {
      title: 'Analytics',
      description: 'Data-driven insights and analytics to help you understand and optimize your performance.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      // Pin section aur scroll animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%', // 2x section height ke liye scroll
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Header slide in from bottom
          if (headerRef.current) {
            const headerProgress = Math.min(progress * 3, 1) // First 33% scroll
            gsap.to(headerRef.current, {
              y: (1 - headerProgress) * 80,
              opacity: headerProgress,
              duration: 0.1,
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
      className="relative py-20 sm:py-24 lg:py-32 bg-white min-h-screen flex items-center"
      id="services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0" style={{ transform: 'translateY(80px)' }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions tailored to meet your unique needs and exceed expectations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <FeatureCardWithImage
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
