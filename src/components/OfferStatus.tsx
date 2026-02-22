'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';

export default function OfferStatus() {
  const { offers, companies, addOffer, updateOffer } = useData();
  const [newOffer, setNewOffer] = useState({ companyId: '', status: 'pending' as const, details: '', salary: 0, location: '' });

  const handleAdd = () => {
    if (newOffer.companyId && newOffer.details) {
      addOffer(newOffer);
      setNewOffer({ companyId: '', status: 'pending', details: '', salary: 0, location: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Offer Status</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={newOffer.companyId}
          onChange={(e) => setNewOffer({ ...newOffer, companyId: e.target.value })}
          className="border p-2"
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={newOffer.status}
          onChange={(e) => setNewOffer({ ...newOffer, status: e.target.value as any })}
          className="border p-2"
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
        <input
          type="number"
          placeholder="Salary"
          value={newOffer.salary}
          onChange={(e) => setNewOffer({ ...newOffer, salary: parseInt(e.target.value) })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={newOffer.location}
          onChange={(e) => setNewOffer({ ...newOffer, location: e.target.value })}
          className="border p-2"
        />
        <textarea
          placeholder="Details"
          value={newOffer.details}
          onChange={(e) => setNewOffer({ ...newOffer, details: e.target.value })}
          className="border p-2 col-span-2"
          rows={3}
        />
        <button onClick={handleAdd} className="bg-red-500 text-white p-2 col-span-2">Add Offer</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer) => {
          const company = companies.find(c => c.id === offer.companyId);
          return (
            <div key={offer.id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">{company?.name}</h3>
              <p><strong>Status:</strong> {offer.status}</p>
              {offer.salary && offer.salary > 0 && <p><strong>Salary:</strong> ${offer.salary}</p>}
              {offer.location && <p><strong>Location:</strong> {offer.location}</p>}
              <p><strong>Details:</strong> {offer.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}