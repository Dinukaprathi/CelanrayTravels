import React from 'react';
import Image from 'next/image';

const AboutAuthority = () => {
  const images = [
    {
      src: '/about/1.webp',
      alt: 'Team collaboration',
    },
    {
      src: '/about/2.webp', 
      alt: 'Team meeting',
    },
    {
      src: '/about/3.webp',
      alt: 'Team discussion',
    }
  ];

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-[1560px]">
        <div className="max-w-3xl mb-12 mx-auto text-center">
          <h3 className="text-sm uppercase tracking-wider text-primary mb-4">
            About Ceylanray
          </h3>
          <h2 className="heading-2 mb-6">
            Your Gateway to Sri Lankan Adventures
          </h2>
          <p className="text-base-2">
            We are Ceylanray, a premier Travel and Tourism company in Sri Lanka. As a dedicated team 
            of Travel Specialists, Local Experts, Tour Guides, and Hospitality Professionals, we craft 
            unforgettable journeys through our comprehensive flight bookings, hotel reservations, and 
            curated travel packages across the paradise island.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative h-[240px] md:h-[280px] rounded-lg overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAuthority;