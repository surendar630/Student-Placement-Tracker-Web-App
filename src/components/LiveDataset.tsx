'use client';

import { useData } from '@/context/DataContext';
import { CSVLink } from 'react-csv';

export default function LiveDataset() {
  const { companies, resumes, cgpaEntries, offers, skills } = useData();

  const csvData = [
    ['Type', 'Details'],
    ...companies.map(c => ['Company', `${c.name} - ${c.status} - ${c.industry || ''}`]),
    ...resumes.map(r => ['Resume', `${r.version} - ${r.file}`]),
    ...cgpaEntries.map(c => ['CGPA', `${c.semester} - ${c.cgpa}`]),
    ...offers.map(o => ['Offer', `${o.status} - ${o.salary || ''}`]),
    ...skills.map(s => ['Skill', `${s.name} - ${s.level}`]),
  ];

  const industryStats = companies.reduce((acc, c) => {
    acc[c.industry || 'Other'] = (acc[c.industry || 'Other'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const skillCategories = skills.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Live Dataset & Analytics</h2>
      <div className="mb-6">
        <CSVLink data={csvData} filename="placement-data.csv" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors">
          Export to CSV
        </CSVLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-blue-600">Companies by Industry</h3>
          {Object.entries(industryStats).map(([industry, count]) => (
            <div key={industry} className="flex justify-between py-2 border-b">
              <span>{industry}</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-green-600">Skills by Category</h3>
          {Object.entries(skillCategories).map(([category, count]) => (
            <div key={category} className="flex justify-between py-2 border-b">
              <span>{category}</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-purple-600">Recent Offers</h3>
          {offers.slice(-5).map(o => {
            const company = companies.find(c => c.id === o.companyId);
            return <p key={o.id} className="py-1">{company?.name} - {o.status}</p>;
          })}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-orange-600">CGPA Trend</h3>
          {cgpaEntries.slice(-5).map(e => (
            <p key={e.id} className="py-1">{e.semester}: {e.cgpa}</p>
          ))}
        </div>
      </div>
    </div>
  );
}