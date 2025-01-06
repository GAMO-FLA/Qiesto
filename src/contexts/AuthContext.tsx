import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { set } from 'date-fns'

export interface AuthUser extends User {
  userType?: 'partner' | 'participant'
  status?: 'pending' | 'approved'
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      
      if (session?.user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type, status')
            .eq('id', session.user.id)
            .single();

          setUser({
            ...session.user,
            role: profile?.user_type || 'participant',
            status: profile?.status || 'pending'
          });
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
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context as AuthContextType
}