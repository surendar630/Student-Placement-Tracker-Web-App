'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CGPATracker() {
  const { cgpaEntries, addCGPA } = useData();
  const [newEntry, setNewEntry] = useState({ semester: '', cgpa: 0, date: '', subjects: [{ name: '', grade: '' }] });

  const handleAdd = () => {
    if (newEntry.semester && newEntry.cgpa > 0) {
      addCGPA({ ...newEntry, date: new Date().toISOString().split('T')[0] });
      setNewEntry({ semester: '', cgpa: 0, date: '', subjects: [{ name: '', grade: '' }] });
    }
  };

  const addSubject = () => {
    setNewEntry({ ...newEntry, subjects: [...newEntry.subjects, { name: '', grade: '' }] });
  };

  const updateSubject = (index: number, field: 'name' | 'grade', value: string) => {
    const updatedSubjects = newEntry.subjects.map((subj, i) => i === index ? { ...subj, [field]: value } : subj);
    setNewEntry({ ...newEntry, subjects: updatedSubjects });
  };

  const chartData = {
    labels: cgpaEntries.map(e => e.semester),
    datasets: [{
      label: 'CGPA',
      data: cgpaEntries.map(e => e.cgpa),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">CGPA Tracker</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Semester"
          value={newEntry.semester}
          onChange={(e) => setNewEntry({ ...newEntry, semester: e.target.value })}
          className="border p-2"
        />
        <input
          type="number"
          step="0.01"
          placeholder="CGPA"
          value={newEntry.cgpa}
          onChange={(e) => setNewEntry({ ...newEntry, cgpa: parseFloat(e.target.value) })}
          className="border p-2"
        />
        <div className="col-span-2">
          <h4 className="font-bold mb-2">Subjects</h4>
          {newEntry.subjects.map((subj, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Subject Name"
                value={subj.name}
                onChange={(e) => updateSubject(index, 'name', e.target.value)}
                className="border p-2 flex-1"
              />
              <input
                type="text"
                placeholder="Grade"
                value={subj.grade}
                onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                className="border p-2 flex-1"
              />
            </div>
          ))}
          <button onClick={addSubject} className="bg-gray-500 text-white p-2 mr-2">Add Subject</button>
        </div>
        <button onClick={handleAdd} className="bg-orange-500 text-white p-2 col-span-2">Add Entry</button>
      </div>
      {cgpaEntries.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">CGPA Trend</h3>
          <Line data={chartData} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cgpaEntries.map((entry) => (
          <div key={entry.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{entry.semester}</h3>
            <p><strong>CGPA:</strong> {entry.cgpa}</p>
            <p><strong>Date:</strong> {entry.date}</p>
            {entry.subjects && entry.subjects.length > 0 && (
              <div>
                <strong>Subjects:</strong>
                <ul className="list-disc list-inside">
                  {entry.subjects.map((subj, i) => (
                    <li key={i}>{subj.name}: {subj.grade}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}