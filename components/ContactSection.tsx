'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Contact Form Section Component
 * 
 * Prestige Expo Style:
 * - Section pin hoti hai
 * - Form fields sequentially appear hote hain scroll ke saath
 * - Phir section unpin hoti hai
 */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputsRef = useRef<(HTMLDivElement | HTMLButtonElement)[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return

      // Pin section aur scroll animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%', // 1.5x section height ke liye scroll
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
          
          // Form fields sequentially appear from bottom
          inputsRef.current.forEach((input, index) => {
            if (input) {
              const inputStart = 0.2 + index * 0.2
              const inputEnd = inputStart + 0.15
              
              if (progress >= inputStart && progress <= inputEnd) {
                const inputProgress = (progress - inputStart) / (inputEnd - inputStart)
                gsap.to(input, {
                  opacity: inputProgress,
                  y: (1 - inputProgress) * 50,
                  duration: 0.1,
                })
              } else if (progress < inputStart) {
                gsap.set(input, { opacity: 0, y: 50 })
              } else {
                gsap.set(input, { opacity: 1, y: 0 })
              }
            }
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 min-h-screen flex items-center"
      id="contact"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12"
        >
          {/* Name Input */}
          <div
            ref={(el) => {
              if (el) inputsRef.current[0] = el
            }}
            className="mb-6 opacity-0"
            style={{ transform: 'translateY(50px)' }}
          >
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         transition-all duration-200 text-gray-900"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div
            ref={(el) => {
              if (el) inputsRef.current[1] = el
            }}
            className="mb-6 opacity-0"
            style={{ transform: 'translateY(50px)' }}
          >
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         transition-all duration-200 text-gray-900"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Textarea */}
          <div
            ref={(el) => {
              if (el) inputsRef.current[2] = el
            }}
            className="mb-8 opacity-0"
            style={{ transform: 'translateY(50px)' }}
          >
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                         transition-all duration-200 resize-none text-gray-900"
              placeholder="Tell us about your project or inquiry..."
            />
          </div>

          {/* Submit Button */}
          <button
            ref={(el) => {
              if (el) inputsRef.current[3] = el
            }}
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg
                       hover:bg-primary-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 shadow-lg hover:shadow-xl opacity-0"
            style={{ transform: 'translateY(50px)' }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 })
              }
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">contact@example.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600">New York, USA</p>
          </div>
        </div>
      </div>
    </section>
  )
}
