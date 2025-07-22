"use client";
import React, { useState, useTransition } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Package } from './packages';

export default function BookingForm({ pkg }: { pkg: Package }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setShowAlert(false);
    startTransition(async () => {
      try {
        const res = await fetch('/api/package-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, packageId: pkg.id }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess(true);
          setShowAlert(true);
          setForm({ name: '', email: '', phone: '', message: '' });
        } else {
          setError(data.error || 'Booking failed.');
          setShowAlert(true);
        }
      } catch (err: any) {
        setError(err.message || 'Booking failed.');
        setShowAlert(true);
      }
    });
  };

  return (
    <>
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className={`flex flex-col items-center gap-3 p-8 rounded-2xl shadow-2xl border-2 ${success ? 'bg-[#ede9f7] border-[#b8a6e8]' : 'bg-red-50 border-red-200'}`}
               style={{ animation: 'fadeIn 0.3s' }}>
            {success ? (
              <CheckCircle2 size={48} className="text-[#7c6fa7] mb-2" />
            ) : (
              <XCircle size={48} className="text-[#c46dd6] mb-2" />
            )}
            <div className="flex-1 text-center">
              {success ? (
                <>
                  <div className="font-bold text-[#463f5e] text-2xl mb-2">Booking successful!</div>
                  <div className="text-[#7c6fa7] text-base">Our agent will contact you soon within 2-3 working days! Check your mail frequently!</div>
                </>
              ) : (
                <div className="text-[#c46dd6] font-semibold">{error}</div>
              )}
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 px-6 py-2 rounded-xl bg-[#7c6fa7] text-white font-bold hover:bg-[#463f5e] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e] transition-all duration-300" required />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e] transition-all duration-300" required />
        <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e] transition-all duration-300" required />
        <textarea name="message" placeholder="Additional Requests" value={form.message} onChange={handleChange} className="rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e] transition-all duration-300" rows={3} />
        <button type="submit" disabled={pending} className="mt-2 h-12 bg-[#463f5e] hover:bg-[#463f5ecc] text-white font-bold text-xl rounded-xl transition-all shadow-lg disabled:opacity-60">
          {pending ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </>
  );
} 