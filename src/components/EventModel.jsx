import React, { useState } from 'react';

const EventModal = ({ day, events, addEvent, updateEvent, deleteEvent, closeModal }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // For editing an event

  // Add new event
  const handleAddEvent = () => {
    if (eventName && startTime && endTime) {
      addEvent({
        eventName,
        startTime,
        endTime,
        description,
      });
      closeModal(); // Close the modal after adding the event
    } else {
      alert('Please fill in all required fields');
    }
  };

  // Set selected event for editing
  const handleEditEvent = (event) => {
    setSelectedEvent(event); // Store the event being edited
    setEventName(event.eventName);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setDescription(event.description);
  };

  // Update existing event
  const handleUpdateEvent = () => {
    if (eventName && startTime && endTime) {
      // Ensure selectedEvent is valid and update it
      updateEvent(selectedEvent.id, {
        eventName,
        startTime,
        endTime,
        description,
      });
      closeModal(); // Close the modal after updating the event
    } else {
      alert('Please fill in all required fields');
    }
  };

  // Delete selected event
  const handleDeleteEvent = (id) => {
    console.log(events)
    console.log(id,"delete")
    deleteEvent(id); // Remove the event by ID
    closeModal(); // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Events for {day.toDateString()}</h2>

        <div className="space-y-4 mb-4">
          {/* Display all events for the selected day */}
          {events.map((event) => (
            <div key={event.id} className="p-2 border rounded">
              <strong className="block">{event.eventName}</strong>
              <p className="text-sm text-gray-600">
                {event.startTime} - {event.endTime}
              </p>
              <p className="text-sm text-gray-500">{event.description}</p>
              <div className="mt-2 flex space-x-2">
                {/* Edit button */}
                <button
                  onClick={() => handleEditEvent(event)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {/* Input fields for event details */}
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {/* Add or Update event button */}
          <button
            onClick={selectedEvent ? handleUpdateEvent : handleAddEvent}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {selectedEvent ? 'Update Event' : 'Add Event'}
          </button>
        </div>

        {/* Close modal button */}
        <button
          onClick={closeModal}
          className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
