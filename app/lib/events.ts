import { db } from './firebase';
import { collection, doc, setDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { CalendarEvent } from './types';

export const addEvent = async (title: string, date: Date, color: string, userId: string) => {
  try {
    // Create a new Date object with the date shifted forward by one day if needed
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1); // Add one day to fix the offset
    
    // Store as Firestore Timestamp
    const newEvent = {
      title,
      date: Timestamp.fromDate(adjustedDate),
      color,
      userId,
      id: '', // You can generate an ID or let Firestore auto-generate it
    };

    const eventsRef = collection(db, 'events');
    const docRef = doc(eventsRef);
    newEvent.id = docRef.id; // Use Firestore's auto-generated ID
    await setDoc(docRef, newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
  }
};

// Helper function to create consistent date keys
const formatDateKey = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const getUserEvents = async (userId: string, month?: number, year?: number) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('userId', '==', userId));
    
    const querySnapshot = await getDocs(q);
    const userEvents: { [key: string]: CalendarEvent[] } = {};
    
    querySnapshot.forEach((doc) => {
      const eventData = doc.data();
      // Convert Firestore Timestamp to Date
      const eventDate = eventData.date instanceof Timestamp 
        ? eventData.date.toDate() 
        : new Date(eventData.date);
      
      // If month and year are provided, filter events client-side
      if (month !== undefined && year !== undefined) {
        const eventMonth = eventDate.getMonth();
        const eventYear = eventDate.getFullYear();
        
        // Skip events that don't match the current month/year
        if (eventMonth !== month || eventYear !== year) {
          return;
        }
      }
      
      // Create a date key using the same format as in CalendarGrid
      const dateKey = formatDateKey(eventDate);
      
      if (!userEvents[dateKey]) {
        userEvents[dateKey] = [];
      }
      
      userEvents[dateKey].push({
        id: doc.id,
        title: eventData.title,
        color: eventData.color,
        userId: eventData.userId,
        date: eventDate
      });
    });
    
    return userEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return {};
  }
};