import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '@/types/user';

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  fullName: string;
  userType: 'participant' | 'partner';
  organization?: string;
  position?: string;
  status?: 'pending' | 'approved';
};

const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

const loginAttempts = new Map<string, { count: number; timestamp: number }>();

export const signIn = async ({ email, password }: SignInCredentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, 'profiles', user.uid));
    const profile = userDoc.data();
    return { user: { ...user, role: profile?.user_type || 'participant', status: profile?.status || 'pending' } };
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'profiles', user.uid), {
      full_name: fullName,
      user_type: userType,
      status: userType === 'partner' ? 'pending' : 'approved',
      ...(organization && { organization }),
      ...(position && { position }),
    });
    return user;
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  const userDoc = await getDoc(doc(db, 'profiles', user.uid));
  const profile = userDoc.data();
  return { ...user, fullName: profile?.full_name, role: profile?.user_type || 'participant', status: profile?.status || 'pending' } as User;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};