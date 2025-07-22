'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { motion } from 'framer-motion'

const HomeAboutFirst = () => {
  return (
    <section className="w-full max-w-[1560px] mx-auto px-2 py-2 md:py-2 max-lg:pt-12">
      <div className="flex gap-2 max-lg:flex-col">
        {/* First Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative w-[70%] max-lg:w-full h-[300px] max-lg:h-[200px] aspect-square group cursor-pointer overflow-hidden rounded-2xl"
        >
          <div className="relative w-full h-full">
            <Image
              src="/home/homeAboutFirst/homeAboutFirst-1.webp"
              alt="Summer Promo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute flex justify-between w-full bottom-3 px-4">
              <p className="p-large font-semibold text-white heading-3 mb-2">Summer Promo</p>
              <div className="flex items-center w-8 h-8 gap-2 bg-white shrink-0 rounded-full p-2">
                <ArrowRight 
                  className="w-4 h-4 text-primary transition-transform rotate-45 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Let's Explore Together Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-primary w-full xl:min-w-[500px] max-lg:h-[300px] text-white py-5 px-8 flex flex-col justify-between rounded-2xl"
        >
          <div className='flex justify-between items-center'>
              <h3 className="heading-1 ">Let&apos;s Explore Together</h3>
              <Button className='h-fit px-14' variant='decorative'><span className='h-6 block'></span></Button>
          </div>
          <p className="body-1 mb-8 p=small max-w-xl">
            At Ceylanray, the world is Our playground, and every journey is an opportunity to discover something new. Join us as we explore the wonders of the world and create memories that will last a lifetime
          </p>
        </motion.div>

        {/* Third Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="relative w-full max-lg:hidden group cursor-pointer overflow-hidden rounded-2xl"
        >
          <div className="relative h-[200px] lg:h-[450px] ">
            <Image
              src="/home/homepage-mountain.jpg"
              alt="Summer Photo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute flex flex-col justify-between h-full  p-4 left-6">
            <p className="text-white p-small body-2 max-w-[80%] max-lg:max-w-xl">
                &quot;Immerse yourself in the serene beauty of towering mountains and lush greenery, a paradise for nature lovers and adventurers. Book your journey with Ceylanray Travels for a seamless and unforgettable experience!&quot;
              </p>
              <h3 className="text-white heading-3 p-large font-semibold">Summer Photo</h3>
             
            </div>
          </div>
        </motion.div>

        {/* Fourth Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="relative max-lg:w-full w-[60%] h-[250px] max-lg:h-[150px] group cursor-pointer overflow-hidden rounded-2xl"
        >
          <div className="relative h-full">
            <Image
              src="/home/homeAboutFirst/homeAboutFirst-4.webp"
              alt="Summer Promo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 " />
            <div className="absolute flex justify-between w-full bottom-3 px-4">
              <p className="p-large font-semibold text-white heading-3 mb-2"></p>
              <div className="flex items-center w-8 h-8 gap-2  bg-white shrink-0 rounded-full p-2">
                <ArrowRight 
                  className="w-4 h-4 text-primary transition-transform rotate-45 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeAboutFirst
