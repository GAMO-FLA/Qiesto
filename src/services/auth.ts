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

    if (email === 'participant@qiesta.com' && password === 'Asdfgh12345!') {
      console.log('Skipping sign in for default participant');
      return {
        user: {
          id: '12345',
          email: email,
          fullName: 'Participant User',
          role: 'participant',
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      };
    } else if (email === 'partner-approved@qiesta.com' && password === 'Asdfgh12345!') {
      console.log('Skipping sign in for default partner');
      return {
        user: {
          id: '12346',
          email: email,
          fullName: 'Partner Admin',
          role: 'partner',
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      };
    }
    else if (email === 'partner-pending@qiesta.com' && password === 'Asdfgh12345!') {
      console.log('Skipping sign in for default partner');
      return {
        user: {
          id: '12347',
          email: email,
          fullName: 'Partner Admin',
          role: 'partner',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      };
    }
    else {
      throw new Error('Wrong credentials');
    }

    console.log('1. Starting sign in...');
    let authResponse;
    try {
      authResponse = await supabase.auth.signInWithPassword({
        email,
        password
      }).catch(err => {
        console.error('Raw auth error:', err);
        throw err;
      });
      
      // Log raw response immediately
      console.log('1.5 Auth promise resolved:', JSON.stringify(authResponse));
    } catch (authCallError) {
      console.error('Auth call failed:', authCallError);
      throw authCallError;
    }
    console.log('2. Raw auth response:', authResponse);

    const { data: authData, error: authError } = authResponse;
    console.log('3. Destructured auth:', { authData, authError });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned');

    console.log('4. Valid user found:', authData.user.id);
    const profileResponse = await supabase
      .from('profiles')
      .select('user_type, status')
      .eq('id', authData.user.id)
      .single();
    
    console.log('5. Profile response:', profileResponse);

    const { data: profile, error: profileError } = profileResponse;
    if (profileError) throw profileError;

    const result = {
      user: {
        ...authData.user,
        role: profile?.user_type || 'participant',
        status: profile?.status || 'pending'
      }
    };
    console.log('6. Final result:', result);
    return result;

  } catch (error) {
    console.error('SignIn error:', error);
    throw error;
  }
};

export const signUp = async ({ email, password, fullName, userType, organization, position }: SignUpCredentials) => {
  try {
    if (email === 'participant@qiesta.com' && password === 'Asdfgh12345!') {
      console.log('Skipping sign up for default participant');
      return {
        user: {
          id: '12345',
          email: email,
          fullName: fullName,
          role: userType,
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      };
    } else if (email === 'partner-approved@qiesta.com' && password === 'Asdfgh12345!') {
      console.log('Skipping sign up for default partner');
      return {
        user: {
          id: '12346',
          email: email,
          fullName: fullName,
          role: userType,
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      };
    }
    else if (email === 'partner-pending@qiesta.com' && password === 'Asdfgh12345!') {
      console.log('Skipping sign up for default partner');
      return {
        user: {
          id: '12347',
          email: email,
          fullName: fullName,
          role: userType,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      };
    }
    else {
      throw new Error('Wrong credentials');
    }
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
    console.log('Sign up result:', { data, error });

    if (error) throw error
    return data
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
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