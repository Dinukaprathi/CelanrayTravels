import React from "react";
import Link from "next/link";

const offerMessages = [
  "Up to 30% off deals!",
  "Limited time offers!",
  "Save big on your next adventure!"
];

export default function OfferDisplay() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % offerMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-blue-100 to-blue-50 shadow flex items-center justify-center py-4 px-6">
      <div className="flex items-center gap-4">
        <Link href="/packages" className="no-underline">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow hover:bg-blue-600 transition cursor-pointer select-none">
            OFFER
          </span>
        </Link>
        <span className="relative h-6 w-48 overflow-hidden">
          <span
            key={index}
            className="absolute left-0 top-0 w-full h-full text-blue-700 font-semibold text-base animate-fade-slide"
            style={{ transition: 'all 0.5s' }}
          >
            {offerMessages[index]}
          </span>
        </span>
      </div>
      <style jsx>{`
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(20px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fade-slide {
          animation: fade-slide 2.5s linear;
        }
      `}</style>
    </section>
  );
} 