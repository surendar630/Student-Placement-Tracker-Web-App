'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Company } from '@/types';

export default function CompaniesList() {
  const { companies, addCompany, updateCompany, deleteCompany } = useData();
  const [newCompany, setNewCompany] = useState({
    name: '',
    appliedDate: '',
    status: 'applied' as const,
    description: '',
    website: '',
    location: '',
    jobRole: ''
  });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === '' || c.status === filterStatus)
  );

  const handleAdd = () => {
    if (newCompany.name && newCompany.appliedDate) {
      addCompany({ ...newCompany, interviewRounds: [] });
      setNewCompany({
        name: '',
        appliedDate: '',
        status: 'applied',
        description: '',
        website: '',
        location: '',
        jobRole: ''
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Applied Companies</h2>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2"
        >
          <option value="">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Company Name"
          value={newCompany.name}
          onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          className="border p-2"
        />
        <input
          type="date"
          value={newCompany.appliedDate}
          onChange={(e) => setNewCompany({ ...newCompany, appliedDate: e.target.value })}
          className="border p-2"
        />
        <select
          value={newCompany.status}
          onChange={(e) => setNewCompany({ ...newCompany, status: e.target.value as any })}
          className="border p-2"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Job Role"
          value={newCompany.jobRole}
          onChange={(e) => setNewCompany({ ...newCompany, jobRole: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={newCompany.location}
          onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
          className="border p-2"
        />
        <input
          type="url"
          placeholder="Website"
          value={newCompany.website}
          onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          value={newCompany.description}
          onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
          className="border p-2 col-span-2"
          rows={3}
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white p-2 col-span-2">Add Company</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{company.name}</h3>
            <p><strong>Applied:</strong> {company.appliedDate}</p>
            <p><strong>Status:</strong> {company.status}</p>
            {company.jobRole && <p><strong>Role:</strong> {company.jobRole}</p>}
            {company.location && <p><strong>Location:</strong> {company.location}</p>}
            {company.website && <p><strong>Website:</strong> <a href={company.website} target="_blank" className="text-blue-500">{company.website}</a></p>}
            {company.description && <p><strong>Description:</strong> {company.description}</p>}
            <p><strong>Interview Rounds:</strong> {company.interviewRounds.length}</p>
            <button onClick={() => deleteCompany(company.id)} className="text-red-500 mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}