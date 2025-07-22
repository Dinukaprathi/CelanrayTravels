"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2 } from 'lucide-react';

export default function BookHotelsPage() {
  const [hotels, setHotels] = useState<{id: string, name: string}[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hotel_name: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    numGuests: "",
    specialRequests: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError("");
    setSuccess(false);
    setShowAlert(false);
    try {
      const res = await fetch("/api/hotel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setShowAlert(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          hotel_name: "",
          checkIn: "",
          checkOut: "",
          roomType: "",
          numGuests: "",
          specialRequests: "",
        });
        setTimeout(() => setShowAlert(false), 2000);
      } else {
        setError(data.error || "Booking failed.");
      }
    } catch (err) {
      setError("Booking failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {/* Banner Image with Overlay Text */}
      <div className="relative w-full h-[340px] md:h-[420px] rounded-none overflow-hidden mt-0 mb-6">
        <img
          src="https://images.unsplash.com/photo-1709755568003-d85948a9de8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hotel Booking Banner"
          className="w-full h-full object-cover rounded-none"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">🏨 Hotel Booking</h2>
          <p className="text-white text-base md:text-lg max-w-2xl mx-auto drop-shadow">
            At Celanray Travels & Tours, we make your stay as memorable as your journey. Our Hotel Booking service offers a handpicked selection of budget-friendly, luxury, and mid-range accommodations across Sri Lanka and the Middle East. Whether you're looking for a beachfront resort, a cozy hill-country hideaway, or a city hotel close to major attractions, we've got you covered.<br/>
            Enjoy exclusive deals, 24/7 customer support, and customizable packages that suit your comfort and travel style. Let us handle the hassle—you focus on relaxing.
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto pt-0 px-4">
        <h1 className="text-5xl font-bold text-center mb-4 text-black">Book a Hotel</h1>
        <div className="bg-white rounded-lg border border-gray-100/30 p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            </div>
            <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            <select name="hotel_name" value={form.hotel_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required>
              <option value="">Select a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.name}>{hotel.name}</option>
              ))}
            </select>
            <label className="block text-sm text-neutral-600 mb-1" htmlFor="checkIn">Check In</label>
            <input name="checkIn" id="checkIn" type="date" value={form.checkIn} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            <label className="block text-sm text-neutral-600 mb-1 mt-4" htmlFor="checkOut">Check Out</label>
            <input name="checkOut" id="checkOut" type="date" value={form.checkOut} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            <input name="roomType" type="text" placeholder="Room Type" value={form.roomType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            <select
              name="numGuests"
              value={form.numGuests}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select guests...</option>
              <option value="1 adult">1 adult</option>
              <option value="2 adults">2 adults</option>
              <option value="2 adults and 1 child">2 adults and 1 child</option>
              <option value="3 adults">3 adults</option>
              <option value="4 adults">4 adults</option>
              <option value="5 adults">5 adults</option>
              <option value="2 adults and 2 children">2 adults and 2 children</option>
              <option value="3 adults and 1 child">3 adults and 1 child</option>
            </select>
            <textarea name="specialRequests" placeholder="Special Requests" value={form.specialRequests} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            <button type="submit" disabled={pending} className={`btn-primary px-8 py-3 rounded-md transition-all duration-200 w-full ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}> 
              {pending ? "Booking..." : "Book Now"}
            </button>
            {showAlert && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="flex flex-col items-center gap-3 p-8 rounded-2xl shadow-2xl border-2 bg-[#ede9f7] border-[#b8a6e8]" style={{ animation: 'fadeIn 0.3s' }}>
                  <CheckCircle2 size={48} className="text-[#7c6fa7] mb-2" />
                  <div className="font-bold text-[#463f5e] text-2xl mb-2">Booking successful!</div>
                  <div className="text-[#7c6fa7] text-base">Your hotel booking was successful!</div>
                </div>
              </div>
            )}
            {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
} 