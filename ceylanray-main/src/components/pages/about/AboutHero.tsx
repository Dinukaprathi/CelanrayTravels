"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";

const AboutHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.8], [0.9, 1]);

    return (
        <div ref={containerRef} className="relative mb-32">
            {/* Main Content - Increased top padding */}
            <div className="container mx-auto max-w-[1560px] px-4 pt-52 pb-32 md:pt-48 md:pb-20">
                <div className="flex flex-col items-center text-center">
                    <h1 className="heading-1 font-medium mb-6">About us</h1>
                    <p className="body-1 max-w-[800px] text-gray-200">
                        Connecting travelers with the heart of Sri Lanka since 2020, we blend authentic experiences with world-class service to create
                        journeys that last a lifetime.
                    </p>
                </div>
            </div>

            {/* Video Container */}
            <div className="relative w-full h-[95vh] overflow-hidden ">
                <div className="mx-auto max-w-[1560px] relative">
                    <motion.div className="relative  w-[100%] md:w-[60%]   mx-auto" style={{ scale }}>
                        <div className="relative  w-full">
                            <video 
                                className="w-full " 
                                loop 
                                playsInline
                                controls
                                autoPlay
                                
                            >
                                <source src="/about/aboutUsIntroVideo.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
