import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BookingForm from './BookingForm';
import { ImageLoading } from '@/components/ui/loading';

// ✅ Define and export the type
export type TravelPackage = {
  id: string;
  name?: string;
  title?: string;
  description: string;
  price: string | number;
  duration: string;
  imageUrl?: string;
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
};

export type Offer = {
  startDate: string;
  endDate: string;
  priceWithOffer: string;
  priceWithoutOffer: string;
};

interface PackageCardProps {
  pkg: TravelPackage;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  // Handle the case where the offer object might contain package data
  const hasOffer = pkg.offers && pkg.offers.length > 0;
  const offerData = hasOffer ? pkg.offers![0] : null;
  
  // The offer data should contain the actual offer details
  const actualOffer = offerData;
  
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  // Countdown state
  const [countdown, setCountdown] = useState<string | null>(null);
  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Get the display name (title or name)
  const displayName = pkg.title || pkg.name || 'Untitled Package';

  // Helper to get inclusions (support both inclusions and inclutions)
  const inclusions: string[] = (() => {
    // Handle string format (split by commas or newlines)
    if (typeof pkg.inclusions === 'string' && pkg.inclusions) {
      return pkg.inclusions.split(/[,\n]/).map((item: string) => item.trim()).filter((item: string) => item.length > 0);
    }
    // Handle array format
    if (Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0) {
      return pkg.inclusions;
    }
    // Handle inclutions as fallback
    if (typeof pkg.inclutions === 'string' && pkg.inclutions) {
      return pkg.inclutions.split(/[,\n]/).map((item: string) => item.trim()).filter((item: string) => item.length > 0);
    }
    if (Array.isArray(pkg.inclutions) && pkg.inclutions.length > 0) {
      return pkg.inclutions;
    }
    return [];
  })();

  // Helper to get interests (array or string)
  const interests = Array.isArray(pkg.interests)
    ? pkg.interests
    : typeof pkg.interests === 'string' && pkg.interests
      ? pkg.interests.split(',').map((s) => s.trim())
      : [];

  // Countdown effect
  useEffect(() => {
    console.log('=== COUNTDOWN DEBUG ===');
    console.log('Package ID:', pkg.id);
    console.log('Has offer:', hasOffer);
    console.log('Offer data:', offerData);
    console.log('Actual offer:', actualOffer);
    console.log('End date:', actualOffer?.endDate);
    console.log('Price with offer:', actualOffer?.priceWithOffer);
    console.log('Price without offer:', actualOffer?.priceWithoutOffer);
    
    if (!hasOffer || !actualOffer?.endDate) {
      console.log('❌ No offer or endDate - exiting');
      setCountdown(null);
      return;
    }
    
    const endDate = new Date(actualOffer.endDate);
    console.log('Parsed endDate:', endDate);
    console.log('EndDate timestamp:', endDate.getTime());
    console.log('Is valid date:', !isNaN(endDate.getTime()));
    
    if (isNaN(endDate.getTime())) {
      console.log('❌ Invalid date format:', actualOffer.endDate);
      setCountdown('Invalid Date');
      return;
    }
    
    const updateCountdown = () => {
      const end = endDate.getTime();
      const now = Date.now();
      const diff = end - now;
      
      console.log('⏰ Countdown calculation:', { 
        end, 
        now, 
        diff,
        endDate: new Date(end),
        nowDate: new Date(now)
      });
      
      if (diff <= 0) {
        console.log('❌ Offer expired');
        setCountdown('Expired');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      const countdownText = days > 0
        ? `${days}d ${hours}h ${minutes}m`
        : hours > 0
          ? `${hours}h ${minutes}m ${seconds}s`
          : `${minutes}m ${seconds}s`;
      
      console.log('✅ Setting countdown:', countdownText);
      setCountdown(countdownText);
    };
    
    // Initial call immediately
    console.log('🚀 Initial countdown call');
    updateCountdown();
    
    const interval = setInterval(() => {
      console.log('🔄 Interval update');
      updateCountdown();
    }, 1000);
    
    return () => {
      console.log('🧹 Cleaning up interval');
      clearInterval(interval);
    };
  }, [hasOffer, actualOffer, pkg.id]);

  // Debug: log offer and countdown
  if (hasOffer && actualOffer) {
    console.log('Package with offer:', { 
      id: pkg.id, 
      name: displayName, 
      actualOffer, 
      countdown,
      hasOffer,
      endDate: actualOffer?.endDate,
      priceWithOffer: actualOffer?.priceWithOffer,
      priceWithoutOffer: actualOffer?.priceWithoutOffer
    });
  }

  return (
    <>
      {showBookingForm ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[360px] mx-auto border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Book {displayName}</h3>
            <button 
              onClick={() => setShowBookingForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <BookingForm pkg={pkg} />
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="relative bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[360px] mx-auto border border-gray-100 flex flex-col transition-all hover:shadow-lg"
        >
          {/* Limited Offer Badge - top left over image */}
          {hasOffer && actualOffer && (
            <motion.div
              className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded shadow-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              LIMITED OFFER
            </motion.div>
          )}
          {/* Image Container */}
          <div className="relative w-full h-[200px] bg-gray-50 overflow-hidden">
            {pkg.imageUrl && !imageError ? (
              <>
                <motion.img 
                  src={pkg.imageUrl}
                  alt={displayName}
                  className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  whileHover={{ scale: 1.05 }}
                />
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageLoading />
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-50">
                <div className="text-4xl opacity-30">✈️</div>
              </div>
            )}
            {/* Countdown Timer - top right over image */}
            {hasOffer && actualOffer && countdown && (
              <motion.div 
                className="absolute top-3 right-3 bg-black bg-opacity-80 text-white rounded px-3 py-1 text-xs font-semibold flex items-center z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="mr-1">⏳</span>
                <span>{countdown}</span>
              </motion.div>
            )}
            {/* Duration Badge - bottom right */}
            <motion.div 
              className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white rounded px-3 py-1 text-sm font-semibold backdrop-blur-sm flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="mr-1">⏳</span>
              <span>{pkg.duration}</span>
            </motion.div>
          </div>
          {/* Card Content */}
          <div className="p-6 flex flex-col">
            {/* Category Tag and Interests as tags */}
            <div className="mb-3 flex flex-wrap gap-2 items-center">
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded px-3 py-1 text-xs font-semibold uppercase tracking-wider inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {pkg.category}
              </motion.span>
              {interests.length > 0 && interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-violet-600 to-purple-500 text-white rounded px-3 py-1 text-xs font-semibold uppercase tracking-wider inline-block"
                >
                  {interest}
                </span>
              ))}
            </div>
            {/* Title */}
            <motion.h2 
              className="text-xl font-bold text-gray-800 mb-3 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {displayName}
            </motion.h2>
            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
              {pkg.description}
            </p>
            {/* Inclusions */}
            {inclusions.length > 0 && (
              <div className="my-4">
                <motion.div 
                  className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  What's Included
                </motion.div>
                <ul className="list-none pl-0 space-y-1">
                  {inclusions.map((inc, i) => (
                    <motion.li 
                      key={i} 
                      className="text-gray-600 text-sm flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <span className="text-blue-600 font-bold mr-2">•</span> 
                      <span>{inc}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            {/* Interests as tags */}
            {/* Offer Box */}
            {hasOffer && actualOffer && (
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 my-4 border border-blue-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Special Offer</span>
                  <span className="text-red-500 text-xs font-medium flex items-center gap-2">
                    {actualOffer.endDate ? (
                      <>
                        Ends {formatDate(actualOffer.endDate)}
                        {countdown && countdown !== 'Invalid Date' && (
                          <span className="text-xs text-gray-700"> ({countdown})</span>
                        )}
                      </>
                    ) : (
                      'Limited Time'
                    )}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-800">
                    ${(actualOffer.priceWithOffer || pkg.price).toString().replace(/^\$/, '')}
                  </span>
                  {actualOffer.priceWithoutOffer && (
                    <span className="text-gray-400 text-sm line-through">
                      ${actualOffer.priceWithoutOffer.replace(/^\$/, '')}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
            {/* Standard Price */}
            {!hasOffer && (
              <motion.div 
                className="flex items-baseline gap-2 my-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-gray-500 text-sm">From</span>
                <span className="text-xl font-bold text-gray-800">
                  ${typeof pkg.price === 'number' ? pkg.price : pkg.price.toString().replace(/^\$/, '')}
                </span>
              </motion.div>
            )}
            {/* Buttons */}
            <motion.div 
              className="flex gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button 
                className="flex-1 py-3 px-4 bg-transparent text-blue-600 border border-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save for later
              </motion.button>
              <motion.button 
                onClick={() => setShowBookingForm(true)}
                className="flex-1 py-3 px-4 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore package
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PackageCard;