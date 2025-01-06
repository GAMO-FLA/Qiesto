import { User as SupabaseUser } from '@supabase/supabase-js'

export interface User extends SupabaseUser {
  id: string;
  email: string;
  fullName?: string;
  userType: 'partner' | 'participant';
  status?: 'pending' | 'active';
  organization?: string;
  createdAt?: string;
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