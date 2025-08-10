"use client";
import React, { useEffect, useState } from "react";
import { Trash2, CheckCircle, Circle, AlertCircle } from "lucide-react";

interface Passenger {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passport: string;
  createdAt: string;
}

interface AirTicketBooking {
  id: string;
  createdAt: string;
  updatedAt: string;
  bookingMode: string;
  tripType: string;
  flightClass: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  totalPassengers: number;
  specialAssistance?: string;
  mealPreference?: string;
  passengers: Passenger[];
  isCompleted?: boolean;
}

export default function ViewAirTicketBookings() {
  const [bookings, setBookings] = useState<AirTicketBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    fetch("/api/air-ticket-booking")
      .then((res) => res.json())
      .then((data: AirTicketBooking[]) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching air ticket bookings:", error);
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

  const handleDelete = async (bookingId: string, route: string) => {
    if (window.confirm(`Are you sure you want to delete the air ticket booking for ${route}? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/air-ticket-booking/${bookingId}`, { 
          method: 'DELETE' 
        });
        
        if (response.ok) {
          setBookings(bookings.filter(b => b.id !== bookingId));
          setAlertMsg("Air ticket booking deleted successfully!");
        } else {
          const errorData = await response.json();
          setAlertMsg(`Error: ${errorData.error || 'Failed to delete booking'}`);
        }
      } catch (error) {
        console.error('Error deleting air ticket booking:', error);
        setAlertMsg('Error: Failed to delete booking');
      }
      
      setTimeout(() => setAlertMsg(""), 3000);
    }
  };

  const handleToggleCompletion = async (bookingId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/air-ticket-booking/${bookingId}`, {
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

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-8">
        <div className="text-center text-xl text-[#463f5e]">Loading air ticket bookings...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-[#463f5e] mb-8 text-center drop-shadow">All Air Ticket Bookings</h2>
      
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
      
      {bookings.length === 0 ? (
        <div className="text-center text-gray-700 text-xl font-medium">No air ticket bookings found.</div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className={`bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-[#eae6f7] p-6 ${
              booking.isCompleted ? 'bg-green-50' : ''
            }`}>
              {/* Booking Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-300">
                <div>
                  <h3 className="text-xl font-bold text-[#463f5e] mb-2">
                    {booking.departureCity} → {booking.arrivalCity}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700 font-medium">
                    <span><strong className="text-[#463f5e]">Booking ID:</strong> {booking.id.slice(0, 8)}...</span>
                    <span><strong className="text-[#463f5e]">Mode:</strong> {booking.bookingMode}</span>
                    <span><strong className="text-[#463f5e]">Trip:</strong> {booking.tripType}</span>
                    <span><strong className="text-[#463f5e]">Class:</strong> {booking.flightClass}</span>
                    <span><strong className="text-[#463f5e]">Total Passengers:</strong> {booking.totalPassengers}</span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600 font-medium">
                  <div>Booked: {formatDateTime(booking.createdAt)}</div>
                </div>
              </div>

              {/* Flight Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-[#463f5e] mb-3 text-lg">Flight Details</h4>
                  <div className="space-y-2 text-sm text-gray-800">
                    <div><strong className="text-[#463f5e]">Departure:</strong> {booking.departureCity} on {formatDate(booking.departureDate)}</div>
                    <div><strong className="text-[#463f5e]">Arrival:</strong> {booking.arrivalCity}</div>
                    {booking.returnDate && (
                      <div><strong className="text-[#463f5e]">Return:</strong> {formatDate(booking.returnDate)}</div>
                    )}
                    <div><strong className="text-[#463f5e]">Adults:</strong> {booking.adults}</div>
                    <div><strong className="text-[#463f5e]">Children:</strong> {booking.children}</div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-bold text-[#463f5e] mb-3 text-lg">Special Requests</h4>
                  <div className="space-y-2 text-sm text-gray-800">
                    <div><strong className="text-[#463f5e]">Special Assistance:</strong> {booking.specialAssistance || 'None'}</div>
                    <div><strong className="text-[#463f5e]">Meal Preference:</strong> {booking.mealPreference || 'None'}</div>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              {booking.passengers.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-bold text-[#463f5e] mb-3 text-lg">Passengers</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {booking.passengers.map((passenger) => (
                        <div key={passenger.id} className="bg-white p-3 rounded border border-gray-200">
                          <div className="font-semibold text-[#463f5e]">{passenger.fullName}</div>
                          <div className="text-sm text-gray-600">{passenger.email}</div>
                          <div className="text-sm text-gray-600">{passenger.phone}</div>
                          <div className="text-sm text-gray-600">Passport: {passenger.passport}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
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

                <button
                  onClick={() => handleDelete(booking.id, `${booking.departureCity} → ${booking.arrivalCity}`)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg transition-all"
                  title="Delete booking"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Statistics */}
      {bookings.length > 0 && (
        <div className="mt-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-[#eae6f7] p-6">
          <h3 className="text-xl font-bold text-[#463f5e] mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#463f5e]">{bookings.length}</div>
              <div className="text-sm text-gray-700 font-medium">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.isCompleted).length}
              </div>
              <div className="text-sm text-gray-700 font-medium">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {bookings.filter(b => !b.isCompleted).length}
              </div>
              <div className="text-sm text-gray-700 font-medium">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#463f5e]">
                {bookings.filter(b => b.tripType === 'Round-trip').length}
              </div>
              <div className="text-sm text-gray-700 font-medium">Round Trips</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#463f5e]">
                {bookings.reduce((total, b) => total + b.totalPassengers, 0)}
              </div>
              <div className="text-sm text-gray-700 font-medium">Total Passengers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#463f5e]">
                {bookings.filter(b => b.specialAssistance || b.mealPreference).length}
              </div>
              <div className="text-sm text-gray-700 font-medium">With Requests</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 