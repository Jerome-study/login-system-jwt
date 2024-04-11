require("dotenv").config();
const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const queries = require("../models/queries");

async function logoutController(req,res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No Content
    try {
        // Is refreshtoken in DB
        const refresh_token_id = cookies.jwt; // from cookies
        const result = await pool.query(queries.getRefreshToken, [refresh_token_id]);
        if (!result.rowCount) {
            res.clearCookie('jwt', { httPOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.sendStatus(204);
        }
        const user_id = result.rows[0].user_id;
        // Delete Refresh Token in DB
        await pool.query(queries.deleteRefreshToken, [refresh_token_id, user_id]);
        res.clearCookie('jwt', { httPOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // secure true in production
        res.sendStatus(204);
    } catch(error) {
        console.log(error.message);
    }
}
module.exports = logoutController;