'use client';

import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { InterviewRound } from '@/types';

export default function InterviewRounds({ companyId }: { companyId: string }) {
  const { companies, addInterviewRound, updateInterviewRound } = useData();
  const company = companies.find(c => c.id === companyId);
  const [newRound, setNewRound] = useState({
    round: 1,
    type: '',
    date: '',
    status: 'scheduled' as const,
    notes: '',
    interviewer: '',
    feedback: ''
  });

  if (!company) return <div>Company not found</div>;

  const handleAdd = () => {
    if (newRound.type && newRound.date) {
      addInterviewRound(companyId, newRound);
      setNewRound({
        round: company.interviewRounds.length + 1,
        type: '',
        date: '',
        status: 'scheduled',
        notes: '',
        interviewer: '',
        feedback: ''
      });
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Interview Rounds for {company.name}</h3>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Round"
          value={newRound.round}
          onChange={(e) => setNewRound({ ...newRound, round: parseInt(e.target.value) })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Type"
          value={newRound.type}
          onChange={(e) => setNewRound({ ...newRound, type: e.target.value })}
          className="border p-2"
        />
        <input
          type="date"
          value={newRound.date}
          onChange={(e) => setNewRound({ ...newRound, date: e.target.value })}
          className="border p-2"
        />
        <select
          value={newRound.status}
          onChange={(e) => setNewRound({ ...newRound, status: e.target.value as any })}
          className="border p-2"
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
        <input
          type="text"
          placeholder="Interviewer"
          value={newRound.interviewer}
          onChange={(e) => setNewRound({ ...newRound, interviewer: e.target.value })}
          className="border p-2"
        />
        <textarea
          placeholder="Notes"
          value={newRound.notes}
          onChange={(e) => setNewRound({ ...newRound, notes: e.target.value })}
          className="border p-2"
          rows={2}
        />
        <textarea
          placeholder="Feedback"
          value={newRound.feedback}
          onChange={(e) => setNewRound({ ...newRound, feedback: e.target.value })}
          className="border p-2 col-span-2"
          rows={3}
        />
        <button onClick={handleAdd} className="bg-green-500 text-white p-2 col-span-2">Add Round</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {company.interviewRounds.map((round) => (
          <div key={round.id} className="border p-4 rounded shadow">
            <h4 className="font-bold">Round {round.round}: {round.type}</h4>
            <p><strong>Date:</strong> {round.date}</p>
            <p><strong>Status:</strong> {round.status}</p>
            {round.interviewer && <p><strong>Interviewer:</strong> {round.interviewer}</p>}
            {round.notes && <p><strong>Notes:</strong> {round.notes}</p>}
            {round.feedback && <p><strong>Feedback:</strong> {round.feedback}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}