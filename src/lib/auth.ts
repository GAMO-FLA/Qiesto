import { User } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export interface AuthUser extends User {
  userType?: 'partner' | 'participant'
  status?: 'pending' | 'approved'
  fullName?: string
  role?: 'partner' | 'participant'
}

export interface AuthContextType {
  user: AuthUser | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
} 