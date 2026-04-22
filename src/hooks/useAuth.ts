import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChange, isAdmin } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setUser(authUser);
      if (authUser) {
        const adminStatus = await isAdmin(authUser.uid);
        setIsAdminUser(adminStatus);
      } else {
        setIsAdminUser(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAdmin: isAdminUser, loading };
};