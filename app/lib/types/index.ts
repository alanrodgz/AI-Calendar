import { User } from 'firebase/auth';

export type CalendarEvent = {
  id: string;
  title: string;
  date?: Date; // Make `date` optional
  color: string;
  userId?: string; // Make `userId` optional
};

// Export the User type from Firebase
export type { User };