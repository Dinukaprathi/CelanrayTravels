"use client";
import TravelEnquiryForm from "@/components/pages/contact/TravelEnquiryForm";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <main className="min-h-screen pt-48 pb-20 bg-neutral-50/50">
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
