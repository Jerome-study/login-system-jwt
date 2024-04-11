require("dotenv").config();
const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const queries = require("../models/queries");

async function refreshTokenController(req,res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // Cookies not exist
    try {
        const refresh_token_id = cookies.jwt; // from cookies
        const result = await pool.query(queries.getRefreshToken, [refresh_token_id]);
        if (!result.rowCount) return res.sendStatus(403);
        const refreshToken = result.rows[0].refresh_token
        const user_id = result.rows[0].user_id;
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {;
                if (err || decoded.id !== user_id) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { "id" : decoded.id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                res.json({ accessToken })
            }
        )
    } catch(error) {
        console.log(error.message);
    }
}
module.exports = refreshTokenController;