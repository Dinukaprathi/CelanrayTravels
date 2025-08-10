"use client";
import React, { useEffect, useState } from "react";
import { Trash2, CheckCircle, Circle, AlertCircle } from "lucide-react";

interface HotelBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  hotel_name: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  numGuests: string;
  specialRequests?: string;
  createdAt: string;
  isCompleted?: boolean;
}

export default function ViewHotelBookings() {
  const [bookings, setBookings] = useState<HotelBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    fetch("/api/hotel-booking")
      .then(res => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching hotel bookings:', error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (bookingId: string, bookingName: string) => {
    if (window.confirm(`Are you sure you want to delete the booking for ${bookingName}? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/hotel-booking/${bookingId}`, { 
          method: 'DELETE' 
        });
        
        if (response.ok) {
          setBookings(bookings.filter(b => b.id !== bookingId));
          setAlertMsg("Hotel booking deleted successfully!");
        } else {
          const errorData = await response.json();
          setAlertMsg(`Error: ${errorData.error || 'Failed to delete booking'}`);
        }
      } catch (error) {
        console.error('Error deleting hotel booking:', error);
        setAlertMsg('Error: Failed to delete booking');
      }
      
      setTimeout(() => setAlertMsg(""), 3000);
    }
  };

  const handleToggleCompletion = async (bookingId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/hotel-booking/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });
      
      if (response.ok) {
        setBookings(bookings.map(b => 
          b.id === bookingId 
            ? { ...b, isCompleted: !currentStatus }
            : b
        ));
        setAlertMsg(`Booking ${!currentStatus ? 'marked as completed' : 'marked as pending'}!`);
      } else {
        setAlertMsg('Error: Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      setAlertMsg('Error: Failed to update booking status');
    }
    
    setTimeout(() => setAlertMsg(""), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-[#463f5e] mb-8 text-center drop-shadow">All Hotel Bookings</h2>
      
      {/* Alert Message */}
      {alertMsg && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
          alertMsg.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {alertMsg.includes('Error') ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
          {alertMsg}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No hotel bookings found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/80 rounded-xl shadow border border-[#eae6f7]">
            <thead>
              <tr className="bg-[#f6f4fa] text-[#463f5e]">
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Guest Details</th>
                <th className="py-3 px-4 text-left">Hotel & Room</th>
                <th className="py-3 px-4 text-left">Stay Dates</th>
                <th className="py-3 px-4 text-left">Guests</th>
                <th className="py-3 px-4 text-left">Special Requests</th>
                <th className="py-3 px-4 text-left">Booking Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: HotelBooking) => (
                <tr key={booking.id} className={`border-t border-[#eae6f7] hover:bg-[#f3f0fa] ${
                  booking.isCompleted ? 'bg-green-50' : ''
                }`}>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <button
                      onClick={() => handleToggleCompletion(booking.id, booking.isCompleted || false)}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                        booking.isCompleted 
                          ? 'text-green-600 hover:text-green-700 bg-green-100 hover:bg-green-200' 
                          : 'text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                      title={booking.isCompleted ? 'Mark as pending' : 'Mark as completed'}
                    >
                      {booking.isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                      <span className="text-sm font-medium">
                        {booking.isCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </button>
                  </td>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <div className="font-semibold">{booking.name}</div>
                    <div className="text-sm text-gray-600">{booking.email}</div>
                    <div className="text-sm text-gray-600">{booking.phone}</div>
                  </td>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <div className="font-semibold">{booking.hotel_name}</div>
                    <div className="text-sm text-gray-600">{booking.roomType}</div>
                  </td>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <div className="font-semibold">Check In: {formatDate(booking.checkIn)}</div>
                    <div className="text-sm text-gray-600">Check Out: {formatDate(booking.checkOut)}</div>
                  </td>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <div className="font-semibold">{booking.numGuests}</div>
                  </td>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <div className="max-w-xs">
                      {booking.specialRequests ? (
                        <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
                          {booking.specialRequests}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No special requests</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <div className="text-sm text-gray-600">
                      {formatDateTime(booking.createdAt)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#463f5e]">
                    <button
                      onClick={() => handleDelete(booking.id, booking.name)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg transition-all"
                      title="Delete booking"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Summary Statistics */}
      {bookings.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white/80 rounded-lg p-4 border border-[#eae6f7]">
            <div className="text-2xl font-bold text-[#463f5e]">{bookings.length}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white/80 rounded-lg p-4 border border-[#eae6f7]">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.isCompleted).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white/80 rounded-lg p-4 border border-[#eae6f7]">
            <div className="text-2xl font-bold text-orange-600">
              {bookings.filter(b => !b.isCompleted).length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white/80 rounded-lg p-4 border border-[#eae6f7]">
            <div className="text-2xl font-bold text-[#463f5e]">
              {new Set(bookings.map(b => b.hotel_name)).size}
            </div>
            <div className="text-sm text-gray-600">Unique Hotels</div>
          </div>
          <div className="bg-white/80 rounded-lg p-4 border border-[#eae6f7]">
            <div className="text-2xl font-bold text-[#463f5e]">
              {bookings.filter(b => b.specialRequests && b.specialRequests.trim() !== '').length}
            </div>
            <div className="text-sm text-gray-600">With Special Requests</div>
          </div>
        </div>
      )}
    </div>
  );
} 