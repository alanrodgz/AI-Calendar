import { User } from 'firebase/auth';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
  userId: string;
}

// Export the User type from Firebase
export type { User };