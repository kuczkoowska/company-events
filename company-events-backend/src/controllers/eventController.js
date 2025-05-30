// import { createEvent, updateEvent, deleteEvent, getEventById, getAllEvents } from '../services/eventService.js';

// export const createEventController = async (req, res) => {
//     try {
//         const eventData = req.body;
//         const newEvent = await createEvent(eventData);
//         res.status(201).json(newEvent);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating event', error: error.message });
//     }
// };

// export const updateEventController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const eventData = req.body;
//         const updatedEvent = await updateEvent(id, eventData);
//         if (!updatedEvent) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(200).json(updatedEvent);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating event', error: error.message });
//     }
// };

// export const deleteEventController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedEvent = await deleteEvent(id);
//         if (!deletedEvent) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting event', error: error.message });
//     }
// };

// export const getEventByIdController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const event = await getEventById(id);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         res.status(200).json(event);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching event', error: error.message });
//     }
// };

// export const getAllEventsController = async (req, res) => {
//     try {
//         const events = await getAllEvents();
//         res.status(200).json(events);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching events', error: error.message });
//     }
// };