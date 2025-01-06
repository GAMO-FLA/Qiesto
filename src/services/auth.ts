// Mock user data
const MOCK_USER = {
  id: '1',
  email: 'gamoflamb@gmail.com',
  password: 'Asdfg12345!',
  role: 'admin'
};

export const signIn = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    // Store auth state in localStorage
    localStorage.setItem('user', JSON.stringify({ 
      id: MOCK_USER.id, 
      email: MOCK_USER.email, 
      role: MOCK_USER.role 
    }));
    return { user: MOCK_USER };
  }

  throw new Error('Invalid credentials');
};

export const signOut = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
};

export const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
}; 