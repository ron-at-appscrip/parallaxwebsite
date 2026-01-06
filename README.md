# Interactive Parallax Website

A beautiful single-page interactive website built with Next.js, Tailwind CSS, and GSAP.

## Features

- **Hero Section**: Large banner image with cursor tracking parallax effect
- **About/Features Section**: Scroll-triggered fade and slide animations
- **Services Section**: Cards with hover animations
- **Gallery Section**: Portfolio images that animate in on scroll
- **Testimonials Section**: Sliding carousel with fade-in quotes
- **Contact Form**: Animated form with validation
- **Footer**: Responsive footer with links and social media

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GSAP (GreenSock Animation Platform) with ScrollTrigger
- Lenis (Smooth Scroll Library) - [lenis.darkroom.engineering](https://lenis.darkroom.engineering/)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/          # React components for each section
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper with global styles
│   └── index.tsx      # Main page assembling all sections
├── styles/             # Global CSS styles
└── public/             # Static assets (images, etc.)
```

## Animations (Powered by GSAP ScrollTrigger + Lenis)

- **Smooth Scroll**: Lenis provides butter-smooth scrolling experience (like prestige-expo.com)
- **Section Pinning**: Sections pin during scroll animations, then unpin to next section
- **Cursor Tracking**: Hero section image moves with cursor movement using GSAP
- **Scroll Animations**: Sections fade and slide in when scrolled into view with ScrollTrigger
- **Text Animations**: Text slides in from different directions as you scroll (prestige-expo style)
- **Hover Effects**: Cards and buttons have smooth hover animations with GSAP
- **Parallax**: Background images move at different speeds for depth effect
- **Sequential Animations**: Content appears sequentially as you scroll down the page
- **Scrub Animations**: Content animates smoothly with scroll position (scrub: true)

## Responsive Design

All sections are fully responsive and optimized for:
- Mobile devices (touch support)
- Tablets
- Desktop screens

## License

MIT

# parallaxwebsite
