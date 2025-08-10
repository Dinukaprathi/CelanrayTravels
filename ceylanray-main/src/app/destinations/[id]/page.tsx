import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

async function getDestination(id: string) {
  try {
    // Fetch destination from our local API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/destinations/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const destination = await response.json();
    console.log('Destination fetched from database:', destination); // Debug log
    return destination;
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

export default async function DestinationDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="h1 text-center mb-4">Destination Not Found</h1>
        <Link href="/destinations" className="text-primary font-semibold hover:underline p-small">Back to Destinations</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-16 pt-8">
      <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 px-4 sm:px-8 lg:px-24 py-4">
        <div className="relative w-full h-[420px] sm:h-[600px]">
          <Image
            src={destination.image_url || '/home/recommended/sigiriya.webp'}
            alt={destination.destination_name || destination.destination}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
          />
        </div>
        <div className="p-4 flex flex-col gap-4">
          <h1 className="h1 text-black mb-2">{destination.destination_name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#463f5e]" />
            <span className="text-sm text-[#463f5e] font-medium">{destination.destination}</span>
          </div>
          <span className="inline-block text-[15px] text-[#463f5e] font-medium p-small mb-2">Destinations</span>
          <p className="p text-gray-700 whitespace-pre-line mb-6">{destination.description}</p>
          <Link href="/destinations" className="text-primary font-semibold hover:underline p-small flex items-center gap-1">
            &#8592; Back to Destinations
          </Link>
        </div>
      </div>
    </main>
  );
} 