import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthContext, AuthUser } from '@/lib/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('user_type, status')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile, error }) => {
            if (!error && profile) {
              setUser({
                ...session.user,
                role: profile.user_type || 'participant',
                status: profile.status || 'pending'
              })
            }
          })
      }
      setLoading(false)
    })

    const subscription = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('user_type, status')
            .eq('id', session.user.id)
            .single()
          
          if (error) throw error
          
          setUser({
            ...session.user,
            role: profile?.user_type || 'participant',
            status: profile?.status || 'pending'
          })
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.data.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
} 