import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import SafeImage from './SafeImage';
import { headers } from 'next/headers';
import OfferCountdown from '../packages/OfferCountdown';

export default async function HomeRecommended() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  let packages: any[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/packages`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      console.log('API response in HomeRecommended:', data);
      const withoutOffers = (data.packagesWithoutOffers || []);
      const withOffers = (data.packagesWithOffers || []);
      packages = [...withoutOffers, ...withOffers];
    }
  } catch {}

  return (
    <section className="w-full pb-8 pt-32">
      <div className="mx-auto max-w-[1560px] px-4">
        <div>
          <h2 className="heading-1 mb-3 text-black">Recommended For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {packages.length === 0 ? (
            <div className="col-span-full text-lg text-gray-500 text-center py-12">
              Recommended packages will be here soon...
            </div>
          ) : (
            packages.map((pkg) => {
              const isOffer = pkg.type === 'with-offer' || pkg.priceWithOffer;
              const formatPrice = (price: string) => price && price.startsWith && price.startsWith('$') ? price : `$${price}`;
              return (
              <div key={pkg.id} className="relative h-[420px] w-full overflow-hidden rounded-lg shadow-md bg-white flex flex-col justify-end">
                {/* Background Image */}
                  <SafeImage src={pkg.image ? pkg.image : '/fallback.jpg'} alt={pkg.title || 'Package'} className="absolute inset-0 w-full h-full object-cover" />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Content Overlay */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg pr-24">{pkg.title}</h3>
                    <p className="text-white/90 text-base mb-4 drop-shadow-lg line-clamp-2">{pkg.description}</p>
                  </div>
                  <div className="mt-auto w-full flex flex-col gap-2">
                    {isOffer && (
                      <div className="relative w-full flex flex-col items-start gap-1 mb-2">
                        {/* Blurred background highlight */}
                        <div className="absolute inset-0 rounded-xl bg-white/40 backdrop-blur-md z-0" />
                        <div className="flex items-center gap-2 relative z-10 p-2">
                          <span className="relative flex h-7 w-7">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-7 w-7 bg-blue-500 items-center justify-center text-white text-base font-bold shadow">%</span>
                          </span>
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold text-xs shadow animate-bounce uppercase">Offer</span>
                          <div className="bg-white/90 text-black px-3 py-1 rounded-md font-semibold text-base shadow flex items-center gap-2 ml-2">
                            <span className="text-gray-400 line-through">{formatPrice(String(pkg.priceWithoutOffer))}</span>
                            <span className="text-blue-600 font-bold">{formatPrice(String(pkg.priceWithOffer))}</span>
                          </div>
                        </div>
                        {pkg.endDate && (
                          <div className="relative z-10 p-2 pt-0">
                            <OfferCountdown endDate={pkg.endDate} />
                          </div>
                        )}
                      </div>
                    )}
                    <Link href={`/packages/${pkg.id}`} className="block">
                      <button className="w-full bg-white text-black font-semibold py-2 rounded shadow hover:bg-gray-100 transition flex items-center justify-between px-4 mt-1">
                        Book Trip <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
