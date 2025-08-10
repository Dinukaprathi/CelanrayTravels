"use client";
import React, { useState, useEffect } from "react";

export default function ManagePackages() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    interests: "",
    inclusions: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [inclusionInput, setInclusionInput] = useState("");
  const [offerType, setOfferType] = useState("No Offer");
  const [offerStart, setOfferStart] = useState("");
  const [offerEnd, setOfferEnd] = useState("");
  const [priceWithoutOffer, setPriceWithoutOffer] = useState("");
  const [priceWithOffer, setPriceWithOffer] = useState("");

  const INTEREST_TAGS = [
    'Adventure', 'Wildlife', 'Ayurvedic', 'Honeymoon', 'Heritage', 'Beaches', 'Culture', 'Hill country', 'Rural', 'Town', 'Forests'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleInterestKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && interestInput.trim()) {
      e.preventDefault();
      if (!interests.includes(interestInput.trim())) {
        setInterests([...interests, interestInput.trim()]);
      }
      setInterestInput("");
    }
  }
  function removeInterest(idx: number) {
    setInterests(interests.filter((_, i) => i !== idx));
  }
  function handleInclusionKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && inclusionInput.trim()) {
      e.preventDefault();
      if (!inclusions.includes(inclusionInput.trim())) {
        setInclusions([...inclusions, inclusionInput.trim()]);
      }
      setInclusionInput("");
    }
  }
  function removeInclusion(idx: number) {
    setInclusions(inclusions.filter((_, i) => i !== idx));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      let endpoint = "/api/package-without-offers";
      let body: any = {
        title: form.title,
        description: form.description,
        image: form.image,
        price: form.price,
        duration: form.duration,
        category: form.category,
        interests,
        inclusions,
      };
      if (offerType === "Offer") {
        endpoint = "/api/package-with-offers";
        body = {
          title: form.title,
          description: form.description,
          packageId: "", // You may want to generate or handle this appropriately
          priceWithOffer,
          priceWithoutOffer,
          startDate: offerStart,
          endDate: offerEnd,
          duration: form.duration,
          imageURL: form.image,
          category: form.category,
          interests: interests.join(", "),
          inclutions: inclusions.join(", "),
        };
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to create package");
      setSuccess(true);
      setForm({ title: "", description: "", image: "", price: "", duration: "", category: "", interests: "", inclusions: "" });
      setInterests([]);
      setInclusions([]);
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    setLoadingPackages(true);
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      // Merge and tag packages
      const withoutOffers = (data.packagesWithoutOffers || []).map((pkg: any) => ({ ...pkg, type: "without-offer" }));
      const withOffers = (data.packagesWithOffers || []).map((pkg: any) => ({ ...pkg, type: "with-offer" }));
      setPackages([...withoutOffers, ...withOffers]);
    } catch {
      setPackages([]);
    } finally {
      setLoadingPackages(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (success) fetchPackages();
  }, [success]);

  return (
    <div className="w-full flex flex-row gap-8 max-w-7xl mx-auto items-start ml-0">
      {/* Left: Create Package Card */}
      <div className="max-w-2xl w-full flex-shrink-0 flex flex-col justify-start">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#eae6f7] p-8 flex flex-col">
          <h2 className="text-3xl font-bold text-[#463f5e] mb-6 text-center drop-shadow">Create a New Package</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* First row: Title only */}
            <div>
              <label className="block text-[#463f5e] font-semibold mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
            </div>
            {/* Second row: Category and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#463f5e] font-semibold mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]">
                  <option value="">Select category</option>
                  <option value="Budget">Budget</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Semi-Luxury">Semi-Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-[#463f5e] font-semibold mb-1">Offers</label>
                <select value={offerType} onChange={e => setOfferType(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]">
                  <option value="No Offer">No Offer</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>
            </div>
            {/* Offer fields (dynamic) */}
            {offerType === "Offer" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#463f5e] font-semibold mb-1">Offer Start</label>
                    <input type="datetime-local" value={offerStart} onChange={e => setOfferStart(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
                  </div>
                  <div>
                    <label className="block text-[#463f5e] font-semibold mb-1">Offer End</label>
                    <input type="datetime-local" value={offerEnd} onChange={e => setOfferEnd(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#463f5e] font-semibold mb-1">Price without Offer</label>
                    <input type="text" value={priceWithoutOffer} onChange={e => setPriceWithoutOffer(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
                  </div>
                  <div>
                    <label className="block text-[#463f5e] font-semibold mb-1">Price with Offer</label>
                    <input type="text" value={priceWithOffer} onChange={e => setPriceWithOffer(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-[#463f5e] font-semibold mb-1">Price</label>
                <input name="price" value={form.price} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
              </div>
            )}
            {/* Duration, Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#463f5e] font-semibold mb-1">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
              </div>
              <div>
                <label className="block text-[#463f5e] font-semibold mb-1">Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} required className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block text-[#463f5e] font-semibold mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-lg text-gray-800 bg-white/90 focus:border-[#463f5e]" />
            </div>
            {/* Interests and Inclusions as tag inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#463f5e] font-semibold mb-1">Interests</label>
                <div className="flex flex-wrap gap-3">
                  {INTEREST_TAGS.map(tag => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() =>
                        interests.includes(tag)
                          ? setInterests(interests.filter(t => t !== tag))
                          : setInterests([...interests, tag])
                      }
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-base
                        ${interests.includes(tag)
                          ? 'bg-[#4F8CFF] text-white'
                          : 'bg-gray-100 text-[#463f5e] hover:bg-[#eae6f7]'}
                      `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[#463f5e] font-semibold mb-1">Inclusions</label>
                <div className="flex flex-wrap gap-2 border rounded-lg px-2 py-1 bg-white/90 min-h-[44px]">
                  {inclusions.map((tag, idx) => (
                    <span key={idx} className="bg-[#b8a6e8]/40 text-[#463f5e] px-2 py-1 rounded-full flex items-center">
                      {tag}
                      <button type="button" onClick={() => removeInclusion(idx)} className="ml-1 text-xs">×</button>
                    </span>
                  ))}
                  <input
                    className="flex-1 border-none outline-none bg-transparent text-gray-800 min-w-[80px]"
                    value={inclusionInput}
                    onChange={e => setInclusionInput(e.target.value)}
                    onKeyDown={handleInclusionKeyDown}
                    placeholder={inclusions.length === 0 ? "Add inclusion" : ""}
                  />
                </div>
              </div>
            </div>
            {error && <div className="text-red-500 text-center bg-red-50 p-2 rounded-lg">{error}</div>}
            {success && <div className="text-green-600 text-center bg-green-50 p-2 rounded-lg">Package created successfully!</div>}
            <button type="submit" disabled={loading} className="w-full max-w-xs mx-auto h-12 bg-[#463f5e] hover:bg-[#463f5ecc] text-white font-bold text-xl rounded-xl transition-all shadow-lg mt-6 disabled:opacity-60">
              {loading ? "Creating..." : "Create Package"}
            </button>
          </form>
        </div>
      </div>
      {/* Right: Package List */}
      <div className="flex-1 max-w-lg w-full flex flex-col justify-start bg-[#f6f4fa] border border-[#eae6f7] rounded-2xl shadow-xl p-8 max-h-[70vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#463f5e] mb-4 text-center">All Packages</h2>
        {loadingPackages ? (
          <div className="text-center text-[#7c6fa7]">Loading packages...</div>
        ) : packages.length === 0 ? (
          <div className="text-center text-[#7c6fa7]">No packages found.</div>
        ) : (
          <div className="grid gap-6">
            {packages.map((pkg: any) => (
              <div
                key={pkg.id}
                className="relative bg-white/90 border border-[#eae6f7] rounded-xl shadow-md p-6 flex flex-col gap-2 transition-transform hover:scale-[1.02]"
              >
                {/* Offer badge and animation */}
                {pkg.type === "with-offer" && (
                  <div className="absolute top-4 right-4 flex items-center z-10">
                    <span className="relative flex h-6 w-6 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F8CFF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-6 w-6 bg-[#4F8CFF] items-center justify-center text-white text-xs font-bold shadow">%</span>
                    </span>
                    <span className="bg-[#4F8CFF] text-white px-2 py-1 rounded font-semibold text-xs animate-bounce">OFFER</span>
                  </div>
                )}
                <div className="flex gap-4 items-center">
                  <img
                    src={pkg.image || pkg.imageURL || "/public/common/company-logo.webp"}
                    alt={pkg.title}
                    className="w-24 h-24 object-cover rounded-lg border border-[#eae6f7] bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-[#463f5e]">{pkg.title}</h3>
                      {pkg.type === "with-offer" && (
                        <span className="ml-2 text-xs text-[#4F8CFF] font-bold">Limited Time!</span>
                      )}
                    </div>
                    <div className="text-[#7c6fa7] text-sm mb-1">{pkg.category} &bull; {pkg.duration} days</div>
                    <div className="text-[#463f5e] text-sm mb-2">{pkg.description}</div>
                    <div className="flex items-center gap-2 mb-1">
                      {pkg.type === "with-offer" ? (
                        <>
                          <span className="text-lg text-gray-400 line-through">{pkg.priceWithoutOffer || pkg.price}</span>
                          <span className="text-lg text-[#4F8CFF] font-bold">{pkg.priceWithOffer}</span>
                        </>
                      ) : (
                        <span className="text-lg text-[#463f5e] font-bold">{pkg.price}</span>
                      )}
                    </div>
                    {pkg.type === "with-offer" && (
                      <div className="text-xs text-[#4F8CFF] font-semibold mb-1">
                        Offer: {pkg.startDate ? new Date(pkg.startDate).toLocaleString() : "-"} to {pkg.endDate ? new Date(pkg.endDate).toLocaleString() : "-"}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(pkg.interests ? (Array.isArray(pkg.interests) ? pkg.interests : String(pkg.interests).split(",")) : []).map((tag: any, idx: number) => (
                        <span key={idx} className="bg-[#b8a6e8]/40 text-[#463f5e] px-2 py-1 rounded-full text-xs">{tag.trim()}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(pkg.inclusions ? (Array.isArray(pkg.inclusions) ? pkg.inclusions : String(pkg.inclusions).split(",")) : []).map((tag: any, idx: number) => (
                        <span key={idx} className="bg-[#eae6f7] text-[#463f5e] px-2 py-1 rounded-full text-xs">{tag.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 