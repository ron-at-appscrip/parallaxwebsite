'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hero Section Component
 * 
 * Prestige Expo Style:
 * - Section pin hoti hai
 * - 5-6 texts sequentially appear/disappear hote hain scroll ke saath
 * - Ek text fade out hota hai, next text fade in hota hai
 * - Section wahi par scroll hoti hai
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef1 = useRef<HTMLDivElement>(null)
  const bgRef2 = useRef<HTMLDivElement>(null)
  const textsContainerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<HTMLDivElement[]>([])

  // Hero images
  const heroImages = [
    'https://i.pinimg.com/736x/c3/c4/03/c3c403673f9e4ab5ec3c5b5d6e0a1279.jpg',
    'https://i.pinimg.com/736x/93/7a/9d/937a9d3ce18a24edf0daff194ad4c8df.jpg',
  ]

  // 6 different texts jo sequentially show honge
  const heroTexts = [
    {
      title: 'TIMELESS PROPERTIES',
      subtitle: 'Discover premium experiences and exceptional service that sets new standards',
    },
    {
      title: 'TWO DECADES OF CREATING PLACES',
      subtitle: 'That endure across generations in Southern Spain and beyond',
    },
    {
      title: 'WE CREATE VALUE',
      subtitle: 'That lasts decades. Ensuring lasting quality across every project',
    },
    {
      title: 'PREMIUM DEVELOPMENTS',
      subtitle: 'Shaping the dialogue between permanence and progress',
    },
    {
      title: 'EXCEPTIONAL LOCATIONS',
      subtitle: 'Where timeless design meets the future of living',
    },
    {
      title: 'YOUR VISION, OUR EXPERTISE',
      subtitle: 'Building places that stand the test of time',
    },
  ]

  // Cursor tracking parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const xPos = (clientX / innerWidth - 0.5) * 2
      const yPos = (clientY / innerHeight - 0.5) * 2
      
      if (bgRef1.current) {
        gsap.to(bgRef1.current, {
          x: xPos * 30,
          y: yPos * 30,
          duration: 1,
          ease: 'power2.out',
        })
      }
      
      if (bgRef2.current) {
        gsap.to(bgRef2.current, {
          x: xPos * 30,
          y: yPos * 30,
          duration: 1,
          ease: 'power2.out',
        })
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const { innerWidth, innerHeight } = window
        
        const xPos = (touch.clientX / innerWidth - 0.5) * 2
        const yPos = (touch.clientY / innerHeight - 0.5) * 2
        
        if (bgRef1.current) {
          gsap.to(bgRef1.current, {
            x: xPos * 20,
            y: yPos * 20,
            duration: 1,
            ease: 'power2.out',
          })
        }
        
        if (bgRef2.current) {
          gsap.to(bgRef2.current, {
            x: xPos * 20,
            y: yPos * 20,
            duration: 1,
            ease: 'power2.out',
          })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Pin section aur scroll animations - multiple texts sequentially
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pehle text ko visible karo initially
      if (textRefs.current[0]) {
        gsap.set(textRefs.current[0], {
          opacity: 1,
          y: 0,
          scale: 1,
        })
      }
      
      // Baaki texts ko hide karo
      textRefs.current.forEach((textEl, index) => {
        if (textEl && index !== 0) {
          gsap.set(textEl, {
            opacity: 0,
            y: 50,
            scale: 0.95,
          })
        }
      })

      // Pin section aur scroll-triggered animations
      if (heroRef.current && textsContainerRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: `+=${600}%`, // 6 texts ke liye 6x scroll distance
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const totalTexts = heroTexts.length
            
            // Har text ke liye calculate karo ki kab show hoga
            textRefs.current.forEach((textEl, index) => {
              if (!textEl) return
              
              // Har text ka time slot
              const textStart = index / totalTexts
              const textEnd = (index + 1) / totalTexts
              const textDuration = textEnd - textStart
              
              // Current text ka progress (0 to 1)
              let textProgress = 0
              
              if (progress >= textStart && progress <= textEnd) {
                // Text visible hai - fade in/out
                textProgress = (progress - textStart) / textDuration
                
                // First half: fade in, second half: fade out
                if (textProgress <= 0.5) {
                  // Fade in (0 to 0.5)
                  const fadeProgress = textProgress * 2
                  gsap.to(textEl, {
                    opacity: fadeProgress,
                    y: (1 - fadeProgress) * 50,
                    scale: 0.95 + fadeProgress * 0.05,
                    duration: 0.1,
                  })
                } else {
                  // Fade out (0.5 to 1)
                  const fadeProgress = (textProgress - 0.5) * 2
                  gsap.to(textEl, {
                    opacity: 1 - fadeProgress,
                    y: fadeProgress * 50,
                    scale: 1 - fadeProgress * 0.05,
                    duration: 0.1,
                  })
                }
              } else if (progress < textStart) {
                // Text abhi show nahi hua (except first one)
                if (index === 0 && progress === 0) {
                  // First text visible rahega initially
                  gsap.set(textEl, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  })
                } else {
                  gsap.set(textEl, {
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                  })
                }
              } else {
                // Text already show ho chuka hai
                gsap.set(textEl, {
                  opacity: 0,
                  y: -50,
                  scale: 0.95,
                })
              }
            })
            
            // Background image transitions - smooth crossfade between two images
            // First image shows for first 3 texts, second image for last 3 texts
            const imageTransitionPoint = 0.5 // Switch images at 50% scroll
            
            if (bgRef1.current && bgRef2.current) {
              if (progress < imageTransitionPoint) {
                // First image dominant (fade out gradually)
                const firstImageProgress = progress / imageTransitionPoint
                const opacity1 = Math.max(0, 1 - firstImageProgress * 0.5) // Fade to 50% opacity
                const opacity2 = Math.min(1, firstImageProgress * 0.5) // Fade in to 50% opacity
                
                gsap.to(bgRef1.current, {
                  opacity: opacity1,
                  scale: 1.15 - firstImageProgress * 0.05,
                  duration: 0.1,
                })
                gsap.to(bgRef2.current, {
                  opacity: opacity2,
                  scale: 1.05 + firstImageProgress * 0.05,
                  duration: 0.1,
                })
              } else {
                // Second image dominant (fade in fully)
                const secondImageProgress = (progress - imageTransitionPoint) / (1 - imageTransitionPoint)
                const opacity1 = Math.max(0, 0.5 - secondImageProgress * 0.5) // Fade out completely
                const opacity2 = Math.min(1, 0.5 + secondImageProgress * 0.5) // Fade in fully
                
                gsap.to(bgRef1.current, {
                  opacity: opacity1,
                  scale: 1.1 - secondImageProgress * 0.05,
                  duration: 0.1,
                })
                gsap.to(bgRef2.current, {
                  opacity: opacity2,
                  scale: 1.1 - secondImageProgress * 0.05,
                  duration: 0.1,
                })
              }
            }
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* First Background Image with Parallax Effect */}
      <div
        ref={bgRef1}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImages[0]}')`,
          backgroundAttachment: 'fixed',
          opacity: 1,
          transform: 'scale(1.15)',
          willChange: 'transform, opacity',
          transition: 'opacity 0.3s ease-out',
        }}
      />
      
      {/* Second Background Image with Parallax Effect */}
      <div
        ref={bgRef2}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImages[1]}')`,
          backgroundAttachment: 'fixed',
          opacity: 0,
          transform: 'scale(1.05)',
          willChange: 'transform, opacity',
          transition: 'opacity 0.3s ease-out',
        }}
      />
      
      {/* Sophisticated Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
      
      {/* Radial gradient overlay for better focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/40 z-10" 
           style={{
             background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)'
           }}
      />
      
      {/* Texts Container - sab texts same position par, absolute */}
      <div
        ref={textsContainerRef}
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
      >
        {heroTexts.map((text, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) textRefs.current[index] = el
            }}
            className={`absolute inset-0 flex flex-col items-center justify-center ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight text-center drop-shadow-2xl">
              <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                {text.title}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto text-center drop-shadow-lg leading-relaxed font-light">
              {text.subtitle}
            </p>
            
            {/* Call-to-Action Button - sirf first text par */}
            {index === 0 && (
              <motion.button
                className="px-10 py-5 bg-white text-gray-900 font-semibold rounded-full text-lg 
                           hover:bg-gray-50 active:scale-95 
                           transition-all duration-300 shadow-2xl hover:shadow-white/20
                           backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                LEARN MORE
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="scroll-indicator w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </div>

      <style jsx>{`
        .scroll-indicator {
          animation: scrollBounce 1.5s infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
      `}</style>
    </section>
  )
}
