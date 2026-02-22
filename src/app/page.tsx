'use client';

import { useState } from 'react';
import CompaniesList from '@/components/CompaniesList';
import InterviewRounds from '@/components/InterviewRounds';
import ResumeVersions from '@/components/ResumeVersions';
import CGPATracker from '@/components/CGPATracker';
import OfferStatus from '@/components/OfferStatus';
import SkillsTracker from '@/components/SkillsTracker';
import { useData } from '@/context/DataContext';
import { CSVLink } from 'react-csv';
import { FaTachometerAlt, FaBuilding, FaUserFriends, FaFileAlt, FaChartLine, FaHandshake, FaTools, FaDatabase } from 'react-icons/fa';

export default function Home() {
  const { companies, resumes, cgpaEntries, offers, skills } = useData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const stats = {
    totalCompanies: companies.length,
    applied: companies.filter(c => c.status === 'applied').length,
    interviews: companies.filter(c => c.status === 'interview').length,
    offers: companies.filter(c => c.status === 'offer').length,
    rejected: companies.filter(c => c.status === 'rejected').length,
    totalResumes: resumes.length,
    totalCGPAEntries: cgpaEntries.length,
    averageCGPA: cgpaEntries.length > 0 ? (cgpaEntries.reduce((sum, e) => sum + e.cgpa, 0) / cgpaEntries.length).toFixed(2) : 0,
    totalOffers: offers.length,
    acceptedOffers: offers.filter(o => o.status === 'accepted').length,
    totalSkills: skills.length,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Student Placement Tracker</h1>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap border-b mb-4">
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaTachometerAlt /> Dashboard
          </button>
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'companies' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            <FaBuilding /> Companies
          </button>
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'interviews' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('interviews')}
          >
            <FaUserFriends /> Interviews
          </button>
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'resumes' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('resumes')}
          >
            <FaFileAlt /> Resumes
          </button>
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'cgpa' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('cgpa')}
          >
            <FaChartLine /> CGPA
          </button>
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'offers' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            <FaHandshake /> Offers
          </button>
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'skills' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <FaTools /> Skills
          </button>
          <button
            className={`p-2 flex items-center gap-1 ${activeTab === 'dataset' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('dataset')}
          >
            <FaDatabase /> Live Dataset
          </button>
        </div>
        {activeTab === 'dashboard' && <Dashboard stats={stats} />}
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
        {activeTab === 'skills' && <SkillsTracker />}
        {activeTab === 'dataset' && <LiveDataset />}
      </div>
    </div>
  );
}

function Dashboard({ stats }: { stats: any }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Total Companies</h3>
          <p className="text-2xl">{stats.totalCompanies}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Applied</h3>
          <p className="text-2xl">{stats.applied}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Interviews</h3>
          <p className="text-2xl">{stats.interviews}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Offers</h3>
          <p className="text-2xl">{stats.offers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Rejected</h3>
          <p className="text-2xl">{stats.rejected}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Total Resumes</h3>
          <p className="text-2xl">{stats.totalResumes}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Average CGPA</h3>
          <p className="text-2xl">{stats.averageCGPA}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Accepted Offers</h3>
          <p className="text-2xl">{stats.acceptedOffers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg">Total Skills</h3>
          <p className="text-2xl">{stats.totalSkills}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
        <ul>
          <li>Last updated: {new Date().toLocaleDateString()}</li>
          <li>Track your placement journey with detailed insights!</li>
        </ul>
      </div>
    </div>
  );
}

function LiveDataset() {
  const { companies, resumes, cgpaEntries, offers, skills } = useData();

  const csvData = [
    ['Companies'],
    ['Name', 'Applied Date', 'Status', 'Job Role', 'Location', 'Interview Rounds'],
    ...companies.map(c => [c.name, c.appliedDate, c.status, c.jobRole || '', c.location || '', c.interviewRounds.length.toString()]),
    [],
    ['Resumes'],
    ['Version', 'Upload Date', 'File', 'Description', 'Tags'],
    ...resumes.map(r => [r.version, r.uploadDate, r.file, r.description || '', r.tags?.join(', ') || '']),
    [],
    ['CGPA Entries'],
    ['Semester', 'CGPA', 'Date', 'Subjects'],
    ...cgpaEntries.map(e => [e.semester, e.cgpa.toString(), e.date, e.subjects?.map(s => `${s.name}: ${s.grade}`).join(', ') || '']),
    [],
    ['Offers'],
    ['Company', 'Status', 'Salary', 'Location', 'Details'],
    ...offers.map(o => {
      const company = companies.find(c => c.id === o.companyId);
      return [company?.name || '', o.status, o.salary?.toString() || '', o.location || '', o.details];
    }),
    [],
    ['Skills'],
    ['Name', 'Level', 'Category'],
    ...skills.map(s => [s.name, s.level, s.category]),
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live Dataset</h2>
      <div className="mb-4">
        <CSVLink data={csvData} filename="placement-data.csv" className="bg-green-500 text-white p-2 rounded">
          Export to CSV
        </CSVLink>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Companies</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Applied Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Job Role</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Interview Rounds</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id}>
                <td className="border border-gray-300 p-2">{c.name}</td>
                <td className="border border-gray-300 p-2">{c.appliedDate}</td>
                <td className="border border-gray-300 p-2">{c.status}</td>
                <td className="border border-gray-300 p-2">{c.jobRole || '-'}</td>
                <td className="border border-gray-300 p-2">{c.location || '-'}</td>
                <td className="border border-gray-300 p-2">{c.interviewRounds.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Resumes</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Version</th>
              <th className="border border-gray-300 p-2">Upload Date</th>
              <th className="border border-gray-300 p-2">File</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Tags</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((r) => (
              <tr key={r.id}>
                <td className="border border-gray-300 p-2">{r.version}</td>
                <td className="border border-gray-300 p-2">{r.uploadDate}</td>
                <td className="border border-gray-300 p-2">{r.file}</td>
                <td className="border border-gray-300 p-2">{r.description || '-'}</td>
                <td className="border border-gray-300 p-2">{r.tags?.join(', ') || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">CGPA Entries</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Semester</th>
              <th className="border border-gray-300 p-2">CGPA</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Subjects</th>
            </tr>
          </thead>
          <tbody>
            {cgpaEntries.map((e) => (
              <tr key={e.id}>
                <td className="border border-gray-300 p-2">{e.semester}</td>
                <td className="border border-gray-300 p-2">{e.cgpa}</td>
                <td className="border border-gray-300 p-2">{e.date}</td>
                <td className="border border-gray-300 p-2">{e.subjects?.map(s => `${s.name}: ${s.grade}`).join(', ') || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Offers</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Company</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Salary</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => {
              const company = companies.find(c => c.id === o.companyId);
              return (
                <tr key={o.id}>
                  <td className="border border-gray-300 p-2">{company?.name}</td>
                  <td className="border border-gray-300 p-2">{o.status}</td>
                  <td className="border border-gray-300 p-2">{o.salary || '-'}</td>
                  <td className="border border-gray-300 p-2">{o.location || '-'}</td>
                  <td className="border border-gray-300 p-2">{o.details}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Skills</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Level</th>
              <th className="border border-gray-300 p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s.id}>
                <td className="border border-gray-300 p-2">{s.name}</td>
                <td className="border border-gray-300 p-2">{s.level}</td>
                <td className="border border-gray-300 p-2">{s.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
