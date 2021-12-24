const jwt = require('jsonwebtoken')

const verify = async(req, res, next) => {
    let {Token} = req.body
    if(!Token){
        Token = req.params.Token
    }
    
    jwt.verify(Token, process.env.TOKEN_PASSWORD, (err, user) => {
        if(err) return res.sendStatus(403)
        req.id = user.id
        req.Admin = user.Admin
        next()
    })
    
}



module.exports = verify

