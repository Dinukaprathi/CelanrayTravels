"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';

export default function ViewPackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const INTEREST_TAGS = [
    'Adventure', 'Wildlife', 'Ayurvedic', 'Honeymoon', 'Heritage', 'Beaches', 'Culture', 'Hill country', 'Rural', 'Town', 'Forests'
  ];

  useEffect(() => {
    fetch("/api/packages")
      .then(res => res.json())
      .then(data => {
        // Merge both arrays if present
        if (data && (Array.isArray(data.packagesWithoutOffers) || Array.isArray(data.packagesWithOffers))) {
          const pkgs = [
            ...(data.packagesWithoutOffers?.map((p: any) => ({ ...p, type: 'without-offer' })) || []),
            ...(data.packagesWithOffers?.map((p: any) => ({ ...p, type: 'with-offer' })) || [])
          ];
          setPackages(pkgs);
        } else {
          setPackages([]);
        }
        setLoading(false);
      });
  }, []);

  const handleEdit = (pkg: any) => {
    setEditing(pkg);
    setEditForm({
      ...pkg,
      inclusions:
        pkg.type === 'with-offer'
          ? (typeof pkg.inclutions === 'string' && pkg.inclutions.length > 0
              ? pkg.inclutions.split(',').map((s: string) => s.trim())
              : [])
          : Array.isArray(pkg.inclusions)
            ? pkg.inclusions
            : (typeof pkg.inclusions === 'string' && pkg.inclusions.length > 0)
              ? pkg.inclusions.split(',').map((s: string) => s.trim())
              : [],
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    setSaving(true);
    let payload = { ...editForm };
    if (editing.type === 'with-offer') {
      payload = {
        ...payload,
        inclutions: Array.isArray(editForm.inclusions) ? editForm.inclusions.join(', ') : '',
        // Remove inclusions array to avoid confusion in API
        inclusions: undefined,
      };
    } else {
      payload = {
        ...payload,
        inclusions: Array.isArray(editForm.inclusions) ? editForm.inclusions : [],
      };
    }
    const res = await fetch(`/api/packages/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const updated = await res.json();
      setPackages(pkgs => pkgs.map(p => p.id === updated.id ? updated : p));
      setEditing(null);
      setSuccessMsg("Package updated successfully!");
      setTimeout(() => setSuccessMsg(""), 1500);
    }
    setSaving(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-[#463f5e] mb-8 text-center drop-shadow">All Packages</h2>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading packages...</div>
        ) : packages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No packages found.</div>
        ) : (
          <div className="flex flex-col gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="grid grid-cols-5 gap-4 items-center bg-white/80 backdrop-blur-md rounded-xl shadow border border-[#eae6f7] p-6">
                <div className="col-span-1 flex items-center justify-center">
                  {pkg.image ? (
                    <img src={pkg.image} alt={pkg.title} className="object-cover w-full h-full" onError={e => e.currentTarget.src = '/fallback.jpg'} />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="col-span-2">
                  <h4 className="text-xl font-semibold text-[#463f5e]">{pkg.title}</h4>
                  <p className="text-gray-500 text-sm mt-1">{pkg.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {pkg.inclusions && pkg.inclusions.map((inc: string, idx: number) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{inc}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {pkg.exclusions && pkg.exclusions.map((exc: string, idx: number) => (
                      <span key={idx} className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">{exc}</span>
                    ))}
                  </div>
                </div>
                <div className="col-span-1 text-gray-600 text-center">
                  <div className="text-lg font-bold">{pkg.duration}</div>
                  {pkg.type === 'with-offer' ? (
                    <>
                      <span className="inline-block bg-[#b8a6e8]/20 text-[#463f5e] px-3 py-1 rounded-full text-base font-medium mt-2 line-through">
                        {pkg.priceWithoutOffer ? (pkg.priceWithoutOffer.toString().startsWith('$') ? pkg.priceWithoutOffer : `$${pkg.priceWithoutOffer}`) : '-'}
                      </span>
                      <span className="inline-block bg-[#b8a6e8]/20 text-[#463f5e] px-3 py-1 rounded-full text-base font-medium mt-2 ml-2">
                        {pkg.priceWithOffer ? (pkg.priceWithOffer.toString().startsWith('$') ? pkg.priceWithOffer : `$${pkg.priceWithOffer}`) : '-'}
                      </span>
                    </>
                  ) : (
                    <span className="inline-block bg-[#b8a6e8]/20 text-[#463f5e] px-3 py-1 rounded-full text-base font-medium mt-2">
                      {pkg.price ? (pkg.price.toString().startsWith('$') ? pkg.price : `$${pkg.price}`) : '-'}
                    </span>
                  )}
                </div>
                <div className="col-span-1 flex flex-col items-end gap-2">
                  <button onClick={() => handleEdit(pkg)} className="px-4 py-2 bg-[#6A82FB] text-white rounded-lg font-semibold shadow hover:bg-[#4F8CFF] transition">Edit</button>
                  <button onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this package?')) {
                      const res = await fetch(`/api/packages/${pkg.id}`, { method: 'DELETE' });
                      if (res.ok) {
                        setPackages(pkgs => pkgs.filter(p => p.id !== pkg.id));
                        setSuccessMsg('Package deleted successfully!');
                        setTimeout(() => setSuccessMsg(''), 1500);
                      }
                    }
                  }} className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Success Alert Box */}
      {successMsg && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-[#6A82FB] to-[#C46DD6] text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold animate-fade-in-out">
          {successMsg}
        </div>
      )}
      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setEditing(null)}>&times;</button>
            <h3 className="text-2xl font-bold mb-4 text-[#463f5e]">Edit Package</h3>
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-[#463f5e]">Title
                <input name="title" value={editForm.title || ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
              </label>
              <label className="font-semibold text-[#463f5e]">Description
                <textarea name="description" value={editForm.description || ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" rows={3} />
              </label>
              <label className="font-semibold text-[#463f5e]">Image URL
                <input name="image" value={editForm.image || editForm.imageURL || ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
              </label>
              <label className="font-semibold text-[#463f5e]">Duration
                <input name="duration" value={editForm.duration || ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
              </label>
              {/* Show price fields for both types */}
              {editing.type === 'with-offer' ? (
                <>
                  <label className="font-semibold text-[#463f5e]">Price Without Offer
                    <input name="priceWithoutOffer" value={editForm.priceWithoutOffer || ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
                  </label>
                  <label className="font-semibold text-[#463f5e]">Price With Offer
                    <input name="priceWithOffer" value={editForm.priceWithOffer || ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
                  </label>
                  <label className="font-semibold text-[#463f5e]">Offer Start Date
                    <input name="startDate" type="datetime-local" value={editForm.startDate ? editForm.startDate.slice(0, 16) : ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
                  </label>
                  <label className="font-semibold text-[#463f5e]">Offer End Date
                    <input name="endDate" type="datetime-local" value={editForm.endDate ? editForm.endDate.slice(0, 16) : ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
                  </label>
                </>
              ) : (
                <label className="font-semibold text-[#463f5e]">Price
                  <input name="price" value={editForm.price || ''} onChange={handleEditChange} className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base text-gray-800 bg-white/90 focus:border-[#6A82FB] focus:ring-2 focus:ring-[#6A82FB] transition" />
                </label>
              )}
              {/* Interests as selectable tags */}
              <label className="font-semibold text-[#463f5e]">Interests</label>
              <div className="flex flex-wrap gap-2 border rounded-lg px-2 py-2 bg-white/90 min-h-[44px] mb-4">
                {INTEREST_TAGS.map(tag => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() =>
                      editForm.interests.includes(tag)
                        ? setEditForm({ ...editForm, interests: editForm.interests.filter((t: string) => t !== tag) })
                        : setEditForm({ ...editForm, interests: [...editForm.interests, tag] })
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-base
                      ${editForm.interests.includes(tag)
                        ? 'bg-[#b8a6e8]/80 text-[#463f5e]'
                        : 'bg-gray-100 text-[#463f5e] hover:bg-[#eae6f7]'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {/* Inclusions as tag input */}
              <label className="font-semibold text-[#463f5e]">Inclusions</label>
              <div className="flex flex-wrap gap-2 border rounded-lg px-2 py-2 bg-white/90 min-h-[44px] mb-4">
                {(Array.isArray(editForm.inclusions) ? editForm.inclusions : []).map((tag: string, idx: number) => (
                  <span key={idx} className="bg-[#b8a6e8]/40 text-[#463f5e] px-2 py-1 rounded-full flex items-center">
                    {tag}
                    <button type="button" onClick={() => setEditForm({ ...editForm, inclusions: (Array.isArray(editForm.inclusions) ? editForm.inclusions : []).filter((_: string, i: number) => i !== idx) })} className="ml-1 text-xs">×</button>
                  </span>
                ))}
                <input
                  className="flex-1 border-none outline-none bg-transparent text-gray-800 min-w-[80px]"
                  value={editForm._inclusionInput || ''}
                  onChange={e => setEditForm({ ...editForm, _inclusionInput: e.target.value })}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ',') && editForm._inclusionInput?.trim()) {
                      e.preventDefault();
                      const inclusionsArr = Array.isArray(editForm.inclusions) ? editForm.inclusions : [];
                      if (!inclusionsArr.includes(editForm._inclusionInput.trim())) {
                        setEditForm({
                          ...editForm,
                          inclusions: [...inclusionsArr, editForm._inclusionInput.trim()],
                          _inclusionInput: ''
                        });
                      } else {
                        setEditForm({ ...editForm, _inclusionInput: '' });
                      }
                    }
                  }}
                  placeholder={(!editForm.inclusions || editForm.inclusions.length === 0) ? "Add inclusion" : ""}
                />
              </div>
              <button onClick={handleEditSave} disabled={saving} className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-[#6A82FB] to-[#4F8CFF] text-white rounded-lg font-semibold shadow hover:from-[#4F8CFF] hover:to-[#6A82FB] transition disabled:opacity-50 text-lg">{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 