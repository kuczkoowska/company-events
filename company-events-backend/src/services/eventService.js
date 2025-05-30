import db from '../config/database.js';

export const getAllEvents = async () => {
    try {
        const events = await db.query('SELECT * FROM events');
        return events.rows;
    } catch (error) {
        throw new Error('Error fetching events');
    }
};

export const getEventById = async (id) => {
    try {
        const event = await db.query('SELECT * FROM events WHERE id = $1', [id]);
        return event.rows[0];
    } catch (error) {
        throw new Error('Error fetching event');
    }
};

export const createEvent = async (eventData) => {
    const { name, date, location } = eventData;
    try {
        const newEvent = await db.query(
            'INSERT INTO events (name, date, location) VALUES ($1, $2, $3) RETURNING *',
            [name, date, location]
        );
        return newEvent.rows[0];
    } catch (error) {
        throw new Error('Error creating event');
    }
};

export const updateEvent = async (id, eventData) => {
    const { name, date, location } = eventData;
    try {
        const updatedEvent = await db.query(
            'UPDATE events SET name = $1, date = $2, location = $3 WHERE id = $4 RETURNING *',
            [name, date, location, id]
        );
        return updatedEvent.rows[0];
    } catch (error) {
        throw new Error('Error updating event');
    }
};

export const deleteEvent = async (id) => {
    try {
        await db.query('DELETE FROM events WHERE id = $1', [id]);
        return { message: 'Event deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting event');
    }
};