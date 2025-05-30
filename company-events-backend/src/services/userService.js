import db from '../config/database.js';

export const createUser = async (userData) => {
    const { username, password, email } = userData;
    const query = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, password, email];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

export const getUserById = async (userId) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

export const updateUser = async (userId, userData) => {
    const { username, email } = userData;
    const query = 'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [username, email, userId];

    try {
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

export const deleteUser = async (userId) => {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [userId];

    try {
        await db.query(query, values);
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};