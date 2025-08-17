import { notFound } from 'next/navigation';
// import Header from '@/components/Header/Header';
// import { Footer } from '@/components/common/Footer';
import type { TravelPackage, Offer } from '@/components/pages/packages/PackageCard';
import React from 'react';
import { headers } from 'next/headers';
import BookingForm from '@/components/pages/packages/BookingForm';

// Placeholder for fetching package data by id
async function getPackageById(id: string): Promise<TravelPackage | null> {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/packages`);
  const data = await res.json();
  
  // Combine packages from both arrays
  const allPackages = [
    ...data.packagesWithoutOffers,
    ...data.packagesWithOffers
  ];
  
  // Find the package by id
  return allPackages.find((pkg: TravelPackage) => pkg.id === id) || null;
}

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const pkg = await getPackageById(resolvedParams.id);
  if (!pkg) return notFound();

  // Find the latest valid offer (if any)
  const now = new Date();
  const validOffer = pkg.offers && pkg.offers.find(
    (offer: any) =>
      offer.startDate && new Date(offer.startDate) <= now &&
      offer.endDate && new Date(offer.endDate) >= now
  );

  // Ensure inclusions is always a string array
  const inclusions: string[] =
    Array.isArray(pkg.inclusions)
      ? pkg.inclusions
      : typeof pkg.inclusions === 'string'
      ? (pkg.inclusions as string).split(',').map((i: string) => i.trim())
      : typeof pkg.inclusions === 'undefined' || pkg.inclusions === null
      ? []
      : [];
  // Ensure interests is always a string array
  const interests: string[] =
    Array.isArray(pkg.interests)
      ? pkg.interests
      : typeof pkg.interests === 'string'
      ? (pkg.interests as string).split(',').map((i: string) => i.trim())
      : typeof pkg.interests === 'undefined' || pkg.interests === null
      ? []
      : [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f6f4fa] to-[#eae6f7]">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row gap-0 transition-all duration-500">
          {/* Left: Details */}
          <div className="md:w-8/12 w-full flex flex-col justify-start">
            {/* Top: Main Image */}
            <div className="w-full relative group overflow-hidden">
              <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-[#b8a6e8]/80 text-[#463f5e] px-4 py-2 rounded-xl shadow-lg text-lg font-bold backdrop-blur-md">
                {pkg.category}
              </div>
            </div>
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#463f5e] mt-6 mb-2 px-6 drop-shadow-lg transition-all duration-500">{pkg.name}</h1>
            {/* Description */}
            <div className="px-6 mb-4">
              <p className="text-[#7c6fa7] text-lg leading-relaxed bg-[#f6f4fa]/80 rounded-xl p-4 shadow-sm border border-[#eae6f7]">
                {pkg.description}
              </p>
            </div>
            {/* Category and Price Row */}
            <div className="flex items-center justify-between px-6 mb-2">
              <span className="inline-block bg-[#b8a6e8]/80 text-[#463f5e] px-4 py-1 rounded-xl shadow font-semibold text-base backdrop-blur-md">
                {pkg.category}
              </span>
              {validOffer ? (
                <span className="inline-block">
                  <span className="text-gray-400 line-through mr-2 font-semibold">
                    ${validOffer.priceWithoutOffer?.replace(/^\$/, '')}
                  </span>
                  <span className="bg-[#C46DD6]/10 text-[#C46DD6] px-4 py-1 rounded-lg font-bold text-lg shadow">
                    ${validOffer.priceWithOffer?.replace(/^\$/, '')}
                  </span>
                </span>
              ) : (
              <span className="inline-block bg-[#C46DD6]/10 text-[#C46DD6] px-4 py-1 rounded-lg font-bold text-lg shadow">
                ${typeof pkg.price === 'string' ? pkg.price.replace(/^\$/, '') : pkg.price}
              </span>
              )}
            </div>
            {/* Interests */}
            <div className="flex flex-wrap gap-3 items-center mb-4 px-6">
              <div className="flex gap-2 flex-wrap">
               {interests.map((interest: string) => (
                 <span key={interest} className="bg-[#463f5e]/80 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                   {interest}
                 </span>
               ))}
              </div>
            </div>
            {/* Inclusions */}
            <div className="mb-6 px-6">
              <h2 className="text-xl font-bold text-[#463f5e] mb-2">Inclusions</h2>
              <ul className="list-disc list-inside text-[#7c6fa7] space-y-1">
               {inclusions.map((inc: string, idx: number) => (
                 <li key={idx}>{inc}</li>
               ))}
              </ul>
            </div>
          </div>
          {/* Right: Booking Form */}
          <div className="md:w-4/12 w-full flex flex-col justify-start border-l border-[#eae6f7] bg-[#f6f4fa]/60 p-6">
            <div className="mt-4 p-6 rounded-2xl bg-[#f6f4fa]/80 shadow-lg border border-[#eae6f7] flex flex-col gap-4 transition-all duration-500">
              <h3 className="text-2xl font-bold text-[#463f5e] mb-2">Book This Package</h3>
              {pkg && <BookingForm pkg={pkg} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 