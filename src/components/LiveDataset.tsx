'use client';

import { useData } from '@/context/DataContext';

export default function LiveDataset() {
  const { companies, resumes, cgpaEntries, offers } = useData();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live Dataset</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Companies</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Applied Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Interview Rounds</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id}>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.appliedDate}</td>
                <td className="border p-2">{c.status}</td>
                <td className="border p-2">{c.interviewRounds.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Resumes</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Version</th>
              <th className="border p-2">Upload Date</th>
              <th className="border p-2">File</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((r) => (
              <tr key={r.id}>
                <td className="border p-2">{r.version}</td>
                <td className="border p-2">{r.uploadDate}</td>
                <td className="border p-2">{r.file}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">CGPA Entries</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Semester</th>
              <th className="border p-2">CGPA</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {cgpaEntries.map((e) => (
              <tr key={e.id}>
                <td className="border p-2">{e.semester}</td>
                <td className="border p-2">{e.cgpa}</td>
                <td className="border p-2">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Offers</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Company</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o) => {
              const company = companies.find(c => c.id === o.companyId);
              return (
                <tr key={o.id}>
                  <td className="border p-2">{company?.name}</td>
                  <td className="border p-2">{o.status}</td>
                  <td className="border p-2">{o.details}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}