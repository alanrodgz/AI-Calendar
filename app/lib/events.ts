// import { db } from './firebase';
// import { collection, doc, setDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
// import { CalendarEvent } from './types';

// export const addEvent = async (title: string, date: Date, color: string, userId: string) => {
//   try {
//     // Create a new Date object with the date shifted forward by one day
//     const adjustedDate = new Date(date);
//     adjustedDate.setDate(adjustedDate.getDate() + 1); // Add one day to fix the offset
    
//     // Store as Firestore Timestamp
//     const newEvent: CalendarEvent = {
//       title,
//       date: Timestamp.fromDate(adjustedDate),
//       color,
//       userId,
//       id: '', // You can generate an ID or let Firestore auto-generate it
//     };

//     const eventsRef = collection(db, 'events');
//     const docRef = doc(eventsRef);
//     await setDoc(docRef, newEvent);
//   } catch (error) {
//     console.error('Error adding event:', error);
//   }
// };

// export const getUserEvents = async (userId: string) => {
//   try {
//     const eventsRef = collection(db, 'events');
//     const q = query(eventsRef, where('userId', '==', userId));
//     const querySnapshot = await getDocs(q);

//     const userEvents: { [key: string]: CalendarEvent[] } = {};

//     querySnapshot.forEach((doc) => {
//       const eventData = doc.data() as {
//         title: string;
//         date: Timestamp;
//         color: string;
//         userId: string;
//         id: string;
//       };

//       // Convert Firestore Timestamp back to Date
//       let eventDate = eventData.date ? eventData.date.toDate() : new Date();
      
//       // Create a date key using YYYY-MM-DD format
//       const year = eventDate.getFullYear();
//       const month = (eventDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-indexed
//       const day = eventDate.getDate().toString().padStart(2, '0');
//       const dateKey = `${year}-${month}-${day}`;

//       if (!userEvents[dateKey]) {
//         userEvents[dateKey] = [];
//       }

//       userEvents[dateKey].push({
//         ...eventData,
//         date: eventDate,
//         id: doc.id,
//       });
//     });

//     return userEvents;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return {};
//   }
// };




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

export const getUserEvents = async (userId: string) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const userEvents: { [key: string]: CalendarEvent[] } = {};

    querySnapshot.forEach((doc) => {
      const eventData = doc.data();
      
      // Convert Firestore Timestamp to Date
      const eventDate = eventData.date ? eventData.date.toDate() : new Date();
      
      // Create a date key using the same format as in CalendarGrid
      const dateKey = formatDateKey(eventDate);
      
      if (!userEvents[dateKey]) {
        userEvents[dateKey] = [];
      }

      userEvents[dateKey].push({
        ...eventData,
        id: doc.id,
        date: eventDate, // Store as Date object
      });
    });

    return userEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return {};
  }
};