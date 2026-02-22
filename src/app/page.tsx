'use client';

import { useState } from 'react';
import CompaniesList from '@/components/CompaniesList';
import InterviewRounds from '@/components/InterviewRounds';
import ResumeVersions from '@/components/ResumeVersions';
import CGPATracker from '@/components/CGPATracker';
import OfferStatus from '@/components/OfferStatus';
import SkillsTracker from '@/components/SkillsTracker';
import Dashboard from '@/components/Dashboard';
import LiveDataset from '@/components/LiveDataset';
import StudentsList from '@/components/StudentsList';
import { useData } from '@/context/DataContext';
import { CSVLink } from 'react-csv';
import { FaTachometerAlt, FaBuilding, FaUserFriends, FaFileAlt, FaChartLine, FaHandshake, FaTools, FaDatabase, FaUserGraduate } from 'react-icons/fa';

export default function Home() {
  const { companies, resumes, cgpaEntries, offers, skills, students } = useData();
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
    averageCGPA: cgpaEntries.length > 0 ? (cgpaEntries.reduce((sum, e) => sum + e.cgpa, 0) / cgpaEntries.length).toFixed(2) : '0',
    totalOffers: offers.length,
    acceptedOffers: offers.filter(o => o.status === 'accepted').length,
    totalSkills: skills.length,
    totalStudents: students.length,
    placedStudents: students.filter(s => s.placed === 'Yes').length,
    averageStudentCGPA: students.length > 0 ? (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2) : '0',
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Student Placement Tracker</h1>
        <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap bg-gray-100 rounded-lg p-1 mb-6">
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'dashboard' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaTachometerAlt /> Dashboard
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'companies' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('companies')}
          >
            <FaBuilding /> Companies
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'interviews' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('interviews')}
          >
            <FaUserFriends /> Interviews
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'resumes' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('resumes')}
          >
            <FaFileAlt /> Resumes
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'cgpa' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('cgpa')}
          >
            <FaChartLine /> CGPA
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'offers' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('offers')}
          >
            <FaHandshake /> Offers
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'skills' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('skills')}
          >
            <FaTools /> Skills
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'dataset' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('dataset')}
          >
            <FaDatabase /> Live Dataset
          </button>
          <button
            className={`flex-1 p-3 rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'students' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('students')}
          >
            <FaUserGraduate /> Students
          </button>
        </div>
        {activeTab === 'dashboard' && <Dashboard stats={stats} setActiveTab={setActiveTab} />}
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
        {activeTab === 'students' && <StudentsList />}
      </div>
    </div>
  </div>
  );
}