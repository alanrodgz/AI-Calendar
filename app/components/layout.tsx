'use client';

// import { useAuth } from '../components/auth/AuthProvider';
// import LoginButton from '../components/auth/LoginButton';
// import UserProfile from '../components/auth/UserProfile';

// export default function Header() {
//   const { user } = useAuth();

//   return (
//     <header className="border-b border-gray-200 p-4 flex items-center justify-between">
//       <h1 className="text-xl font-semibold text-gray-800">Calendar</h1>
//       <div className="flex items-center space-x-2">
//         {user ? (
//           <UserProfile user={user} />
//         ) : (
//           <LoginButton className="px-3 py-1 text-sm" />
//         )}
//       </div>
//     </header>
//   );
// }



import { AuthProvider } from './auth/AuthProvider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}