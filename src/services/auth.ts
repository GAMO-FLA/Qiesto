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
  try {
    let authResponse;
    try {
       console.log('Starting sign in...');
      authResponse = await supabase.auth.signInWithPassword({
        email,
        password
      }).catch(err => {
        console.error('Raw auth error:', err);
        throw err;
      });
      console.log('Sign in response:', authResponse);
      
    } catch (authCallError) {
      console.error('Auth call failed:', authCallError);
      throw authCallError;
    }

    const { data: authData, error: authError } = authResponse;

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned');

    const profileResponse = await supabase
      .from('profiles')
      .select('user_type, status')
      .eq('id', authData.user.id)
      .single();

    const { data: profile, error: profileError } = profileResponse;
    if (profileError) throw profileError;

    const result = {
      user: {
        ...authData.user,
        role: profile?.user_type || 'participant',
        status: profile?.status || 'pending'
      }
    };
    return result;

  } catch (error) {
    console.error('SignIn error:', error);
    throw error;
  }
};

export const signUp = async ({ email, password, fullName, userType, organization, position }: SignUpCredentials) => {
  try {
    console.log('Starting sign up...');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType,
          // Only include if present
          ...(organization && { organization: organization }),
          ...(position && { position: position })
        }
      }
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

export const signOut = async () => {
  try {
      console.log('Signing out...');
      const { error } = await supabase.auth.signOut();
      console.log('Sign out request sent');
      if (error) throw error;
      console.log('Signed out successfully');
  } catch (err) {
      console.error('Error during sign out:', err);
  }
};

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