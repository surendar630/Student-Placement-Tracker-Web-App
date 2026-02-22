'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Student } from '@/types';

export default function StudentsList() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [newStudent, setNewStudent] = useState({
    name: '',
    department: '',
    cgpa: 0,
    placed: 'No' as 'Yes' | 'No',
    company: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [filterPlaced, setFilterPlaced] = useState('');

  const filteredStudents = students.filter(s =>
    filterPlaced === '' || s.placed === filterPlaced
  );

  const handleAdd = () => {
    if (newStudent.name && newStudent.department) {
      addStudent(newStudent);
      setNewStudent({
        name: '',
        department: '',
        cgpa: 0,
        placed: 'No',
        company: ''
      });
    }
  };

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setEditStudent({ ...student });
  };

  const handleUpdate = () => {
    if (editStudent) {
      updateStudent(editStudent.id, editStudent);
      setEditingId(null);
      setEditStudent(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditStudent(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      <div className="mb-4 flex gap-4">
        <select
          value={filterPlaced}
          onChange={(e) => setFilterPlaced(e.target.value)}
          className="border p-2"
        >
          <option value="">All Students</option>
          <option value="Yes">Placed</option>
          <option value="No">Not Placed</option>
        </select>
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Department"
          value={newStudent.department}
          onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
          className="border p-2"
        />
        <input
          type="number"
          step="0.1"
          placeholder="CGPA"
          value={newStudent.cgpa || ''}
          onChange={(e) => setNewStudent({ ...newStudent, cgpa: parseFloat(e.target.value) || 0 })}
          className="border p-2"
        />
        <select
          value={newStudent.placed}
          onChange={(e) => setNewStudent({ ...newStudent, placed: e.target.value as 'Yes' | 'No' })}
          className="border p-2"
        >
          <option value="No">Not Placed</option>
          <option value="Yes">Placed</option>
        </select>
        <input
          type="text"
          placeholder="Company"
          value={newStudent.company}
          onChange={(e) => setNewStudent({ ...newStudent, company: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white p-2">Add Student</button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Dept</th>
            <th className="border border-gray-300 p-2">CGPA</th>
            <th className="border border-gray-300 p-2">Placed?</th>
            <th className="border border-gray-300 p-2">Company</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.id}>
              <td className="border border-gray-300 p-2">
                {editingId === s.id ? (
                  <input
                    type="text"
                    value={editStudent?.name || ''}
                    onChange={(e) => setEditStudent(editStudent ? { ...editStudent, name: e.target.value } : null)}
                    className="border p-1 w-full"
                  />
                ) : (
                  s.name
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === s.id ? (
                  <input
                    type="text"
                    value={editStudent?.department || ''}
                    onChange={(e) => setEditStudent(editStudent ? { ...editStudent, department: e.target.value } : null)}
                    className="border p-1 w-full"
                  />
                ) : (
                  s.department
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === s.id ? (
                  <input
                    type="number"
                    step="0.1"
                    value={editStudent?.cgpa || ''}
                    onChange={(e) => setEditStudent(editStudent ? { ...editStudent, cgpa: parseFloat(e.target.value) || 0 } : null)}
                    className="border p-1 w-full"
                  />
                ) : (
                  s.cgpa
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === s.id ? (
                  <select
                    value={editStudent?.placed || 'No'}
                    onChange={(e) => setEditStudent(editStudent ? { ...editStudent, placed: e.target.value as 'Yes' | 'No' } : null)}
                    className="border p-1 w-full"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                ) : (
                  s.placed
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === s.id ? (
                  <input
                    type="text"
                    value={editStudent?.company || ''}
                    onChange={(e) => setEditStudent(editStudent ? { ...editStudent, company: e.target.value } : null)}
                    className="border p-1 w-full"
                  />
                ) : (
                  s.company
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === s.id ? (
                  <div className="flex gap-2">
                    <button onClick={handleUpdate} className="bg-green-500 text-white p-1 text-sm">Save</button>
                    <button onClick={handleCancel} className="bg-gray-500 text-white p-1 text-sm">Cancel</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(s)} className="bg-yellow-500 text-white p-1 text-sm">Edit</button>
                    <button onClick={() => deleteStudent(s.id)} className="bg-red-500 text-white p-1 text-sm">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}