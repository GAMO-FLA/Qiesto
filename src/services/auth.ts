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

const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

const loginAttempts = new Map<string, { count: number; timestamp: number }>();

export const signIn = async ({ email, password }: SignInCredentials) => {
  try {
    // Rate limiting check
    const userAttempts = loginAttempts.get(email) || { count: 0, timestamp: Date.now() };
    if (Date.now() - userAttempts.timestamp > RATE_LIMIT_WINDOW) {
      // Reset if window has passed
      userAttempts.count = 0;
      userAttempts.timestamp = Date.now();
    }
    if (userAttempts.count >= RATE_LIMIT_ATTEMPTS) {
      throw new Error('Too many login attempts. Please try again later.');
    }

    // Increment attempt counter
    loginAttempts.set(email, {
      count: userAttempts.count + 1,
      timestamp: userAttempts.timestamp
    });

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
      password,
      options: {
        captchaToken: undefined // Add reCAPTCHA if needed
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }
    
    if (!authData.user) {
      console.error('No user returned');
      throw new Error('No user returned');
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, user_type, status')
      .eq('id', authData.user.id)
      .single();
    
    if (profileError) {
      console.error('Profile fetch error:', profileError);
      throw new Error('Failed to fetch user profile');
    }

    if (!profile) {
      console.error('No profile found');
      throw new Error('No profile found');
    }

    const user = {
      ...authData.user,
      fullName: profile.full_name,
      role: profile.user_type || 'participant',
      status: profile.status || 'pending'
    };

    console.log('Sign in successful:', user);
    return { user };

  } catch (error) {
    console.error('SignIn error:', error);
    throw error;
  }
};

export const signUp = async ({ 
  email, 
  password, 
  fullName, 
  userType, 
  organization, 
  position 
}: SignUpCredentials) => {
  try {
    // 1. Create auth user
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

    // 2. Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', authData.user.id)
      .single();

    // 3. Create or update profile
    const profileData = {
      id: authData.user.id,
      email: email,
      full_name: fullName,
      user_type: userType,
      organization: organization || null,
      position: position || null,
      status: userType === 'partner' ? 'pending' : 'approved',
      created_at: new Date().toISOString()
    };

    const { error: profileError } = existingProfile 
      ? await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', authData.user.id)
      : await supabase
          .from('profiles')
          .insert([profileData]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      throw new Error(`Failed to create profile: ${profileError.message}`);
    }

    return {
      user: {
        ...authData.user,
        fullName,
        role: userType,
        status: userType === 'partner' ? 'pending' : 'approved',
        createdAt: authData.user.created_at
      } as AuthUser
    };

  } catch (error) {
    console.error('SignUp error:', error);
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
    .select('full_name, user_type, status')
    .eq('id', user.id)
    .single()
    
  return {
    ...user,
    fullName: profile?.full_name,
    role: profile?.user_type || 'participant',
    status: profile?.status || 'pending',
    createdAt: user.created_at
  } as AuthUser
}

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return !!user
}