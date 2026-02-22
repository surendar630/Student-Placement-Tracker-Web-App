'use client';

import { useState } from 'react';
import CompaniesList from '@/components/CompaniesList';
import InterviewRounds from '@/components/InterviewRounds';
import ResumeVersions from '@/components/ResumeVersions';
import CGPATracker from '@/components/CGPATracker';
import OfferStatus from '@/components/OfferStatus';
import { useData } from '@/context/DataContext';

export default function Dashboard() {
  const { companies } = useData();
  const [activeTab, setActiveTab] = useState('companies');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const tabs = [
    { id: 'companies', label: 'Applied Companies' },
    { id: 'interviews', label: 'Interview Rounds' },
    { id: 'resumes', label: 'Resume Versions' },
    { id: 'cgpa', label: 'CGPA Tracker' },
    { id: 'offers', label: 'Offer Status' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Student Placement Tracker</h1>
      <div className="flex justify-center mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 mx-2 rounded ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        {activeTab === 'companies' && <CompaniesList />}
        {activeTab === 'interviews' && (
          <div>
            <select
              value={selectedCompany || ''}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="border p-2 mb-4"
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {selectedCompany && <InterviewRounds companyId={selectedCompany} />}
          </div>
        )}
        {activeTab === 'resumes' && <ResumeVersions />}
        {activeTab === 'cgpa' && <CGPATracker />}
        {activeTab === 'offers' && <OfferStatus />}
      </div>
    </div>
  );
}