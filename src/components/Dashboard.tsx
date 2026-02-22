'use client';

interface Stats {
  totalCompanies: number;
  applied: number;
  interviews: number;
  offers: number;
  rejected: number;
  totalResumes: number;
  totalCGPAEntries: number;
  averageCGPA: string;
  totalOffers: number;
  acceptedOffers: number;
  totalSkills: number;
}

export default function Dashboard({ stats }: { stats: Stats }) {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Total Companies</h3>
          <p className="text-3xl font-bold">{stats.totalCompanies}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Applied</h3>
          <p className="text-3xl font-bold">{stats.applied}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Interviews</h3>
          <p className="text-3xl font-bold">{stats.interviews}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Offers</h3>
          <p className="text-3xl font-bold">{stats.offers}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Rejected</h3>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Total Resumes</h3>
          <p className="text-3xl font-bold">{stats.totalResumes}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Average CGPA</h3>
          <p className="text-3xl font-bold">{stats.averageCGPA}</p>
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Accepted Offers</h3>
          <p className="text-3xl font-bold">{stats.acceptedOffers}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Total Skills</h3>
          <p className="text-3xl font-bold">{stats.totalSkills}</p>
        </div>
      </div>
    </div>
  );
}