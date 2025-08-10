"use client";
import React, { useEffect, useState } from "react";

interface Destination {
  id: string;
  destination_id: string;
  destination: string;
  destination_name: string;
  description: string;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ManageDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [form, setForm] = useState<{ 
    destination_id: string; 
    destination: string; 
    destination_name: string; 
    description: string; 
    image_url: string; 
    id: string | null 
  }>({ 
    destination_id: "", 
    destination: "", 
    destination_name: "", 
    description: "", 
    image_url: "", 
    id: null 
  });
  const [editing, setEditing] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((data: Destination[]) => setDestinations(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editing) {
      await fetch(`/api/destinations/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setAlertMsg("Destination updated successfully!");
    } else {
      await fetch("/api/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setAlertMsg("Destination added successfully!");
    }
    setForm({ destination_id: "", destination: "", destination_name: "", description: "", image_url: "", id: null });
    setEditing(false);
    const data: Destination[] = await fetch("/api/destinations").then((res) => res.json());
    setDestinations(data);
    setTimeout(() => setAlertMsg(""), 2000);
  };

  const handleEdit = (destination: Destination) => {
    setForm({
      id: destination.id,
      destination_id: destination.destination_id,
      destination: destination.destination,
      destination_name: destination.destination_name,
      description: destination.description,
      image_url: destination.image_url || ""
    });
    setEditing(true);
  };

  const handleDelete = async (destinationId: string) => {
    await fetch(`/api/destinations/${destinationId}`, { method: 'DELETE' });
    setDestinations(destinations.filter(d => d.id !== destinationId));
    setAlertMsg("Destination deleted successfully!");
    setTimeout(() => setAlertMsg(""), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-8">
      {alertMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-[#6A82FB] to-[#463f5e] text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold animate-fade-in-out">
          {alertMsg}
        </div>
      )}
      {/* Add Destination Form */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#eae6f7] p-8 flex-1 max-w-xl">
        <h1 className="text-3xl font-bold text-[#463f5e] mb-6 text-center drop-shadow">Manage Destinations</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Destination ID</label>
            <input 
              name="destination_id" 
              placeholder="e.g., COLOMBO_001" 
              value={form.destination_id} 
              onChange={handleChange} 
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" 
              required 
            />
          </div>
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Destination</label>
            <input 
              name="destination" 
              placeholder="e.g., Colombo" 
              value={form.destination} 
              onChange={handleChange} 
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" 
              required 
            />
          </div>
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Destination Name</label>
            <input 
              name="destination_name" 
              placeholder="e.g., Colombo City" 
              value={form.destination_name} 
              onChange={handleChange} 
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" 
              required 
            />
          </div>
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Description</label>
            <textarea 
              name="description" 
              placeholder="Enter destination description..." 
              value={form.description} 
              onChange={handleChange} 
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e] h-32 resize-none" 
              required 
            />
          </div>
          <div>
            <label className="block text-[#463f5e] font-semibold mb-1">Image URL</label>
            <input 
              name="image_url" 
              placeholder="https://example.com/image.jpg" 
              value={form.image_url} 
              onChange={handleChange} 
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" 
            />
          </div>
          
          <button type="submit" className="w-full max-w-xs mx-auto h-12 bg-[#463f5e] hover:bg-[#463f5ecc] text-white font-bold text-xl rounded-xl transition-all shadow-lg mt-6 disabled:opacity-60">
            {editing ? "Update Destination" : "Add Destination"}
          </button>
        </form>
      </div>
      {/* Destinations List */}
      <div className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#eae6f7] p-8 min-w-[300px] max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-[#463f5e]">Destinations List</h2>
        <ul className="space-y-4">
          {destinations.map((destination) => (
            <li key={destination.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[#463f5e] font-medium text-lg">{destination.destination_name}</span>
                  <p className="text-gray-600 text-sm">{destination.destination}</p>
                  <p className="text-gray-500 text-xs">ID: {destination.destination_id}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(destination)} className="text-blue-600 hover:underline font-semibold text-sm">Edit</button>
                  <button onClick={() => handleDelete(destination.id)} className="text-red-600 hover:underline font-semibold text-sm">Delete</button>
                </div>
              </div>
              
              {/* Description */}
              <div className="mt-2">
                <p className="text-sm text-gray-700">{destination.description}</p>
              </div>
              
              {/* Image URL if available */}
              {destination.image_url && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Image: </span>
                  <span className="text-xs text-blue-600 break-all">{destination.image_url}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 