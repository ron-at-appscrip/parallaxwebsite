'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from './ui/AppleCardsCarousel'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Apple Cards Carousel Section
 * 
 * - 100dvh height, no background
 * - Section neeche se upar aata hai (100dvh)
 * - Phir cards horizontal scroll hote hain
 * - Saare cards ke baad next section par scroll
 */
export default function AppleCardsCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const images = [
    'https://i.pinimg.com/1200x/f9/4c/58/f94c5898fcc5227a6b969b303bf8a1b6.jpg',
    'https://i.pinimg.com/736x/4b/15/cd/4b15cdf3687d378cf29f69ed7769e5bb.jpg',
    'https://i.pinimg.com/736x/b7/0c/fc/b70cfc2e6d68777f4c49e01024a8e72a.jpg',
    'https://i.pinimg.com/736x/ae/d2/90/aed2903c6725382e986336a0949389f4.jpg',
    'https://i.pinimg.com/1200x/f9/4c/58/f94c5898fcc5227a6b969b303bf8a1b6.jpg',
    'https://i.pinimg.com/736x/4b/15/cd/4b15cdf3687d378cf29f69ed7769e5bb.jpg',
    'https://i.pinimg.com/736x/b7/0c/fc/b70cfc2e6d68777f4c49e01024a8e72a.jpg',
    'https://i.pinimg.com/736x/ae/d2/90/aed2903c6725382e986336a0949389f4.jpg',
  ]

  const categories = [
    'Product',
    'Design',
    'Innovation',
    'Technology',
    'Product',
    'Design',
    'Innovation',
    'Technology',
  ]

  const titles = [
    'Premium Experience',
    'Modern Design',
    'Cutting Edge',
    'Next Generation',
    'Premium Experience',
    'Modern Design',
    'Cutting Edge',
    'Next Generation',
  ]

  const contents = [
    'Discover exceptional quality and craftsmanship.',
    'Beautiful design meets functionality.',
    'Innovation at its finest.',
    'Technology that transforms.',
    'Discover exceptional quality and craftsmanship.',
    'Beautiful design meets functionality.',
    'Innovation at its finest.',
    'Technology that transforms.',
  ]

  const cards: Card[] = images.map((src, index) => ({
    src,
    title: titles[index],
    category: categories[index],
    content: <p>{contents[index]}</p>,
  }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !cardsContainerRef.current) return

      // Initial position: section neeche se start
      gsap.set(sectionRef.current, {
        y: window.innerHeight,
      })

      // Calculate total scroll distance needed for all cards
      const cardWidth = 350 + 24 // card width + gap
      const totalCardsWidth = cardWidth * cards.length
      const viewportWidth = window.innerWidth
      const maxScroll = Math.max(0, totalCardsWidth - viewportWidth + 200)
      
      // Pin section and control animations
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight + maxScroll}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Phase 1 (0-25%): Section neeche se upar aata hai
          if (progress < 0.25) {
            const phase1Progress = progress / 0.25
            gsap.set(sectionRef.current, {
              y: (1 - phase1Progress) * window.innerHeight,
            })
          } else {
            // Section upar aa chuka hai
            gsap.set(sectionRef.current, {
              y: 0,
            })
          }
          
          // Phase 2 (25-90%): Cards horizontal scroll
          if (progress >= 0.25 && progress < 0.9) {
            const phase2Progress = (progress - 0.25) / 0.65
            const scrollAmount = phase2Progress * maxScroll
            
            if (cardsContainerRef.current) {
              cardsContainerRef.current.scrollLeft = scrollAmount
            }
          } else if (progress >= 0.9) {
            // Ensure cards are fully scrolled
            if (cardsContainerRef.current) {
              cardsContainerRef.current.scrollLeft = maxScroll
            }
          }
        },
      })

      // Recalculate on resize
      const handleResize = () => {
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        scrollTrigger?.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [cards.length])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Collection
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated selection of premium experiences
          </p>
        </div>
        
        <div className="w-full overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'auto',
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                style={{
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always',
                }}
              >
                <Card card={card} index={index} />
              </div>
            ))}
          </div>
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
    </section>
  )
}
