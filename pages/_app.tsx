import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Initialize Lenis and GSAP ScrollTrigger
    const initSmoothScroll = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger)

      // Initialize Lenis smooth scroll (Official recommended settings)
      const lenis = new Lenis({
        duration: 1.2, // Scroll duration (smoothness) - prestige-expo style
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true, // Smooth mouse wheel
        wheelMultiplier: 1,
        syncTouch: false, // Better performance on mobile
        touchMultiplier: 2,
      })

      // Official GSAP ScrollTrigger integration (from Lenis docs)
      // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
      lenis.on('scroll', ScrollTrigger.update)

      // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
      // This ensures Lenis's smooth scroll animation updates on each GSAP tick
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000) // Convert time from seconds to milliseconds
      })

      // Disable lag smoothing in GSAP to prevent any delay in scroll animations
      gsap.ticker.lagSmoothing(0)

      // Cleanup function
      return () => {
        gsap.ticker.remove((time) => {
          lenis.raf(time * 1000)
        })
        lenis.destroy()
      }
    }

    initSmoothScroll()
  }, [])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gravitas+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
