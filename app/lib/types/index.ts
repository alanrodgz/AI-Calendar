import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date | Timestamp; // Allow both Date and Timestamp
  color: string;
  userId: string;
}

// Export the User type from Firebase
export type { User };