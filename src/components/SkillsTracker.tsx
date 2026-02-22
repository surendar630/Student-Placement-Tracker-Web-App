'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Skill } from '@/types';

export default function SkillsTracker() {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [newSkill, setNewSkill] = useState({ name: '', level: 'beginner' as const, category: '' });

  const handleAdd = () => {
    if (newSkill.name && newSkill.category) {
      addSkill(newSkill);
      setNewSkill({ name: '', level: 'beginner', category: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Skills Tracker</h2>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          className="border p-2"
        />
        <select
          value={newSkill.level}
          onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
          className="border p-2"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="expert">Expert</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={newSkill.category}
          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white p-2 col-span-3">Add Skill</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{skill.name}</h3>
            <p><strong>Level:</strong> {skill.level}</p>
            <p><strong>Category:</strong> {skill.category}</p>
            <button onClick={() => deleteSkill(skill.id)} className="text-red-500 mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}