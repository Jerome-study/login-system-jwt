require("dotenv").config();
const pool = require("../config/database");
const queries = require("../models/queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function loginController(req,res) {
    const { username, password } = req.body;
    if (!username, !password) return res.status(203).send({ message: "Please enter all fields" });
    try {
        const userExist = await pool.query('SELECT * FROM users WHERE username = $1', [username] );
        if (!userExist.rows[0]) return res.status(203).send({ message: "Username not found" });
        const user = userExist.rows[0];
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return res.status(203).send({ message: "Wrong Password" });

        // If matched Create JWT
        const accessToken = jwt.sign(
            { "id" : user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "id" : user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving Refresh Token in Database
        const result = await pool.query(queries.insertRefreshToken, [refreshToken, user.id]);
        const refresh_toked_id = result.rows[0].id
        const cookieConfig = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }

        if (process.env.NODE_ENV === "production") {
            cookieConfig.secure = true;
        }

        res.cookie('jwt', refresh_toked_id, cookieConfig);
        res.send({ accessToken });
    } catch(error) {
        console.log(error.message);
    }
}
module.exports = loginController;