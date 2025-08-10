"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LoadingButton } from '@/components/ui/loading-button';

interface Passenger {
  fullName: string;
  email: string;
  phone: string;
  passport: string;
}

type TripType = "One-way" | "Round-trip";
type FlightClass = "Economy" | "Business" | "First Class";
type BookingMode = "Single" | "Multiple";

const AirTicketBookingForm: React.FC = () => {
  const [bookingMode, setBookingMode] = useState<BookingMode>("Single");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [passengers, setPassengers] = useState<Passenger[]>([{ fullName: "", email: "", phone: "", passport: "" }]);
  const [flightClass, setFlightClass] = useState<FlightClass>("Economy");
  const [tripType, setTripType] = useState<TripType>("One-way");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [assistance, setAssistance] = useState("");
  const [meal, setMeal] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalPassengers = adults + children;

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handlePassengerCountChange = () => {
    const newPassengerList = Array.from({ length: totalPassengers }, (_, i) =>
      passengers[i] || { fullName: "", email: "", phone: "", passport: "" }
    );
    setPassengers(newPassengerList);
  };

  useEffect(() => {
    if (bookingMode === "Single" && passengers.length !== 1) {
      setPassengers([{ fullName: "", email: "", phone: "", passport: "" }]);
    } else if (bookingMode === "Multiple") {
      handlePassengerCountChange();
    }
    // eslint-disable-next-line
  }, [bookingMode, adults, children]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    try {
      const bookingData = {
        bookingMode,
        tripType,
        flightClass,
        departureCity,
        arrivalCity,
        departureDate,
        returnDate: returnDate || null,
        adults,
        children,
        totalPassengers,
        specialAssistance: assistance || null,
        mealPreference: meal || null,
        passengers
      };

      const response = await fetch('/api/air-ticket-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success - form will show success message
        console.log('Booking submitted successfully:', result);
      } else {
        // Error handling
        console.error('Booking submission failed:', result.error);
        setSubmitted(false);
        alert('Failed to submit booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitted(false);
      alert('Failed to submit booking. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white/90 shadow-2xl rounded-2xl space-y-8 mt-10 mb-20 border border-[#eae6f7]">
      <h2 className="text-3xl font-bold text-[#463f5e] mb-2 text-center drop-shadow"> Air Ticket Booking</h2>
      <p className="text-center text-gray-500 mb-6">Book your next flight with Celanray Travels & Tours</p>

      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex-1 min-w-[180px]">
          <label className="font-medium text-[#463f5e] block mb-2">Booking Type:</label>
          <select
            value={bookingMode}
            onChange={(e) => setBookingMode(e.target.value as BookingMode)}
            className="w-full px-3 py-2 border rounded bg-white/80"
          >
            <option value="Single">Single Passenger</option>
            <option value="Multiple">Multiple Passengers</option>
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="font-medium text-[#463f5e] block mb-2">Trip Type:</label>
          <div className="flex gap-4 mt-1">
            <label className="inline-flex items-center">
              <input type="radio" name="tripType" value="One-way" checked={tripType === "One-way"} onChange={() => setTripType("One-way")} className="accent-[#463f5e]" />
              <span className="ml-1">One-way</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="tripType" value="Round-trip" checked={tripType === "Round-trip"} onChange={() => setTripType("Round-trip")} className="accent-[#463f5e]" />
              <span className="ml-1">Round-trip</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-2 mb-4">
        <div className="flex-1 min-w-[180px]">
          <label className="font-medium text-[#463f5e] block mb-2">Flight Class:</label>
          <div className="flex gap-4 flex-wrap mt-1">
            {["Economy", "Business", "First Class"].map((fc) => (
              <label key={fc} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="flightClass"
                  value={fc}
                  checked={flightClass === fc}
                  onChange={() => setFlightClass(fc as FlightClass)}
                  className="accent-[#463f5e]"
                />
                <span className="ml-1">{fc}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Departure City" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} className="w-full px-3 py-2 border rounded bg-white/80" />
        <input type="text" placeholder="Arrival City" value={arrivalCity} onChange={(e) => setArrivalCity(e.target.value)} className="w-full px-3 py-2 border rounded bg-white/80" />
        <div className="flex flex-col">
          <label className="font-medium text-[#463f5e] mb-2">Departure Date:</label>
          <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className="w-full px-3 py-2 border rounded bg-white/80" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-[#463f5e] mb-2">Return Date <span className='text-gray-400'>(optional)</span></label>
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full px-3 py-2 border rounded bg-white/80" placeholder="Select return date (optional)" />
        </div>
      </div>

      {bookingMode === "Multiple" && (
        <div className="space-y-4">
          <div className="flex gap-6">
            <div>
              <label>Number of Adults:</label>
              <input type="number" min={1} value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} onBlur={handlePassengerCountChange} className="ml-2 border px-3 py-1 rounded w-20 bg-white/80" />
            </div>
            <div>
              <label>Number of Children:</label>
              <input type="number" min={0} value={children} onChange={(e) => setChildren(parseInt(e.target.value))} onBlur={handlePassengerCountChange} className="ml-2 border px-3 py-1 rounded w-20 bg-white/80" />
            </div>
            <div className="font-semibold text-blue-700 self-end">Total: {totalPassengers}</div>
          </div>
          <div className="space-y-4 mt-4">
            {passengers.map((p, index) => (
              <div key={index} className="p-4 border rounded bg-gray-50">
                <h4 className="font-medium text-[#463f5e]">Passenger {index + 1}</h4>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={p.fullName}
                  onChange={(e) => handlePassengerChange(index, "fullName", e.target.value)}
                  className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={p.email}
                  onChange={(e) => handlePassengerChange(index, "email", e.target.value)}
                  className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={p.phone}
                  onChange={(e) => handlePassengerChange(index, "phone", e.target.value)}
                  className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
                />
                <input
                  type="text"
                  placeholder="Passport Number"
                  value={p.passport}
                  onChange={(e) => handlePassengerChange(index, "passport", e.target.value)}
                  className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {bookingMode === "Single" && (
        <div className="space-y-2">
          <h4 className="font-medium text-[#463f5e]">Passenger Details</h4>
          <input
            type="text"
            placeholder="Full Name"
            value={passengers[0].fullName}
            onChange={(e) => handlePassengerChange(0, "fullName", e.target.value)}
            className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
          />
          <input
            type="email"
            placeholder="Email"
            value={passengers[0].email}
            onChange={(e) => handlePassengerChange(0, "email", e.target.value)}
            className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={passengers[0].phone}
            onChange={(e) => handlePassengerChange(0, "phone", e.target.value)}
            className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
          />
          <input
            type="text"
            placeholder="Passport Number"
            value={passengers[0].passport}
            onChange={(e) => handlePassengerChange(0, "passport", e.target.value)}
            className="block w-full my-1 px-3 py-2 border rounded bg-white/80"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="text" placeholder="Special Assistance (optional)" value={assistance} onChange={(e) => setAssistance(e.target.value)} className="w-full px-3 py-2 border rounded bg-white/80" />
        <input type="text" placeholder="Meal Preference (optional)" value={meal} onChange={(e) => setMeal(e.target.value)} className="w-full px-3 py-2 border rounded bg-white/80" />
      </div>

      <LoadingButton 
        type="submit" 
        loading={submitted} 
        loadingText="Booking Submitted!" 
        className="w-full bg-[#463f5e] hover:bg-[#463f5ecc] text-white font-bold text-xl rounded-xl transition-all shadow-lg h-14 mt-6"
      >
        Submit Booking
      </LoadingButton>
      {submitted && <div className="text-green-600 text-center bg-green-50 p-2 rounded-lg mt-4">Thank you! Your booking has been submitted.</div>}
    </form>
  );
};

export default function AirTicketBookingPage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 overflow-hidden">
      {/* Decorative Airplane SVGs */}
      <svg className="hidden md:block absolute top-0 left-0 w-48 h-48 opacity-20 pointer-events-none z-0" viewBox="0 0 64 64" fill="none"><path d="M2 62L62 2M62 2L44 22M62 2L22 44" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/></svg>
      <svg className="hidden md:block absolute bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none z-0" viewBox="0 0 64 64" fill="none"><path d="M2 62L62 2M62 2L44 22M62 2L22 44" stroke="#6366F1" strokeWidth="5" strokeLinecap="round"/></svg>
      {/* Banner Image with Overlay Text */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden z-0">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=800&fit=crop"
          alt="Air Ticket Booking Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="text-white text-center max-w-3xl mx-auto">
            <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl text-white drop-shadow-lg mb-4">Book your ticket with Celanray</p>
            <div className="space-y-1">
              <p className="text-sm md:text-base lg:text-lg font-medium drop-shadow-lg mb-0">Book one-way or round-trip flights for single or multiple passengers with ease.</p>
              <p className="text-sm md:text-base lg:text-lg font-medium drop-shadow-lg mb-0">Choose your preferred flight class, manage passenger details, and add special requests hassle-free.</p>
              <p className="text-sm md:text-base lg:text-lg font-medium drop-shadow-lg">Experience a smarter way to fly – your journey begins smoothly with Celanray.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Form Container */}
      <div className="w-full z-10 relative">
        <AirTicketBookingForm />
      </div>
    </div>
  );
} 