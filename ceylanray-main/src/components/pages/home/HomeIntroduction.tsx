"use client";

import { motion } from 'framer-motion'
import { Play, Award, Globe, Heart } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'

// Simplified useInView hook
const useInView = (options = {}) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.1, ...options }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return [ref, inView] as [React.RefObject<HTMLElement>, boolean]
}

const HomeIntroduction = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const highlights = [
    {
      icon: Award,
      title: "UNESCO Heritage",
      description: "Sigiriya Rock Fortress - A 5th century marvel of ancient engineering"
    },
    {
      icon: Globe,
      title: "Cultural Immersion",
      description: "Experience authentic Sri Lankan culture and traditions"
    },
    {
      icon: Heart,
      title: "Personalized Journey",
      description: "Tailored experiences that match your travel dreams"
    }
  ]

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-r from-primary/5 via-background to-gold/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-primary"></div>
                <span className="text-primary font-medium tracking-wider uppercase text-sm">
                  Introduction
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Welcome to
                <span className="hero-text"> Ceylanray Travels</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                From serene beach getaways to immersive cultural tours and exhilarating adventures, 
                we craft personalized journeys that match your travel style. Let us transform your 
                wanderlust into lasting memories.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full h-auto"
                poster="/home/homepage-mountain.jpg"
                preload="metadata"
                muted
                loop
              >
                <source src="/home/sigiriya.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play Button Overlay */}
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                  {isPlaying ? (
                    <div className="w-6 h-6 border-2 border-white border-l-transparent border-r-transparent rounded-sm"></div>
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeIntroduction;