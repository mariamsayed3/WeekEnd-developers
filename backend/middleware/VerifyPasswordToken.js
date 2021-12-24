const jwt = require('jsonwebtoken')

function decodeResetPassToken(token) {
    try {
        return jwt.verify(token, process.env.Reset_Password)
    }
    catch(e) {
        return null;
    }
}

module.exports = decodeResetPassToken