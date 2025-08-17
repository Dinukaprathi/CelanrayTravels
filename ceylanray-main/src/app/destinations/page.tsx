import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface Destination {
  id: string;
  destination_id: string;
  destination: string;
  destination_name: string;
  description: string;
  image_url?: string;
}

async function getDestinations(): Promise<Destination[]> {
  try {
    // Fetch destinations from our local API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/destinations`, {
      cache: 'no-store' // Disable caching to get fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }
    
    const destinations: Destination[] = await response.json();
    console.log('Destinations fetched from database:', destinations); // Debug log
    console.log('Number of destinations:', destinations.length); // Debug log
    
    return destinations;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <main className="w-full bg-background min-h-screen pb-16 pt-8">
      <div className="max-w-[1560px] mx-auto px-4">
        <h1 className="h1 mb-8 text-center text-black">
          Destinations
        </h1>
        

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.length === 0 ? (
            <div className="col-span-full text-lg text-gray-500 text-center py-12">
              No destinations found. Please add some destinations through the admin panel.
            </div>
          ) : (
            destinations.map((dest: Destination) => (
              <div
                key={dest.destination_id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={dest.image_url || '/home/recommended/sigiriya.webp'}
                    alt={dest.destination || 'Destination'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="h3 mb-2 text-black">{dest.destination_name || 'Unnamed Destination'}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#463f5e]" />
                    <span className="text-sm text-[#463f5e] font-medium">{dest.destination || 'Unknown Location'}</span>
                  </div>
                  <p className="p mb-4 text-gray-700 line-clamp-3">{dest.description || 'No description available'}</p>
                  <Link
                    href={`/destinations/${dest.destination_id}`}
                    className="mt-auto text-primary font-semibold hover:underline p-small flex items-center gap-1"
                  >
                    Read More <span className="ml-1">&#9654;</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 