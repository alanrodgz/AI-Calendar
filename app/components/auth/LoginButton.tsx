"use client";

import { signInWithGoogle } from '../../lib/auth';

export default function LoginButton() {
  return (
    <button onClick={signInWithGoogle} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">
      Sign in with Google
    </button>
  );
}