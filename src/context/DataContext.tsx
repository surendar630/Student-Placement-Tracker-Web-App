'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Company, InterviewRound, ResumeVersion, CGPAEntry, Offer, Skill } from '@/types';

interface DataContextType {
  companies: Company[];
  resumes: ResumeVersion[];
  cgpaEntries: CGPAEntry[];
  offers: Offer[];
  skills: Skill[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  addInterviewRound: (companyId: string, round: Omit<InterviewRound, 'id'>) => void;
  updateInterviewRound: (companyId: string, roundId: string, updates: Partial<InterviewRound>) => void;
  addResume: (resume: Omit<ResumeVersion, 'id'>) => void;
  addCGPA: (entry: Omit<CGPAEntry, 'id'>) => void;
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [resumes, setResumes] = useState<ResumeVersion[]>([]);
  const [cgpaEntries, setCgpaEntries] = useState<CGPAEntry[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    const storedResumes = localStorage.getItem('resumes');
    const storedCGPA = localStorage.getItem('cgpaEntries');
    const storedOffers = localStorage.getItem('offers');
    const storedSkills = localStorage.getItem('skills');
    if (storedCompanies) setCompanies(JSON.parse(storedCompanies));
    if (storedResumes) setResumes(JSON.parse(storedResumes));
    if (storedCGPA) setCgpaEntries(JSON.parse(storedCGPA));
    if (storedOffers) setOffers(JSON.parse(storedOffers));
    if (storedSkills) setSkills(JSON.parse(storedSkills));
  }, []);

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('resumes', JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    localStorage.setItem('cgpaEntries', JSON.stringify(cgpaEntries));
  }, [cgpaEntries]);

  useEffect(() => {
    localStorage.setItem('offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const addCompany = (company: Omit<Company, 'id'>) => {
    const newCompany: Company = { ...company, id: Date.now().toString() };
    setCompanies(prev => [...prev, newCompany]);
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  const addInterviewRound = (companyId: string, round: Omit<InterviewRound, 'id'>) => {
    const newRound: InterviewRound = { ...round, id: Date.now().toString() };
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, interviewRounds: [...c.interviewRounds, newRound] } : c));
  };

  const updateInterviewRound = (companyId: string, roundId: string, updates: Partial<InterviewRound>) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? {
      ...c,
      interviewRounds: c.interviewRounds.map(r => r.id === roundId ? { ...r, ...updates } : r)
    } : c));
  };

  const addResume = (resume: Omit<ResumeVersion, 'id'>) => {
    const newResume: ResumeVersion = { ...resume, id: Date.now().toString() };
    setResumes(prev => [...prev, newResume]);
  };

  const addCGPA = (entry: Omit<CGPAEntry, 'id'>) => {
    const newEntry: CGPAEntry = { ...entry, id: Date.now().toString() };
    setCgpaEntries(prev => [...prev, newEntry]);
  };

  const addOffer = (offer: Omit<Offer, 'id'>) => {
    const newOffer: Offer = { ...offer, id: Date.now().toString() };
    setOffers(prev => [...prev, newOffer]);
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: Date.now().toString() };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  return (
    <DataContext.Provider value={{
      companies,
      resumes,
      cgpaEntries,
      offers,
      skills,
      addCompany,
      updateCompany,
      deleteCompany,
      addInterviewRound,
      updateInterviewRound,
      addResume,
      addCGPA,
      addOffer,
      updateOffer,
      addSkill,
      updateSkill,
      deleteSkill,
    }}>
      {children}
    </DataContext.Provider>
  );
};