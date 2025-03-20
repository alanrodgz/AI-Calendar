"use client";

import { useState, useMemo } from 'react';

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days for the current month
  const calendarDays = useMemo(() => {
    const days: Date[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Add days from the previous month to fill the first row
    for (let i = firstDayOfWeek; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }

    // Add all days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from the next month to complete the last row
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }, [currentMonth]);

  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Go to today's date
  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Get the month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  // Check if a date is in the current month
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get events for a specific day (this should be implemented based on your events logic)
  const getEventsForDay = (day: Date) => {
    // Replace this with your actual logic to fetch events for the day
    day.setDate(day.getDate() + 1); // Delete this line
    return [];
  };

  return {
    currentMonth,
    calendarDays,
    prevMonth,
    nextMonth,
    goToToday,
    getMonthName,
    isCurrentMonth,
    isToday,
    getEventsForDay,
  };
};