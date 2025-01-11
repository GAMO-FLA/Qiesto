import { supabase } from '@/lib/supabase'
import { AuthUser } from '@/lib/auth'

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
    // Handle test accounts first
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
    } else if (email === 'partner-pending@qiesta.com' && password === 'Asdfgh12345!') {
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

    console.log('Starting sign in...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned');

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_type, status, full_name')
      .eq('id', authData.user.id)
      .single();
    
    if (profileError) throw profileError;

    return {
      user: {
        ...authData.user,
        fullName: profile?.full_name,
        role: profile?.user_type || 'participant',
        status: profile?.status || 'pending'
      }
    };

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
      console.log('Starting sign up...');
      
      // First create the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('No user returned from signup');

      // Then create the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          user_type: userType,
          organization: organization || null,
          position: position || null,
          status: userType === 'partner' ? 'pending' : 'approved'
        })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // If profile creation fails, we should clean up the auth user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error('Failed to create user profile');
      }

      return {
        user: {
          ...authData.user,
          fullName,
          role: userType,
          status: userType === 'partner' ? 'pending' : 'approved'
        }
      };
    }
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async (): Promise<AuthUser | null> => {
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
    } as AuthUser
}

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return !!user
}