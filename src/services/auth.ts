// Mock users data
const MOCK_USERS = [
  {
    id: '1',
    email: 'participant@qiesto.com',
    password: 'Asdfg12345!',
    fullName: 'Moise Iriho',
    role: 'participant',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    email: 'partner@qiesto.com',
    password: 'Asdfg12345!',
    fullName: 'Flambeau Gasana',
    role: 'partner',
    status: 'active',
    organization: 'TechCorp',
    createdAt: '2024-01-15'
  }
];

import { User } from '@/types/user';

export const signIn = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const user = MOCK_USERS.find(u => u.email === email && u.password === password);

  if (user) {
    // Store auth state in localStorage with token simulation
    const token = 'mock-jwt-token';
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      organization: user.organization,
      createdAt: user.createdAt
    }));
    
    return { user, token };
  }

  throw new Error('Invalid credentials');
};

export const signOut = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const getCurrentUser = async (): Promise<User | null> => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  return JSON.parse(userJson) as User;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!token && !!user;
}; 