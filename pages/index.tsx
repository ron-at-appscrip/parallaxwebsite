import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import HeroParallaxSection from '../components/HeroParallaxSection'
import AboutSection from '../components/AboutSection'
import AppleCardsCarouselSection from '../components/AppleCardsCarouselSection'
import ServicesSection from '../components/ServicesSection'
import GallerySection from '../components/GallerySection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

/**
 * Main Index Page
 * 
 * This page assembles all sections into a single-page website:
 * - Hero Section: Large banner with cursor tracking parallax
 * - About Section: Features with scroll animations
 * - Services Section: Cards with hover animations
 * - Gallery Section: Portfolio images with scroll animations
 * - Testimonials Section: Sliding quotes carousel
 * - Contact Section: Form with input fields
 * - Footer: Basic info and links
 * 
 * All sections are responsive and include animations powered by GSAP ScrollTrigger.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>Interactive Parallax Website | Next.js + GSAP</title>
        <meta
          name="description"
          content="A beautiful single-page interactive website built with Next.js, Tailwind CSS, and GSAP featuring scroll animations, cursor tracking, and parallax effects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        {/* Hero Section - Cursor tracking parallax effect */}
        <HeroSection />

        {/* Hero Parallax Section - Scroll effect with rotation and translation */}
        <HeroParallaxSection />

        

        {/* Apple Cards Carousel Section - 8 images in carousel */}
        {/* <AppleCardsCarouselSection /> */}

        {/* Services Section - Hover animations on cards */}
        <ServicesSection />

        {/* Gallery/Portfolio Section - Scroll animations on images */}
        {/* <GallerySection /> */}

        {/* Testimonials Section - Sliding/fade-in quotes */}
        <TestimonialsSection />

        {/* Contact Form Section - Input fields and submit button */}
        {/* <ContactSection /> */}

        {/* Footer - Basic info and links */}
        <Footer />
      </main>
    </>
  )
}

