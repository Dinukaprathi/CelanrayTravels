"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2 } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';

interface Hotel {
  id: string;
  name: string;
  location?: string;
  image?: string;
  roomType?: string;
}

export default function BookHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [availableRoomTypes, setAvailableRoomTypes] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hotel_name: "",
    hotel_id: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    adults: "1",
    children: "0",
    specialRequests: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loadingRoomTypes, setLoadingRoomTypes] = useState(false);

  useEffect(() => {
    // Fetch hotels
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((data: Hotel[]) => {
        console.log('Fetched hotels:', data); // Debug log
        setHotels(data);
      })
      .catch((err) => {
        console.error('Error fetching hotels:', err);
        setError("Failed to load hotels");
      });
  }, []);

  // Fetch room types for selected hotel
  const fetchRoomTypes = async (hotelId: string) => {
    if (!hotelId) {
      setAvailableRoomTypes([]);
      return;
    }

    setLoadingRoomTypes(true);
    try {
      const response = await fetch(`/api/hotels/${hotelId}/room-types`);
      const roomTypes = await response.json();
      
      if (Array.isArray(roomTypes)) {
        setAvailableRoomTypes(roomTypes);
        console.log('Fetched room types:', roomTypes); // Debug log
      } else {
        setAvailableRoomTypes([]);
      }
    } catch (error) {
      console.error('Error fetching room types:', error);
      setAvailableRoomTypes([]);
    } finally {
      setLoadingRoomTypes(false);
    }
  };

  // Update available room types when hotel selection changes
  useEffect(() => {
    if (form.hotel_id) {
      fetchRoomTypes(form.hotel_id);
      // Reset room type selection when hotel changes
      setForm(prev => ({ ...prev, roomType: "" }));
    } else {
      setAvailableRoomTypes([]);
    }
  }, [form.hotel_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'hotel_name') {
      // Find the hotel ID when hotel name is selected
      const selectedHotel = hotels.find(hotel => hotel.name === value);
      setForm(prev => ({ 
        ...prev, 
        [name]: value,
        hotel_id: selectedHotel?.id || ""
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Calculate total guests
  const totalGuests = parseInt(form.adults) + parseInt(form.children);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError("");
    setSuccess(false);
    setShowAlert(false);
    
    // Create the numGuests string for the API
    const numGuests = `${form.adults} adult${parseInt(form.adults) > 1 ? 's' : ''}${parseInt(form.children) > 0 ? ` and ${form.children} child${parseInt(form.children) > 1 ? 'ren' : ''}` : ''}`;
    
    try {
      const res = await fetch("/api/hotel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          numGuests,
        }),
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
          hotel_id: "",
          checkIn: "",
          checkOut: "",
          roomType: "",
          adults: "1",
          children: "0",
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
            
            {/* Hotel Selection */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Select Hotel</label>
              <select name="hotel_name" value={form.hotel_name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                <option value="">Select a hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.name}>{hotel.name}</option>
                ))}
              </select>
              {hotels.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">No hotels available. Please add hotels through the admin panel.</p>
              )}
            </div>
            
            <label className="block text-sm text-neutral-600 mb-1" htmlFor="checkIn">Check In</label>
            <input name="checkIn" id="checkIn" type="date" value={form.checkIn} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            <label className="block text-sm text-neutral-600 mb-1 mt-4" htmlFor="checkOut">Check Out</label>
            <input name="checkOut" id="checkOut" type="date" value={form.checkOut} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
            
            {/* Room Type Dropdown - Shows only hotel-specific room types */}
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Room Type</label>
              <select name="roomType" value={form.roomType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                <option value="">
                  {loadingRoomTypes ? "Loading room types..." : 
                   form.hotel_name ? "Select Room Type" : "Please select a hotel first"}
                </option>
                {availableRoomTypes.map((roomType) => (
                  <option key={roomType} value={roomType}>{roomType}</option>
                ))}
              </select>
              {form.hotel_name && !loadingRoomTypes && availableRoomTypes.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">No room types available for this hotel. Please add room types through the admin panel.</p>
              )}
            </div>
            
            {/* Adults and Children Dropdowns with Total Count */}
            <div className="space-y-4">
              <label className="block text-sm text-neutral-600 mb-2">Number of Guests</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-neutral-600 mb-1" htmlFor="adults">Adults</label>
                  <select
                    name="adults"
                    id="adults"
                    value={form.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-600 mb-1" htmlFor="children">Children</label>
                  <select
                    name="children"
                    id="children"
                    value={form.children}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-center">
                    <span className="text-sm text-neutral-600">Total: </span>
                    <span className="font-semibold text-lg">{totalGuests}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <textarea name="specialRequests" placeholder="Special Requests" value={form.specialRequests} onChange={handleChange} className="w-full px-4 py-3 border border-gray-100/50 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            <LoadingButton 
              type="submit" 
              loading={pending} 
              loadingText="Booking..." 
              className="btn-primary px-8 py-3 rounded-md transition-all duration-200 w-full"
            >
              Book Now
            </LoadingButton>
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