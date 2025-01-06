import { supabase } from '@/lib/supabase'
import { User } from '@/types/user'

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  email: string
  password: string
  fullName: string
  userType: 'participant' | 'partner'
  organization?: string
  position?: string
  status?: 'pending' | 'approved'
}

export type UserData = {
  role: 'partner' | 'participant'
  status?: 'pending' | 'approved'
}

export const signIn = async ({ email, password }: SignInCredentials) => {
  console.log('Signing in with:', email, password);
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  console.log(authData, authError);

  if (authError) throw authError;
  if (!authData.user) throw new Error('No user returned');

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type, status')
    .eq('id', authData.user.id)
    .single();

  return {
    user: {
      ...authData.user,
      role: profile?.user_type || 'participant',
      status: profile?.status || 'pending'
    }
  };
};

export const signUp = async ({ email, password, fullName, userType, organization, position }: SignUpCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        user_type: userType,
        organization,
        position,
      }
    }
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('fullName, role, status')
    .eq('id', user.id)
    .single()
    
    return {
      ...user,
      fullName: profile?.fullName,
      role: profile?.role || 'participant',
      status: profile?.status || 'pending',
      createdAt: user.created_at
    } as User
}

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return !!user
}