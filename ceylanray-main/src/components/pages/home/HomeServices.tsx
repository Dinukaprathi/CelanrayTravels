import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomeServices() {
    return (
        <section className="w-full bg-white pb-8 pt-16 lg:pt-24 lg:pb-8">
            <div className="container mx-auto max-w-[1560px] px-4">
                <div className="mb-12 text-center">
                    <h2 className="heading-1 mb-4">Your Journey, Our Expertise</h2>
                    <span className="p-small border border-gray-100 px-4 py-1 rounded-md">What we offer</span>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
                    {/* Travel Packages Card */}
                    <div className="relative overflow-hidden rounded-[4px] min-h-[300px] group">
                        <Image
                            src="/home/homeServices/flights.webp"
                            alt="View from airplane window during sunset"
                            fill
                            className="object-cover transition-transform duration-300 "
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative z-10 p-8 h-full flex items-start">
                            <div className="flex items-center gap-4 justify-between w-full">
                                <h3 className="heading-3 text-white">Book your Air Tickets</h3>
                                <div className="flex items-center w-7 h-7 gap-2 bg-white shrink-0 rounded-full p-2 group-hover:translate-x-1 duration-300">
                                    <ArrowRight 
                                        className="w-4 h-4 text-black transition-transform rotate-45 "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotels Card */}
                    <Link href="/services/book-hotels" className="relative overflow-hidden rounded-[4px] min-h-[300px] block">
                        <Image
                            src="/home/homeServices/hotels.webp"
                            alt="Beach resort with umbrella"
                            fill
                            className="object-cover transition-transform duration-300 "
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative z-10 p-8 h-full flex items-start">
                            <div className="flex items-center gap-4 justify-between w-full">
                                <h3 className="heading-3 text-white">Book your Hotels</h3>
                                <div className="flex items-center w-7 h-7 gap-2 bg-white shrink-0 rounded-full p-2 duration-300">
                                    <ArrowRight 
                                        className="w-4 h-4 text-black transition-transform rotate-45 "
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Packages Card - now a link */}
                    <Link href="/packages" className="lg:col-span-2 relative overflow-hidden rounded-[4px] min-h-[300px] group block">
                        <Image
                            src="/home/homeServices/packages.webp"
                            alt="Aerial view of a coastal city"
                            fill
                            className="object-cover transition-transform duration-300 "
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative z-10 p-8 h-full flex items-start">
                            <div className="flex items-center gap-4 justify-between w-full">
                                <h3 className="heading-3 text-white">Select Travel Packages</h3>
                                <div className="flex items-center w-7 h-7 bg-white shrink-0 rounded-full p-2 group-hover:translate-x-1 duration-300" >
                                    <ArrowRight 
                                        className="w-4 h-4 text-black transition-transform rotate-45 "
                                    />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
