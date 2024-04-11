const jwt = require("jsonwebtoken");

const verify = (req,res,next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const authHeader = req.headers['authorization'];
    if (!authHeader || (!cookies?.jwt && authHeader)) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid Token
            req.user = decoded.id;
            next();
        }
    )
}

const verifyAuth = (req,res,next) => {
    const cookies = req.cookies
    const authHeader = req.headers['authorization'];
    if (!authHeader || (!cookies?.jwt && authHeader)) return next();
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return next(); // Invalid Token
            req.user = decoded.id;
            return res.status(203).send({ message: "You are already authenticated" });
        }
    )
}


module.exports = { verify, verifyAuth };