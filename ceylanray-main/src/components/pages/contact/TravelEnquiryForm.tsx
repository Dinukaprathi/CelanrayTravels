"use client";
// import Button from "@/components/common/Button";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

const TravelEnquiryForm = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        services: [] as string[],
        travelDates: {
            arrival: "",
            departure: "",
        },
        numberOfTravelers: "",
        preferences: "",
        additionalDetails: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const services = [
        "Air Tickets",
        "Hotel Bookings",
        "Travel Packages",
        "Custom Itinerary",
        "Transportation",
        "Guide Services"
    ];

    const handleServiceToggle = (service: string) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((s) => s !== service)
                : [...prev.services, service],
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/travel-enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send enquiry');
            }

            setIsSubmitted(true);
            // Reset form
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                services: [],
                travelDates: {
                    arrival: "",
                    departure: "",
                },
                numberOfTravelers: "",
                preferences: "",
                additionalDetails: "",
            });
            setDate(undefined);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send enquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-100/30  p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                            className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                            className="w-full px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>

                    {/* Travel Dates */}
                    <div className="space-y-4">
                        <label className="block text-sm text-neutral-600">Travel Dates</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className={cn(
                                        "w-full flex items-center justify-start px-4 py-3 border border-gray-100/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-left font-normal relative group",
                                        !date && "text-neutral-500"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick your travel dates</span>
                                    )}
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Select two dates for your travel range
                                    </span>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={(selectedDate) => {
                                        setDate(selectedDate);
                                        if (selectedDate?.from && selectedDate?.to) {
                                            setFormData(prev => ({
                                                ...prev,
                                                travelDates: {
                                                    arrival: selectedDate.from ? format(selectedDate.from, "yyyy-MM-dd") : "",
                                                    departure: selectedDate.to ? format(selectedDate.to, "yyyy-MM-dd") : ""
                                                }
                                            }));
                                        }
                                    }}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <label className="block text-sm text-neutral-600">Services Required</label>
                        <div className="flex flex-wrap gap-3">
                            {services.map((service) => (
                                <button
                                    key={service}
                                    type="button"
                                    onClick={() => handleServiceToggle(service)}
                                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                        formData.services.includes(service)
                                            ? "bg-primary text-white"
                                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                    }`}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Number of Travelers */}
                    <div>
                        <label className="block text-sm text-neutral-600 mb-2">Number of Travelers</label>
                        <select
                            value={formData.numberOfTravelers}
                            onChange={(e) => setFormData(prev => ({...prev, numberOfTravelers: e.target.value}))}
                            className="w-full px-4 py-3 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select...</option>
                            <option value="1 adult">1 adult</option>
                            <option value="2 adults">2 adults</option>
                            <option value="2 adults and 1 child">2 adults and 1 child</option>
                            <option value="3 adults">3 adults</option>
                            <option value="4 adults">4 adults</option>
                            <option value="5 adults">5 adults</option>
                            <option value="2 adults and 2 children">2 adults and 2 children</option>
                            <option value="3 adults and 1 child">3 adults and 1 child</option>
                        </select>
                    </div>

                    {/* Additional Details */}
                    <div>
                        <label className="block text-sm text-neutral-600 mb-2">Additional Details</label>
                        <textarea
                            placeholder="Tell us about your preferences, special requirements, or any questions you have..."
                            value={formData.additionalDetails}
                            onChange={(e) => setFormData(prev => ({...prev, additionalDetails: e.target.value}))}
                            className="w-full px-4 py-3 border border-gray-100/50 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting || isSubmitted}
                            className={`btn-primary px-8 py-3 rounded-md transition-all duration-200 ${
                                (isSubmitting || isSubmitted) ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                                "Sending..."
                            ) : isSubmitted ? (
                                "Enquiry Sent!"
                            ) : (
                                "Send Enquiry"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TravelEnquiryForm; 