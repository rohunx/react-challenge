import type { User } from 'firebase/auth';
import { signInWithGoogle, signOutUser } from '../services/authService';

interface AuthBannerProps {
  user: User | null;
  title: string;
}

export const AuthBanner = ({ user, title }: AuthBannerProps) => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h1 className="text-4xl sm:text-2xl font-bold mb-4 sm:mb-0">{title}</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome, {user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Sign In
        </button>
      )}
    </div>
  );
};