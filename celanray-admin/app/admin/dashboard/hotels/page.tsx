"use client";
import React, { useEffect, useState } from "react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  image?: string;
  roomTypes?: string[];
}

export default function AddHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [form, setForm] = useState<{ 
    name: string; 
    location: string; 
    image: string; 
    roomTypes: string[];
    id: string | null 
  }>({ 
    name: "", 
    location: "", 
    image: "", 
    roomTypes: [],
    id: null 
  });
  const [editing, setEditing] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((data: Hotel[]) => setHotels(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addRoomType = () => {
    if (newRoomType.trim() && !form.roomTypes.includes(newRoomType.trim())) {
      setForm({ ...form, roomTypes: [...form.roomTypes, newRoomType.trim()] });
      setNewRoomType("");
    }
  };

  const removeRoomType = (roomType: string) => {
    setForm({ ...form, roomTypes: form.roomTypes.filter(rt => rt !== roomType) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRoomType();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editing) {
      await fetch(`/api/hotels/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setAlertMsg("Hotel updated successfully!");
    } else {
      await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setAlertMsg("Hotel added successfully!");
    }
    setForm({ name: "", location: "", image: "", roomTypes: [], id: null });
    setEditing(false);
    const data: Hotel[] = await fetch("/api/hotels").then((res) => res.json());
    setHotels(data);
    setTimeout(() => setAlertMsg(""), 2000);
  };

  const handleEdit = (hotel: Hotel) => {
    setForm({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
      image: hotel.image ?? "",
      roomTypes: hotel.roomTypes ?? []
    });
    setEditing(true);
  };

  const handleDelete = async (hotelId: string) => {
    try {
      const response = await fetch(`/api/hotels/${hotelId}`, { method: 'DELETE' });
      
      if (response.ok) {
        setHotels(hotels.filter(h => h.id !== hotelId));
        setAlertMsg("Hotel deleted successfully!");
      } else {
        const errorData = await response.json();
        setAlertMsg(`Error: ${errorData.error || 'Failed to delete hotel'}`);
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setAlertMsg('Error: Failed to delete hotel');
    }
    
    setTimeout(() => setAlertMsg(""), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8">
      {alertMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-[#6A82FB] to-[#463f5e] text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold animate-fade-in-out">
          {alertMsg}
        </div>
      )}
      {/* Add Hotel Form */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#eae6f7] p-8 flex-1 max-w-xl">
        <h1 className="text-3xl font-bold text-[#463f5e] mb-6 text-center drop-shadow">Manage Hotels</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Hotel Name</label>
            <input name="name" placeholder="Hotel Name" value={form.name} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" required />
          </div>
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Location</label>
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" required />
          </div>
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Image URL</label>
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
          </div>
          
          {/* Room Types Section */}
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Room Types</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                placeholder="Add room type (e.g., Deluxe, Standard, Suite)" 
                value={newRoomType} 
                onChange={(e) => setNewRoomType(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" 
              />
              <button 
                type="button" 
                onClick={addRoomType}
                className="px-4 py-2 bg-[#463f5e] text-white rounded-lg hover:bg-[#463f5ecc] transition-all"
              >
                Add
              </button>
            </div>
            
            {/* Room Type Tags */}
            {form.roomTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.roomTypes.map((roomType, index) => (
                  <div key={index} className="flex items-center gap-1 bg-[#463f5e] text-white px-3 py-1 rounded-full text-sm">
                    <span>{roomType}</span>
                    <button 
                      type="button" 
                      onClick={() => removeRoomType(roomType)}
                      className="ml-1 hover:text-red-200 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button type="submit" className="w-full max-w-xs mx-auto h-12 bg-[#463f5e] hover:bg-[#463f5ecc] text-white font-bold text-xl rounded-xl transition-all shadow-lg mt-6 disabled:opacity-60">
            {editing ? "Update Hotel" : "Add Hotel"}
          </button>
        </form>
      </div>
      {/* Hotel List */}
      <div className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#eae6f7] p-8 min-w-[300px] max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-[#463f5e]">Hotel List</h2>
        <ul className="space-y-4">
          {hotels.map((hotel) => (
            <li key={hotel.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[#463f5e] font-medium text-lg">{hotel.name}</span>
                  <p className="text-gray-600 text-sm">{hotel.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(hotel)} className="text-blue-600 hover:underline font-semibold text-sm">Edit</button>
                  <button onClick={() => handleDelete(hotel.id)} className="text-red-600 hover:underline font-semibold text-sm">Delete</button>
                </div>
              </div>
              
              {/* Display Room Types */}
              {hotel.roomTypes && hotel.roomTypes.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600 font-medium">Room Types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hotel.roomTypes.map((roomType, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {roomType}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 