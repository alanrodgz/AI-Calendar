"use client";

import { signOutUser } from '../../lib/auth';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push('/'); // Redirect to the homepage after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-600">
        {user?.displayName || user?.email}
      </div>
      <img
        src={user?.photoURL || '/api/placeholder/32/32'}
        alt="User"
        className="w-8 h-8 rounded-full"
      />
      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
      >
        Sign Out
      </button>
    </div>
  );
}