const jwt = require ('jsonwebtoken');

//ini buat cek apakah tokennya sama kayak yg ada di localhost, tokennya di decode lagi

module.exports = {
    auth : (req, res, next) => {
        if (req.method !== "OPTIONS") {
            jwt.verify(req.token, "puripuriprisoner", (error, decoded) => {
                if (error) {
                    return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
                }
                console.log(decoded)
                req.user = decoded;
                next();
            });
        } else {
            next();
        }
    }
}