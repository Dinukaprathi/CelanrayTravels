"use client";
import React, { useEffect, useState } from "react";

function getTimeLeft(endDate: Date) {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function OfferCountdown({ endDate }: { endDate: string | Date }) {
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(end)); // Set initial value on client
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(end));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft === null) {
    // Render a placeholder or nothing until client-side calculation
    return <span className="text-xs text-blue-700 font-semibold">...</span>;
  }

  if (!timeLeft) {
    return <span className="text-xs text-red-500 font-semibold">Offer expired</span>;
  }

  return (
    <span className="text-xs text-blue-700 font-semibold">
      Offer ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
} 