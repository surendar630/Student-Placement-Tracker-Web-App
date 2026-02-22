export interface Company {
  id: string;
  name: string;
  appliedDate: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  description?: string;
  website?: string;
  location?: string;
  jobRole?: string;
  interviewRounds: InterviewRound[];
}

export interface InterviewRound {
  id: string;
  round: number;
  type: string;
  date: string;
  status: 'scheduled' | 'completed' | 'passed' | 'failed';
  notes: string;
  interviewer?: string;
  feedback?: string;
}

export interface ResumeVersion {
  id: string;
  version: string;
  uploadDate: string;
  file: string;
  description?: string;
  tags?: string[];
}

export interface CGPAEntry {
  id: string;
  semester: string;
  cgpa: number;
  date: string;
  subjects?: { name: string; grade: string }[];
}

export interface Offer {
  id: string;
  companyId: string;
  status: 'pending' | 'accepted' | 'declined';
  details: string;
  salary?: number;
  location?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}