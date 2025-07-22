import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutVision = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-[1560px] space-y-6">
        {/* Vision Row */}
        <div className="relative w-full min-h-[300px] h-auto md:h-[400px] rounded-3xl overflow-hidden">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full  h-full object-cover"
          >
            <source src="/about/vision-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative h-full flex items-center">
            <div className="px-8 py-12 md:py-0 md:px-16 w-full">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-6xl">
                <h3 className="heading-1 font-normal mb-6 lg:mb-0 text-white lg:w-1/3">Vision</h3>
                <p className="text-base-1  text-white lg:w-2/3">
                  &ldquo;To be the leading travel partner in Sri Lanka, creating unforgettable journeys 
                  and delivering exceptional travel experiences by blending authenticity, convenience, 
                  and world-class service.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Arrow - Vision (Black) */}
          <div className="absolute top-8 right-8 w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-gray-200" />
          </div>
        </div>

        {/* Mission Row */}
        <div className="relative w-full min-h-[250px] h-auto md:h-[300px] text-gray-200 border border-[#F2F2F2] ml-auto mr-0 max-w-[95%] bg-[#FDFDFD] rounded-3xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)]">
          <div className="h-full flex items-center">
            <div className="px-8 py-12 md:py-0 md:px-16 w-full">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-6xl">
                <h3 className="heading-2 mb-6 font-normal lg:mb-0 lg:w-1/3">Mission</h3>
                <p className="text-base-2 lg:w-2/3">
                  &ldquo;Our mission is to inspire travelers to explore Sri Lanka and the world by offering 
                  thoughtfully curated travel packages, reliable tour guides, seamless hotel bookings, 
                  and hassle-free air ticketing services. At Ceylanray Travels, we are committed to 
                  exceeding customer expectations by providing personalized service, fostering local 
                  partnerships, and upholding the highest standards of integrity and professionalism.&rdquo;
                </p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-8 right-8 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Story Row */}
        <div className="relative w-full min-h-[200px] h-auto md:h-[250px] text-gray-200 ml-auto mr-0 max-w-[90%] border border-[#F2F2F2] bg-[#FDFDFD] rounded-3xl shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)]">
          <div className="h-full flex items-center">
            <div className="px-8 py-12 md:py-0 md:px-16 w-full">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-6xl">
                <h3 className="heading-2 mb-6 font-normal lg:mb-0 lg:w-1/3">Story</h3>
                <p className="text-base-2 lg:w-2/3">
                  Ceylanray Travels, founded in 2020 by Lahiru Manchanayake, is driven by a passion 
                  for showcasing Sri Lanka&apos;s beauty and culture while connecting travelers to the world. 
                  We offer expertly planned travel packages, guided tours, hotel bookings, and air 
                  ticketing, ensuring stress-free and meaningful journeys. Committed to sustainability, 
                  local communities, and exceptional customer care.
                </p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-8 right-8 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;