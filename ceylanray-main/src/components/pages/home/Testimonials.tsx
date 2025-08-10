"use client"

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

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

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "Ceylanray made our Sri Lankan adventure absolutely magical. Every detail was perfectly planned, from the cultural tours to the luxury accommodations.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b593?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "Professional service and incredible attention to detail. The team went above and beyond to ensure our honeymoon was unforgettable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Emma Williams",
    location: "London, UK",
    rating: 5,
    text: "From booking to the final goodbye, everything was seamless. The local insights and personalized recommendations made all the difference.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "David Kumar",
    location: "Melbourne, Australia",
    rating: 5,
    text: "Outstanding value for money and exceptional service. The cultural tours were enlightening and the accommodations were luxurious.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Lisa Zhang",
    location: "Singapore",
    rating: 5,
    text: "Ceylanray turned our family vacation into a lifetime memory. The kids loved every moment and so did we. Highly recommended!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
]

const HomeTestimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-gold"></div>
            <span className="text-gold font-medium tracking-wider uppercase text-sm">
              Testimonials
            </span>
            <div className="w-12 h-px bg-gradient-gold"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            From Our <span className="hero-text">Community</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here's what fellow travelers had to say about their journeys with us
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { 
                  opacity: index === activeIndex ? 1 : 0.6,
                  scale: index === activeIndex ? 1 : 0.95,
                  y: index === activeIndex ? 0 : 20
                } : { opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className={`relative p-8 rounded-2xl transition-all duration-500 ${
                  index === activeIndex 
                    ? 'bg-card shadow-elegant border-2 border-primary/20' 
                    : 'bg-card/50 shadow-soft border border-border/30'
                }`}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-2 mt-12"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary shadow-glow scale-125' 
                    : 'bg-muted hover:bg-primary/60'
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">10K+</h3>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gold mb-2">4.9/5</h3>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-green-600 mb-2">250+</h3>
            <p className="text-muted-foreground">Destinations</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-purple-600 mb-2">15+</h3>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeTestimonials