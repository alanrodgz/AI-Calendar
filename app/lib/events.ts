import { db } from './firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { CalendarEvent } from './types';

export const addEvent = async (title: string, date: Date, color: string, userId: string) => {
  try {
    const newEvent: CalendarEvent = {
      title,
      date,
      color,
      userId,
      id: '', // You can generate an ID or let Firestore auto-generate it
    };

    const eventsRef = collection(db, 'events');
    const docRef = doc(eventsRef);
    await setDoc(docRef, newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
  }
};

export const getUserEvents = async (userId: string) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const userEvents: { [key: string]: CalendarEvent[] } = {};

    querySnapshot.forEach((doc) => {
      const eventData = doc.data() as CalendarEvent;

      // Provide a default date if missing
      const eventDate = eventData.date || new Date(); // Default to today's date
      const dateKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;

      if (!userEvents[dateKey]) {
        userEvents[dateKey] = [];
      }

      userEvents[dateKey].push({
        ...eventData,
        date: eventDate, // Use the default date
        id: doc.id,
      });
    });

    return userEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return {};
  }
};