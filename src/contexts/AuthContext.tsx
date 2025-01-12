import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getCurrentUser } from '@/services/auth';
import { User } from '@/types/user';

export interface AuthUser extends User {
  userType: 'partner' | 'participant';
  status?: 'pending' | 'approved';
  fullName?: string;
  role?: 'partner' | 'participant';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state change:', firebaseUser);

      if (firebaseUser) {
        try {
          const currentUser = await getCurrentUser() as AuthUser;
          setUser(currentUser);
        } catch (error) {
          console.error('Profile fetch error:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context as AuthContextType;
};