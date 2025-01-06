export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'partner' | 'participant';
  organization?: string;
  avatar?: string;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  organization: string;
  participants: number;
  status: 'draft' | 'active' | 'completed' | 'archived';
  submissions: number;
  progress: number;
  daysLeft: number;
  prize: string;
  deadline: string;
  categories: string[];
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
} 