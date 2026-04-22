import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../utilities/firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('❌ Google Sign-In Error:', error);
    throw new Error('Failed to sign in with Google.');
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('❌ Sign-Out Error:', error);
    throw new Error('Failed to sign out.');
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const isAdmin = async (uid: string): Promise<boolean> => {
  try {
    const snapshot = await get(ref(db, `admins/${uid}`));
    return snapshot.exists() && snapshot.val() === true;
  } catch (error) {
    console.error('❌ Admin check error:', error);
    return false;
  }
};