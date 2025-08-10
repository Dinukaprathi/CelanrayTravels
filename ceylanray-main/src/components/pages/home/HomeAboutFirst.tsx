"use client";

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// Custom useInView hook to replace react-intersection-observer
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

const HomeAbout = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} transition={{ duration: 0.6 }} className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-primary"></div>
                <span className="text-primary font-medium tracking-wider uppercase text-sm">
                  About Ceylanray
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Let's Explore 
                <span className="hero-text"> Together</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                At Ceylanray, the world is our playground, and every journey is an opportunity 
                to discover something new. Join us as we explore the wonders of the world and 
                create memories that will last a lifetime.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.6 }} className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/10">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-2xl text-primary">250+</h3>
                <p className="text-sm text-muted-foreground">Destinations</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gold/5 border border-gold/20">
                <Users className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-bold text-2xl text-gold">10K+</h3>
                <p className="text-sm text-muted-foreground">Happy Travelers</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-green-500/5 border border-green-500/20">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-2xl text-green-600">4.9</h3>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.6 }}>
              <Link href="/destinations">
                <Button size="lg" variant="default" className="group">
                  <span>Discover More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="lg:col-span-5">
            <motion.div 
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4 h-[600px]"
            >
              <div className="space-y-4">
                <motion.div 
                  className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/culture.jpg"
                    alt="Cultural destination"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Cultural Tours</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/adventure.jpg"
                    alt="Adventure travel"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Adventure</p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4 mt-8">
                <motion.div 
                  className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/beach.jpg"
                    alt="Beach destination"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Beach Escapes</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/mountain.png"
                    alt="Mountain destination"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Mountains</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeAbout