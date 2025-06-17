"use client";

import { useState, useEffect } from 'react';
import CalendarDay from './CalendarDay';
import { useCalendar } from '../../lib/calendarUtils';
import { CalendarEvent } from '../../lib/types';
import { addEvent, getUserEvents } from '../../lib/events';
import { useAuth } from '../auth/AuthProvider';

interface CalendarGridProps {
  userId?: string;
}

export default function CalendarGrid({ userId }: CalendarGridProps) {
  const { user } = useAuth();
  const {
    calendarDays,
    getEventsForDay,
    isCurrentMonth,
    isToday,
    currentMonth,
    currentYear,
    monthName,
  } = useCalendar();

  const [events, setEvents] = useState<{ [key: string]: CalendarEvent[] }>({}); // Local events state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventColor, setEventColor] = useState('#3B82F6'); // Default blue color
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Color options for events
  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Yellow', value: '#F59E0B' },
  ];

  // Fetch events when the component mounts, when the user changes, or when the month changes
  useEffect(() => {
    console.log("Fetching events for month:", currentMonth);
    if (user) {
      fetchEvents();
    }
  }, [user, currentMonth, currentYear]);

  // Function to fetch events from Firestore
  const fetchEvents = async () => {
    if (!user) return;
  
    try {
      // Extract the month (0-11) and year from your currentMonth Date object
      const month = currentMonth.getMonth();
      const year = currentMonth.getFullYear(); // Extract year from the date object
      
      const userEvents = await getUserEvents(user.uid, month, year);
      setEvents(userEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You must be signed in to add an event.');
      return;
    }

    if (!eventTitle.trim()) {
      alert('Please enter an event title');
      return;
    }

    if (!eventDate) {
      alert('Please select a date');
      return;
    }

    try {
      setIsSubmitting(true);
      await addEvent(
        eventTitle,
        new Date(eventDate),
        eventColor,
        user.uid
      );

      // Refresh events after adding a new event
      await fetchEvents();

      // Reset form
      setEventTitle('');
      setEventDate('');
      setEventColor('#3B82F6');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add event:', error);
      alert('Failed to add event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions - define these before using them
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Helper function to format date as a key - must match the format used in lib/events.js
  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  // Get today's date for the date picker min
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  
  // Format today for the min attribute
  const minDateStr = formatDateForInput(today);

  return (
    <div className="p-4 relative">
      {/* Month and Year Display */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {monthName} {currentYear}
        </h2>
        
        {/* Add Event Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Event
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            events={events[formatDateKey(day)] || []} // Pass events for the day
            isCurrentMonth={isCurrentMonth(day)}
            isToday={isToday(day)}
          />
        ))}
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Event</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddEvent}>
              <div className="mb-4">
                <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  min={minDateStr}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Color
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setEventColor(color.value)}
                      className={`w-8 h-8 rounded-full ${eventColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Adding...' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}