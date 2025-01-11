import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthContext, AuthUser } from '@/lib/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, user_type, status')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error('Profile fetch error:', error);
        return null;
      }
      return profile;
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Add session expiry check
  const checkSessionValidity = useCallback(async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      setUser(null);
      return false;
    }
    // Check if session is expired
    if (session.expires_at && new Date(session.expires_at * 1000) < new Date()) {
      await supabase.auth.signOut();
      setUser(null);
      return false;
    }
    return true;
  }, []);

  // Add auto-logout for inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    const INACTIVE_TIMEOUT = 30 * 60 * 1000; // 30 minutes

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(async () => {
        await supabase.auth.signOut();
        setUser(null);
      }, INACTIVE_TIMEOUT);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get the persisted session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && mounted) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile && mounted) {
            setUser({
              ...session.user,
              fullName: profile.full_name,
              role: profile.user_type || 'participant',
              status: profile.status || 'pending'
            });
          }
        }
      } catch (error) {
        console.error('Initialize auth error:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        if (profile && mounted) {
          setUser({
            ...session.user,
            fullName: profile.full_name,
            role: profile.user_type || 'participant',
            status: profile.status || 'pending'
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
} 