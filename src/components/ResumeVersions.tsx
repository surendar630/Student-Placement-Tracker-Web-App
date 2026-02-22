'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';

export default function ResumeVersions() {
  const { resumes, addResume } = useData();
  const [newResume, setNewResume] = useState({ version: '', uploadDate: '', file: '', description: '', tags: '' });

  const handleAdd = () => {
    if (newResume.version && newResume.file) {
      addResume({
        ...newResume,
        uploadDate: new Date().toISOString().split('T')[0],
        tags: newResume.tags ? newResume.tags.split(',').map(t => t.trim()) : []
      });
      setNewResume({ version: '', uploadDate: '', file: '', description: '', tags: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Resume Versions</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Version"
          value={newResume.version}
          onChange={(e) => setNewResume({ ...newResume, version: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="File Name"
          value={newResume.file}
          onChange={(e) => setNewResume({ ...newResume, file: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newResume.tags}
          onChange={(e) => setNewResume({ ...newResume, tags: e.target.value })}
          className="border p-2"
        />
        <textarea
          placeholder="Description"
          value={newResume.description}
          onChange={(e) => setNewResume({ ...newResume, description: e.target.value })}
          className="border p-2 col-span-2"
          rows={3}
        />
        <button onClick={handleAdd} className="bg-purple-500 text-white p-2 col-span-2">Add Resume</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <div key={resume.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">Version {resume.version}</h3>
            <p><strong>Uploaded:</strong> {resume.uploadDate}</p>
            <p><strong>File:</strong> {resume.file}</p>
            {resume.description && <p><strong>Description:</strong> {resume.description}</p>}
            {resume.tags && resume.tags.length > 0 && (
              <p><strong>Tags:</strong> {resume.tags.join(', ')}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}