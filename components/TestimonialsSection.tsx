'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Testimonials Section Component
 * 
 * Horizontal Scroll Style:
 * - Section pin hoti hai
 * - Testimonials horizontal row mein hote hain
 * - Scroll par right se left ko move hote hain
 * - Sab testimonials scroll ke saath horizontal scroll hote hain
 * - Phir section unpin hoti hai aur neeche scroll hota hai
 */
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      quote: 'Working with this team has been an absolute pleasure. Their attention to detail and commitment to excellence is unmatched.',
      author: 'Sarah Johnson',
      role: 'CEO, Tech Innovations',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    },
    {
      quote: 'The results exceeded our expectations. They delivered on time and within budget, and the quality was outstanding.',
      author: 'Michael Chen',
      role: 'Director, Creative Agency',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    },
    {
      quote: 'Professional, innovative, and reliable. I would highly recommend their services to anyone looking for top-tier solutions.',
      author: 'Emily Rodriguez',
      role: 'Founder, Startup Hub',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    },
    {
      quote: 'Their expertise and dedication made all the difference. We saw immediate improvements and continue to see great results.',
      author: 'David Thompson',
      role: 'VP of Marketing, Global Corp',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    },
    {
      quote: 'Exceptional service and outstanding results. This team truly understands how to deliver excellence.',
      author: 'Lisa Anderson',
      role: 'Founder, Design Studio',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    },
    {
      quote: 'The best investment we made. Their solutions transformed our business completely.',
      author: 'Robert Martinez',
      role: 'CTO, Tech Solutions',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    },
  ]

  // GSAP animations with horizontal scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !carouselRef.current || !containerRef.current) return

      // Calculate total width for horizontal scroll
      const calculateScrollDistance = () => {
        if (!carouselRef.current || !containerRef.current) return 0
        
        const containerWidth = containerRef.current.offsetWidth
        const firstCard = carouselRef.current.querySelector('div:first-child') as HTMLElement
        if (!firstCard) return 0
        
        const cardWidth = firstCard.offsetWidth
        const gap = 24 // gap-6 = 1.5rem = 24px
        const totalWidth = (cardWidth + gap) * testimonials.length - gap
        const scrollDistance = Math.max(0, totalWidth - containerWidth)
        
        return scrollDistance
      }

      // Pin section aur horizontal scroll animations
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${300}%`, // 3x section height ke liye scroll (horizontal scroll ke liye zyada)
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Header animation - fade in at start
          if (headerRef.current) {
            const headerProgress = Math.min(progress * 3, 1)
            gsap.to(headerRef.current, {
              opacity: headerProgress,
              y: (1 - headerProgress) * 50,
              duration: 0.1,
            })
          }
          
          // Horizontal scroll - right se left ko move
          if (carouselRef.current) {
            const scrollDistance = calculateScrollDistance()
            // Progress 0.1 se start (header ke baad)
            const scrollProgress = Math.max(0, (progress - 0.1) / 0.9)
            const xPosition = -scrollProgress * scrollDistance
            
            gsap.to(carouselRef.current, {
              x: xPosition,
              duration: 0.1,
              ease: 'none',
            })
          }
        },
      })
      
      // Update on resize
      const handleResize = () => {
        ScrollTrigger.refresh()
      }
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        scrollTrigger.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [testimonials.length])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 bg-white min-h-screen flex items-center overflow-hidden"
      id="testimonials"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Don't just take our word for it - hear from those we've worked with
          </p>
        </div>

        {/* Horizontal Testimonials Container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden w-full"
        >
          {/* Testimonials Carousel - Horizontal Row */}
          <div
            ref={carouselRef}
            className="flex gap-6 sm:gap-8"
            style={{ 
              willChange: 'transform'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-gray-50 rounded-2xl p-8 sm:p-12 shadow-lg w-full sm:w-[500px] md:w-[600px]"
              >
                {/* Quote */}
                <div className="text-center mb-8">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {testimonial.author}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
