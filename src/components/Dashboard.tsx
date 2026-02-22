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
  totalStudents: number;
  placedStudents: number;
  averageStudentCGPA: string;
}

export default function Dashboard({ stats, setActiveTab }: { stats: Stats; setActiveTab: (tab: string) => void }) {
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
        </div>        <div className="bg-teal-500 hover:bg-teal-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="bg-pink-500 hover:bg-pink-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Placed Students</h3>
          <p className="text-3xl font-bold">{stats.placedStudents}</p>
        </div>
        <div className="bg-indigo-500 hover:bg-indigo-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="font-bold text-lg mb-2">Avg Student CGPA</h3>
          <p className="text-3xl font-bold">{stats.averageStudentCGPA}</p>
        </div>      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            onClick={() => setActiveTab('companies')}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add Company
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add Interview
          </button>
          <button
            onClick={() => setActiveTab('resumes')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add Resume
          </button>
          <button
            onClick={() => setActiveTab('cgpa')}
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add CGPA
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add Offer
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add Skill
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">+</span> Add Student
          </button>
        </div>
      </div>
    </div>
  );
}