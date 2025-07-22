"use client";
import TravelEnquiryForm from "@/components/pages/contact/TravelEnquiryForm";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <main className="min-h-screen  p pt-48 pb-20 bg-neutral-50/50">
      {/* Banner Image with Overlay Text */}
      <div className="relative w-full h-[260px] md:h-[340px] rounded-none overflow-hidden mt-0 mb-10">
        <img
          src="https://images.pexels.com/photos/1998434/pexels-photo-1998434.jpeg"
          alt="About us Banner"
          className="w-full h-full object-cover rounded-none block"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">About us</h1>
          <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto">
            Connecting travelers with the heart of Sri Lanka since 2020, we blend authentic experiences with world-class service to create journeys that last a lifetime.
          </p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 max-w-[1560px]"
      >
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h1 className="heading-1 mb-6">Plan Your Journey</h1>
          <p className="p-large text-neutral-600">
            Ready to explore Sri Lanka? Tell us about your travel plans, and our experts will help create your perfect itinerary.
          </p>
        </div>
        <TravelEnquiryForm />
      </motion.div>
    </main>
  );
}
