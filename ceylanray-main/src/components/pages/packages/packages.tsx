"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import OfferCountdown from './OfferCountdown';

export interface Offer {
  id: string;
  title: string;
  description?: string;
  packageId: string;
  priceWithOffer: number;
  priceWithoutOffer: number;
  startDate: string;
  endDate: string;
  imageURL?: string; // Added for offers
  duration?: string; // Added for offers
  category?: string; // Added for offers
  interests?: string; // Added for offers
  inclutions?: string; // Added for offers
}

export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  category: string;
  interests: string[];
  inclusions: string[];
  offers?: Offer[];
}

const filterOptions = {
  demand: ['Beaches', 'Cultural Sites', 'Wildlife', 'Hill Country'],
  season: ['Kandy Esala Perahera', 'Whale Watching'],
  duration: ['3 Days', '5 Days', '7 Days', '14 Days'],
  category: ['Luxury', 'Mid-range', 'Budget'],
  interests: ['Adventure', 'Ayurveda', 'Honeymoon', 'Heritage', 'Culture', 'Wildlife'],
};

type PackagesProps = {
  packages: Package[];
};

interface ClassicSafariPackageProps {
  title: string;
  subtitle: string;
  duration: string;
  category: string;
  type: string;
  features: string[];
  price: string;
  location: string;
  image: string;
  id: string;
  offers?: Offer[];
  inclutions?: string; // For offers
  interests?: string; // For offers
}

export const ClassicSafariPackage = ({
  title,
  subtitle,
  duration = "3 Days",
  category = "Premium",
  type = "Adventure",
  features = [],
  price,
  location,
  image,
  id,
  offers = [],
  inclutions = '',
  interests = '',
}: ClassicSafariPackageProps) => {
  // Helper to check if description is longer than 5 lines (approx 300 chars as a fallback)
  const isLong = subtitle && subtitle.length > 300;
  // Find the latest valid offer (if any)
  const now = new Date();
  const validOffer: Offer | undefined = offers.find(
    (offer) => new Date(offer.startDate) <= now && new Date(offer.endDate) >= now
  );
  // Helper to format price with a single $ sign
  const formatPrice = (price: string) => price && price.startsWith('$') ? price : `$${price}`;

  // Always use a fallback image if none is provided
  const bgImage = validOffer
    ? validOffer.imageURL || image || '/fallback.jpg'
    : image || '/fallback.jpg';

  // --- UNIFIED CLASSIC CARD LAYOUT ---
  return (
    <div className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-classic transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-classic-gold/20 relative min-h-[400px] flex items-stretch">
      {/* Removed offer badge from top left */}
      {/* Full background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-lg text-center tracking-tight leading-tight">{validOffer ? validOffer.title : title}</h2>
          <p className="text-white text-base font-medium italic mb-4 text-center drop-shadow-lg opacity-90 line-clamp-5">{validOffer ? validOffer.description : subtitle}</p>
          {isLong && !validOffer && (
            <div className="flex justify-center mb-2">
              <Link href={`/packages/${id}`} className="text-primary underline font-semibold text-xs">Read more</Link>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full border border-blue-200">{validOffer ? validOffer.duration : duration}</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full border border-purple-200">{validOffer ? validOffer.category : category}</span>
            {(validOffer ? (validOffer.interests ? String(validOffer.interests).split(',') : []) : (type ? [type] : [])).map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full border border-gray-200">{tag.trim()}</span>
            ))}
          </div>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow-lg mt-4">
          {/* Inclusions label and offer badge row */}
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-primary text-left tracking-wide">Inclusions:</h4>
            {validOffer && (
              <div className="flex flex-col items-end gap-0">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-7 w-7">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-7 w-7 bg-blue-500 items-center justify-center text-white text-base font-bold shadow">%</span>
                  </span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold text-xs shadow animate-bounce uppercase">Offer</span>
                </div>
                <span className="text-xs font-bold text-blue-500 mt-1 align-middle">Limited Time!</span>
              </div>
            )}
          </div>
          <ul className="space-y-1 mb-6">
            {(validOffer ? (validOffer.inclutions ? String(validOffer.inclutions).split(',') : []) : features).map((feature, index) => (
              <li key={index} className="text-gray-700 text-sm flex items-center font-crimson">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start pt-2 border-t border-gray-200 gap-0">
            <div className="text-left w-full">
              <div className="text-xs text-gray-500 font-crimson uppercase tracking-wide mb-1">STARTING FROM</div>
              {validOffer ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-400 line-through">{formatPrice(String(validOffer.priceWithoutOffer))}</span>
                  <span className="text-2xl font-extrabold text-blue-600 animate-pulse drop-shadow-lg">{formatPrice(String(validOffer.priceWithOffer))}</span>
                </div>
              ) : (
                <div className="text-xl font-bold text-primary">{formatPrice(String(price))}</div>
              )}
            </div>
            {/* Offer expiry timeline (only if offer) */}
            {validOffer && (
              <OfferCountdown endDate={validOffer.endDate} />
            )}
            <Link href={`/packages/${id}`} className="mt-1 w-full">
              <Button variant="default" size="lg" className="font-playfair px-6 py-2 w-full text-sm">Reserve Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Packages: React.FC<PackagesProps> = ({ packages }) => {
  const [filters, setFilters] = useState({
    demand: '',
    season: '',
    duration: '',
    category: '',
    interests: '',
  });
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(packages);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFilteredPackages(packages);
  }, [packages]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    let result = packages;
    if (filters.demand) {
      result = result.filter(pkg =>
        filters.demand === 'Beaches' ? pkg.interests.includes('Beaches') :
        filters.demand === 'Cultural Sites' ? pkg.interests.includes('Culture') || pkg.interests.includes('Heritage') :
        filters.demand === 'Wildlife' ? pkg.interests.includes('Wildlife') :
        filters.demand === 'Hill Country' ? pkg.title.toLowerCase().includes('hill') :
        true
      );
    }
    if (filters.season) {
      result = result.filter(pkg =>
        filters.season === 'Kandy Esala Perahera' ? pkg.description.includes('Kandy Esala Perahera') :
        filters.season === 'Whale Watching' ? pkg.description.toLowerCase().includes('whale') :
        true
      );
    }
    if (filters.duration) {
      result = result.filter(pkg => pkg.duration === filters.duration);
    }
    if (filters.category) {
      result = result.filter(pkg => pkg.category === filters.category);
    }
    if (filters.interests) {
      result = result.filter(pkg => pkg.interests.includes(filters.interests));
    }
    setFilteredPackages(result);
  };

  return (
    <section className="w-full max-w-[1560px] mx-auto px-0 pt-0 pb-10">
      {/* Banner Image with Overlay Text */}
      <div className="relative w-full h-[400px] md:h-[520px] rounded-none overflow-hidden mt-0 mb-10">
        <img
          src="https://cdn.pixabay.com/photo/2016/04/30/18/18/anuradhapura-1363496_1280.jpg"
          alt="Travel Packages Banner"
          className="w-full h-full object-cover rounded-none"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">✨ Discover Our Travel Packages</h2>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto drop-shadow">
            At Celanray Travels and Tours, we offer a wide range of thoughtfully curated travel packages tailored to suit every traveler’s dream. Whether you're craving a relaxing beach escape, an adventurous trek, or a cultural heritage journey, our budget-friendly and customizable packages guarantee unforgettable experiences across Sri Lanka and the Middle East. Let us handle the planning while you focus on making memories that last a lifetime.
          </p>
        </div>
      </div>
      <h1 className="heading-1 text-center mb-8 text-black">Our Travel Packages</h1>
      {/* Filter Bar (UI only) */}
      <div className="flex flex-nowrap gap-3 justify-center mb-14 mt-6 overflow-x-auto scrollbar-hide items-end">
        {Object.entries(filterOptions).filter(([key]) => key !== 'demand').map(([key, options]) => (
          <div key={key} className="flex gap-1 items-center">
            <span className="font-semibold text-sm text-gray-700 capitalize min-w-[60px]">{key}:</span>
            <select
              name={key}
              value={filters[key as keyof typeof filters]}
              onChange={handleChange}
              className="border border-gray-200 rounded px-2 py-2 text-sm text-gray-700 bg-white focus:outline-primary min-w-[100px] h-9"
            >
              <option value="">All</option>
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={handleFilter}
          className="ml-2 px-4 py-2 rounded bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 shadow h-9 min-w-[70px]"
        >
          Filter
        </button>
      </div>
      {/* Packages Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 p-large">Loading...</div>
        ) : filteredPackages.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 p-large">Packages Will be coming soon...</div>
        ) : (
          filteredPackages.map((pkg: Package) => {
            // Safely handle price for display
            const displayPrice = pkg.price ?? (pkg as any).priceWithOffer ?? '';
            const priceStr = displayPrice.toString();
            const formattedPrice = priceStr.startsWith('$') ? priceStr : `$${priceStr}`;
            return (
            <ClassicSafariPackage
              key={pkg.id}
              id={pkg.id}
              title={pkg.title}
              subtitle={pkg.description}
              duration={pkg.duration}
              category={pkg.category}
              type={pkg.interests[0] || "Adventure"}
              features={pkg.inclusions}
                price={formattedPrice}
              location={pkg.category}
              image={pkg.image}
                offers={pkg.offers ?? []}
                inclutions={(pkg as any).inclutions ?? ''}
                interests={(pkg as any).interests ?? ''}
            />
            );
          })
        )}
      </div>
    </section>
  );
};

export default Packages; 