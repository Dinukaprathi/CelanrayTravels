"use client";
import { motion } from 'framer-motion';
import { FaPercent, FaTag } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Loading from '@/components/ui/loading';
import SafeImage from './SafeImage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import OfferCountdown from '../packages/OfferCountdown';

interface Package {
  id: string;
  name?: string;
  title?: string;
  description: string;
  price: string | number;
  duration: string;
  imageUrl?: string;
  image?: string;
  category: string;
  inclusions?: string[] | string;
  interests?: string[] | string;
  inclutions?: string[] | string;
  offers?: {
    endDate: string;
    priceWithOffer: string;
    priceWithoutOffer: string;
  }[];
  type?: 'with-offer' | 'without-offer';
  priceWithOffer?: string;
  priceWithoutOffer?: string;
  endDate?: string;
}

export default function HomeRecommended() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching packages from API...');
        
        const response = await fetch('/api/packages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response data:', data);
        
        // Handle the actual API response structure
        let allPackages: Package[] = [];
        
        if (data.packagesWithoutOffers && Array.isArray(data.packagesWithoutOffers)) {
          allPackages = [...allPackages, ...data.packagesWithoutOffers];
        }
        
        if (data.packagesWithOffers && Array.isArray(data.packagesWithOffers)) {
          allPackages = [...allPackages, ...data.packagesWithOffers];
        }
        
        // Take only the first 4 packages
        const limitedPackages = allPackages.slice(0, 4);
        console.log('Setting packages:', limitedPackages);
        setPackages(limitedPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setError('Failed to load packages');
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="w-full pb-8 pt-32">
      <div className="mx-auto max-w-[1560px] px-4">
        <div>
          <h2 className="heading-1 mb-3 text-black">Recommended For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <Loading variant="dots" size="lg" text="Loading recommended packages..." />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <div className="text-red-500 mb-2">{error}</div>
              <div className="text-gray-500">Please try again later</div>
            </div>
          ) : packages.length === 0 ? (
            <div className="col-span-full text-lg text-gray-500 text-center py-12">
              Recommended packages will be here soon...
            </div>
          ) : (
            packages.map((pkg, idx) => {
              const isOffer = pkg.type === 'with-offer' || pkg.priceWithOffer || (pkg.offers && pkg.offers.length > 0);
              const formatPrice = (price: string | number) => {
                const priceStr = String(price);
                return priceStr && priceStr.startsWith('$') ? priceStr : `$${priceStr}`;
              };
              
              // Get offer details
              const offer = pkg.offers && pkg.offers.length > 0 ? pkg.offers[0] : null;
              const priceWithOffer = pkg.priceWithOffer || (offer ? offer.priceWithOffer : null);
              const priceWithoutOffer = pkg.priceWithoutOffer || (offer ? offer.priceWithoutOffer : null);
              const endDate = pkg.endDate || (offer ? offer.endDate : null);
              
              return (
                <motion.div
                  key={pkg.id}
                  className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-2xl bg-white/10 flex flex-col justify-end backdrop-blur-lg border border-white/20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, type: 'spring', stiffness: 80 }}
                >
                  {/* Background Image */}
                  <SafeImage src={pkg.imageUrl || pkg.image || '/fallback.jpg'} alt={pkg.title || pkg.name || 'Package'} className="absolute inset-0 w-full h-full object-cover scale-105" />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {/* Content Overlay */}
                  <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                    <div>
                      <h3 className="text-white text-2xl font-extrabold mb-2 drop-shadow-lg pr-24 flex items-center gap-2">
                        <FaTag className="text-yellow-400 text-xl" />
                        {pkg.title || pkg.name}
                      </h3>
                      <p className="text-white/90 text-base mb-4 drop-shadow-lg line-clamp-2 font-medium">
                        {pkg.description}
                      </p>
                    </div>
                    <div className="mt-auto w-full flex flex-col gap-2">
                      {isOffer && (
                        <div className="relative w-full flex flex-col items-start gap-1 mb-2">
                          {/* Blurred background highlight */}
                          <div className="absolute inset-0 rounded-xl bg-white/30 backdrop-blur-md z-0" />
                          <div className="flex items-center gap-2 relative z-10 p-2">
                            <span className="relative flex h-8 w-8 items-center justify-center">
                              <motion.span
                                className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              />
                              <span className="relative inline-flex rounded-full h-8 w-8 bg-blue-500 items-center justify-center text-white text-lg font-bold shadow">
                                <FaPercent />
                              </span>
                            </span>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold text-xs shadow animate-bounce uppercase tracking-wide flex items-center gap-1">
                              <FaTag className="text-white text-sm" /> Offer
                            </span>
                            {endDate && (
                              <span className="ml-3">
                                <OfferCountdown endDate={endDate} />
                              </span>
                            )}
                          </div>
                          <div className="relative z-10 p-2 pt-0">
                            <div className="bg-white/90 text-black px-3 py-1 rounded-md font-semibold text-lg shadow flex items-center gap-2">
                              <span className="text-gray-400 line-through">{formatPrice(priceWithoutOffer || pkg.price)}</span>
                              <span className="text-blue-600 font-bold text-xl">{formatPrice(priceWithOffer || pkg.price)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <Link href={`/packages/${pkg.id}`} className="block">
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold py-2 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-500 transition flex items-center justify-between px-4 mt-1 text-lg"
                        >
                          Book Trip <ChevronRight className="w-5 h-5 ml-2" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
