
import * as React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";


const services = [
  {
      name:'Book Hotels',
      slug:'book-hotels',
  },
  {
      name:'Air Ticket Booking',
      slug:'book-air-tickets',
  }
]

function NavigationMenu() {
  return (
    <motion.div 
      initial={{ opacity: 0.7, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col pt-2 text-base w-full  p-small text-gray-200 bg-white shadow  shadow-white  border  border-gray-100/20"
    >
      <motion.div 
        className="flex relative flex-col p-3 mt-2 w-full bg-white transition-opacity  rounded shadow-[0px_8px_20px_rgba(195,121,255,0.1)]"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {services.map((item, index) => (
          <motion.div 
            key={index} 
            className={index > 0 ? "mt-1" : ""}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavigationItem slug={item.slug} title={item.name} />
          </motion.div>
        ))}
      
      </motion.div>
    </motion.div>
  );
}

function NavigationItem({ title, slug }) {
  return (
    <Link href={`/services/${slug}`}>
      <motion.div 
        className="group flex overflow-hidden z-0 gap-10 justify-between items-center px-2.5 py-2 w-full bg-white  rounded-sm "
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <div className="self-stretch my-auto p-small">{title}</div>
        <ChevronRight className="transition-transform duration-200 group-hover:translate-x-1 object-contain shrink-0 self-stretch my-auto w-4 aspect-square text-gray-200" />
      </motion.div>
    </Link>
  );
}

export default NavigationMenu;

