"use client";
import React, { useEffect, useState } from "react";
import { Trash2, CheckCircle, Circle, AlertCircle } from "lucide-react";

interface PackageWithoutOffers {
  id: string;
  title: string;
  description?: string;
  price: string;
  duration: string;
  category: string;
  interests: string;
  inclusions: string;
  image: string;
}

interface PackageWithOffers {
  id: string;
  title: string;
  description?: string;
  priceWithOffer: string;
  priceWithoutOffer: string;
  duration: string;
  category: string;
  interests: string;
  inclutions: string;
  imageURL: string;
  startDate: string;
  endDate: string;
}

interface PackageBooking {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  packageId?: string;
  packageWithOffersId?: string;
  package?: PackageWithoutOffers;
  packageWithOffers?: PackageWithOffers;
  isCompleted?: boolean;
}

export default function ViewPackageBookings() {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    fetch("/api/package-booking")
      .then((res) => res.json())
      .then((data: PackageBooking[]) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching package bookings:", error);
        setLoading(false);
      });
  }, []);

  // Helper to get package name and details
  const getPackageInfo = (booking: PackageBooking) => {
    if (booking.packageWithOffers) {
      return {
        name: booking.packageWithOffers.title,
        type: "Offer Package",
        price: booking.packageWithOffers.priceWithOffer,
        duration: booking.packageWithOffers.duration,
        category: booking.packageWithOffers.category
      };
    } else if (booking.package) {
      return {
        name: booking.package.title,
        type: "Regular Package",
        price: booking.package.price,
        duration: booking.package.duration,
        category: booking.package.category
      };
    } else {
      return {
        name: "Unknown Package",
        type: "N/A",
        price: "N/A",
        duration: "N/A",
        category: "N/A"
      };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (bookingId: string, bookingName: string) => {
    if (window.confirm(`Are you sure you want to delete the package booking for ${bookingName}? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/package-booking/${bookingId}`, { 
          method: 'DELETE' 
        });
        
        if (response.ok) {
          setBookings(bookings.filter(b => b.id !== bookingId));
          setAlertMsg("Package booking deleted successfully!");
        } else {
          const errorData = await response.json();
          setAlertMsg(`Error: ${errorData.error || 'Failed to delete booking'}`);
        }
      } catch (error) {
        console.error('Error deleting package booking:', error);
        setAlertMsg('Error: Failed to delete booking');
      }
      
      setTimeout(() => setAlertMsg(""), 3000);
    }
  };

  const handleToggleCompletion = async (bookingId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/package-booking/${bookingId}`, {
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
      <h2 className="text-3xl font-bold text-[#463f5e] mb-8 text-center drop-shadow">All Package Bookings</h2>
      
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
        <div className="text-center text-xl text-[#463f5e]">Loading package bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">No package bookings found.</div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const packageInfo = getPackageInfo(booking);
            return (
              <div key={booking.id} className={`bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-[#eae6f7] p-6 ${
                booking.isCompleted ? 'bg-green-50' : ''
              }`}>
                {/* Booking Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-300">
                  <div>
                    <h3 className="text-xl font-bold text-[#463f5e] mb-2">
                      {booking.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 font-medium">
                      <span><strong className="text-[#463f5e]">Email:</strong> {booking.email}</span>
                      <span><strong className="text-[#463f5e]">Phone:</strong> {booking.phone}</span>
                      <span><strong className="text-[#463f5e]">Booking ID:</strong> {booking.id.slice(0, 8)}...</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600 font-medium">
                    <div>Booked: {formatDate(booking.createdAt)}</div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-[#463f5e] mb-3 text-lg">Package Details</h4>
                    <div className="space-y-2 text-sm text-gray-800">
                      <div><strong className="text-[#463f5e]">Package Name:</strong> {packageInfo.name}</div>
                      <div><strong className="text-[#463f5e]">Type:</strong> {packageInfo.type}</div>
                      <div><strong className="text-[#463f5e]">Price:</strong> {packageInfo.price}</div>
                      <div><strong className="text-[#463f5e]">Duration:</strong> {packageInfo.duration}</div>
                      <div><strong className="text-[#463f5e]">Category:</strong> {packageInfo.category}</div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-[#463f5e] mb-3 text-lg">Customer Message</h4>
                    <div className="text-sm text-gray-800">
                      {booking.message ? (
                        <div className="italic">{booking.message}</div>
                      ) : (
                        <div className="text-gray-600 font-medium">No message provided</div>
                      )}
                    </div>
                  </div>
                </div>

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
                    onClick={() => handleDelete(booking.id, booking.name)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg transition-all"
                    title="Delete booking"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Statistics */}
      {bookings.length > 0 && (
        <div className="mt-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-[#eae6f7] p-6">
          <h3 className="text-xl font-bold text-[#463f5e] mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                {bookings.filter(b => b.packageWithOffers).length}
              </div>
              <div className="text-sm text-gray-700 font-medium">Offer Packages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#463f5e]">
                {bookings.filter(b => b.message).length}
              </div>
              <div className="text-sm text-gray-700 font-medium">With Messages</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 