const jwt = require ('jsonwebtoken');

//ini buat cetak token

module.exports = {
    createJWTToken(payload){
        return jwt.sign(payload, "puripuriprisoner", { expiresIn : '12h' })
    }
}