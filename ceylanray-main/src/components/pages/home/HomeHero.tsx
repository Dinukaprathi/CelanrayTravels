'use client'

import { Button } from '@/components/common/Button'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const SLIDES = [
  '/home/slideshow-home-1.jpg',
  '/home/slideshow-home-2.jpg',
  '/home/slideshow-home-3.jpg',
  '/home/beach-homepage.jpg',
]

const HomeHero = () => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current)
      setCurrent((prevIdx) => (prevIdx + 1) % SLIDES.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <section className="w-full">
      <div className="container mx-auto flex pb-4 w-full items-end max-w-[1560px] h-[35svh] max-sm:min-h-[475px] min-h-[250px] px-0 max-[1560px]:px-4">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-8 max-lg:gap-2">
          {/* Left side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2 lg:max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center pl-2 gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
              <span className="text-gray-600 p-small">Globally Connected</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="heading-1 tracking-tight font-normal"
            >
              Custom Travel Experiences,
              <br />
              From Dream to Destination
            </motion.h1>
          </motion.div>

          {/* Right side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col gap-4 max-lg:max-w-[400px] lg:max-w-[27%] text-gray-200 mt-4 max-lg:mt-0"
          >
            <p className="text-gray-600 p-small">
              Your complete travel companion for flights, hotels, and curated holiday packages
            </p>
            <Button className='w-fit px-14 duration-200' variant="decorative">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className='drop-shadow-md'
              >
                Book now
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>
      {/* Smooth Slideshow background with AnimatePresence */}
      <div className="w-full h-[75svh] min-h-[500px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full z-10"
          >
            <Image
              src={SLIDES[current]}
              alt="Travel destination"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default HomeHero
