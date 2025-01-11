import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthContext, AuthUser } from '@/lib/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // First, get the initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('user_type, status, full_name')
            .eq('id', session.user.id)
            .single()
          
          if (!error && profile) {
            setUser({
              ...session.user,
              fullName: profile.full_name,
              role: profile.user_type || 'participant',
              status: profile.status || 'pending'
            })
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      }
      setLoading(false)
    })

    // Then set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('user_type, status, full_name')
            .eq('id', session.user.id)
            .single()
          
          if (!error && profile) {
            setUser({
              ...session.user,
              fullName: profile.full_name,
              role: profile.user_type || 'participant',
              status: profile.status || 'pending'
            })
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
} 