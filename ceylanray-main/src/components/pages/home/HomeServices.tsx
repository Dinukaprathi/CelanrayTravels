"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Plane, Hotel, Package, Calendar, Shield, Globe } from 'lucide-react'
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

const HomeServices = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const services = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Find the best deals on flights worldwide with our exclusive partnerships",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
      color: "primary",
      delay: 0
    },
    {
      icon: Hotel,
      title: "Hotel Reservations", 
      description: "Luxury accommodations and boutique hotels curated for your comfort",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
      color: "gold",
      delay: 0.2
    },
    {
      icon: Package,
      title: "Travel Packages",
      description: "Complete vacation packages with flights, hotels, and guided tours",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
      color: "green",
      delay: 0.4
    }
  ]

  const features = [
    {
      icon: Calendar,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your travel needs"
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your data and payments are protected with advanced security"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access to destinations and services worldwide"
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-primary"></div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              What We Offer
            </span>
            <div className="w-12 h-px bg-gradient-primary"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Your Journey, <span className="hero-text">Our Expertise</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From planning to execution, we handle every detail of your travel experience
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Icon */}
                <div className={`absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center ${
                  service.color === 'primary' ? 'bg-primary/90' : 
                  service.color === 'gold' ? 'bg-gold/90' : 'bg-green-500/90'
                } backdrop-blur-sm transition-transform group-hover:scale-110`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">{service.description}</p>
                  
                  <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div key={feature.title} className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HomeServices