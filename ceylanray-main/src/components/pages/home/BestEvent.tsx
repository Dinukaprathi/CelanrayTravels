import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BestEvent = () => {
    return (
        <section className="w-full pb-8 pt-32">
            <div className="mx-auto max-w-[1560px] px-4">
                <div>
                    <h2 className="heading-1 mb-3 text-black">Best Event of 2025</h2>
                    <p className="body-1 mb-8 text-gray-200 max-w-xl">Cultural festivals celebrate the diversity of different cultures through music, dance, food and art</p>
                </div>
                <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
                    {/* Background Image */}
                    <Image src="/home/best-events.webp" alt="Perahera Festival" fill className="object-cover" priority />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
                        <div className="flex h-full flex-col justify-end p-8 md:p-12">
                            <div className="max-w-2xl">
                                {/* Event Details */}
                                <div className="mb-8">
                                    <h3 className="heading-3 mb-2 text-white">Perahera <br /> at Kandy</h3>

                                    <p className="body-2 max-w-xl text-gray-100">The Kandy Esala Perahera also known as The Festival of the Tooth is a festival held in July and August in Kandy, Sri Lanka.</p>
                                </div>

                                {/* CTA Button */}
                                <Link href="/contact-us" className="p font-semibold inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-base  text-black transition-all hover:bg-white/90">
                                    Book Ticket
                                    <ArrowRight className="w-5 h-5 text-gray-200" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestEvent;
