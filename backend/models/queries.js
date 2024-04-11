// Create Table if not exist

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`
const createExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
const createRefreshTokenTable = `CREATE TABLE refreshToken (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    refresh_token VARCHAR(255) NOT NULL,
    user_id uuid,
    created_At TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
)`

// queries

const insertRefreshToken = `INSERT INTO refreshToken(refresh_token, user_id) VALUES($1, $2) RETURNING *`;
const getRefreshToken =`SELECT * FROM refreshToken WHERE id = $1`;
const deleteRefreshToken = `DELETE FROM refreshToken WHERE id = $1 AND user_id = $2`;

module.exports = { 
    createUserTable,
    createExtension,
    createRefreshTokenTable,
    insertRefreshToken,
    getRefreshToken,
    deleteRefreshToken
};