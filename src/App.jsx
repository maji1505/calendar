import React, { useState, useEffect } from 'react';
import './App.css'; // Add relevant styles or import TailwindCSS if needed
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModel';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || {});
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowEventModal(true);
  };

  const addEvent = (newEvent) => {
    setEvents((prev) => {
      const dayKey = selectedDay.toISOString().split('T')[0];
      const updatedEvents = { ...prev, [dayKey]: [...(prev[dayKey] || []), newEvent] };
      return updatedEvents;
    });
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents((prev) => {
      const dayKey = selectedDay.toISOString().split('T')[0];
      const updatedEvents = prev[dayKey].map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      );
      return { ...prev, [dayKey]: updatedEvents };
    });
  };

  const deleteEvent = (id) => {
    setEvents((prev) => {
      const dayKey = selectedDay.toISOString().split('T')[0];
      const updatedEvents = prev[dayKey].filter((event) => event.id !== id);
      return { ...prev, [dayKey]: updatedEvents };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <CalendarHeader
          currentDate={currentDate}
          handleNextMonth={handleNextMonth}
          handlePreviousMonth={handlePreviousMonth}
        />

        <CalendarGrid
          currentDate={currentDate}
          selectedDay={selectedDay}
          handleDayClick={handleDayClick}
        />

        {showEventModal && (
          <EventModal
            day={selectedDay}
            events={events[selectedDay.toISOString().split('T')[0]] || []}
            addEvent={addEvent}
            updateEvent={updateEvent}
            deleteEvent={deleteEvent}  
            closeModal={() => setShowEventModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
