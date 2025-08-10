"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const events = [
  {
    id: 1,
    title: "Sinhala & Tamil New Year",
    subtitle: "Aluth Avurudu",
    when: "April 13–14",
    type: "Cultural",
    description: "Celebrated by both Sinhalese and Tamil communities to mark the traditional new year.",
    highlights: "Auspicious rituals, sweetmeats, traditional games, firecrackers, and family gatherings.",
    nationwide: true,
    image: "/home/events/Firefly_Generate a realistic image for Sinhala & Tamil New Year (Aluth Avurudu) 913171.jpg"
  },
  {
    id: 2,
    title: "Vesak Festival",
    subtitle: "Buddhist Religious",
    when: "Full moon in May",
    type: "Buddhist Religious",
    description: "Celebrates the birth, enlightenment, and passing away of Lord Buddha.",
    highlights: "Vesak lanterns, pandals (thoranas), alms giving (dansal), and temple visits.",
    nationwide: true,
    image: "/home/events/Vesak-Poya-Banner.jpg"
  },
  {
    id: 3,
    title: "Independence Day",
    subtitle: "National Celebration",
    when: "February 4",
    type: "National",
    description: "Marks Sri Lanka's independence from British rule in 1948.",
    highlights: "Parades, flag hoisting, presidential speeches, cultural programs.",
    nationwide: true,
    image: "/home/events/Firefly_Generate a realistic image for Independence day of Sri Lanka as a poster 4th of Febru 925162.jpg"
  },
  {
    id: 4,
    title: "Deepavali (Diwali)",
    subtitle: "Festival of Lights",
    when: "October/November",
    type: "Hindu Religious",
    description: "Festival of lights celebrated by Tamil Hindus.",
    highlights: "Oil lamps, kolam decorations, sweets, temple rituals.",
    nationwide: false,
    image: "/home/events/deepavali.jpg"
  },
  {
    id: 5,
    title: "Christmas",
    subtitle: "Christian Celebration",
    when: "December 25",
    type: "Christian Religious",
    description: "Celebrates the birth of Jesus Christ.",
    highlights: "Midnight mass, Christmas trees, carols, lights, gifts.",
    nationwide: true,
    image: "/home/events/christmas.jpg"
  },
  {
    id: 6,
    title: "Eid Festivals",
    subtitle: "Eid al-Fitr & Eid al-Adha",
    when: "Varies with Islamic calendar",
    type: "Muslim Religious",
    description: "Eid al-Fitr marks end of Ramadan, Eid al-Adha commemorates Ibrahim's sacrifice.",
    highlights: "Prayers, feasting, community events.",
    nationwide: true,
    image: "/home/events/eid.jpg"
  },
  {
    id: 7,
    title: "Kandy Esala Perahera",
    subtitle: "Festival of the Tooth",
    when: "July/August",
    type: "Cultural/Buddhist",
    description: "A grand procession in Kandy to honor the Sacred Tooth Relic of Lord Buddha.",
    highlights: "Elephants, dancers, drummers, fire shows, torchbearers.",
    nationwide: true,
    image: "/home/events/esala perahara.png"
  },
  {
    id: 8,
    title: "Poson Poya",
    subtitle: "Arrival of Buddhism",
    when: "Full moon in June",
    type: "Buddhist Religious",
    description: "Celebrates the arrival of Buddhism to Sri Lanka by Mahinda Thero.",
    highlights: "Pilgrimages to Anuradhapura & Mihintale, alms giving, lanterns.",
    nationwide: true,
    image: "/home/events/poson_poya.jpg"
  },
  {
    id: 9,
    title: "Thai Pongal",
    subtitle: "Harvest Festival",
    when: "January 14–16",
    type: "Tamil Hindu Cultural",
    description: "Harvest festival celebrated by Tamil Hindus.",
    highlights: "Pongal dish, sun worship, kolams, traditional rituals.",
    nationwide: false,
    image: "/home/events/thaipongal.jpg"
  }
];

const BestEvent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentEvent = events[currentIndex];

  return (
    <section className="w-full pb-8 pt-32">
      <div className="mx-auto max-w-[1560px] px-4">
        <div>
          <h2 className="heading-1 mb-3 text-black">Sri Lanka's Cultural Festivals</h2>
          <p className="body-1 mb-8 text-gray-200 max-w-xl">
            Experience the rich cultural diversity of Sri Lanka through its vibrant festivals and celebrations
          </p>
        </div>
        
        <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
          {/* Background Image */}
          <Image 
            src={currentEvent.image} 
            alt={currentEvent.title} 
            fill 
            className="object-cover transition-all duration-1000" 
            priority 
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
            <div className="flex h-full flex-col justify-end p-8 md:p-12">
              <div className="max-w-2xl">
                {/* Event Details */}
                <div className="mb-8">
                  <div className="mb-2">
                    <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-2">
                      {currentEvent.type}
                    </span>
                    {currentEvent.nationwide && (
                      <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full ml-2">
                        Nationwide
                      </span>
                    )}
                  </div>
                  
                  <h3 className="heading-3 mb-2 text-white">
                    {currentEvent.title}
                    {currentEvent.subtitle && (
                      <span className="block text-blue-300 text-lg font-normal">
                        {currentEvent.subtitle}
                      </span>
                    )}
                  </h3>

                  <p className="text-sm text-blue-200 mb-2">
                    <strong>When:</strong> {currentEvent.when}
                  </p>

                  <p className="body-2 max-w-xl text-gray-100 mb-3">
                    {currentEvent.description}
                  </p>

                  <p className="text-sm text-gray-200">
                    <strong>Highlights:</strong> {currentEvent.highlights}
                  </p>
                </div>

                {/* CTA Button */}
                <Link 
                  href="/services/book-air-tickets" 
                  className="font-semibold inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-base text-black transition-all hover:bg-white/90"
                >
                  Book Ticket
                  <ArrowRight className="w-5 h-5 text-gray-200" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={goToPrevious}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={goToNext}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-lg transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Auto-play Toggle */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-600 text-white'
              }`}
            >
              {isAutoPlaying ? 'Auto' : 'Manual'}
            </button>
          </div>

          {/* Slide Counter */}
          <div className="absolute top-4 left-4">
            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {events.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestEvent;
