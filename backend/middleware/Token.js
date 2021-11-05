const jwt = require('jsonwebtoken')

const createToken = ({id, Admin}) => jwt.sign({ id, Admin }, process.env.TOKEN_PASSWORD)

module.exports = createToken