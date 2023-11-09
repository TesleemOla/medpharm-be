import jwt from "jsonwebtoken"
export default {
    // encode user details
    encode: function(req, res, next) {
        const { user } = req.params
        
        const payload = {
            id: user.id,
            email: user.email
        };

        const options = {expiresIn : "100h"}
        return jwt.sign(payload, process.env.JWT_SECRET, options)
    },
    // decode user details
    decode: function(req, res, next) {
        const authHeader = req.headers["authorization"].split(' ')
        const token = authHeader && authHeader[1]

        if(!token) res.sendStatus(401)
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            console.log(err)

            if(err) return res.sendStateus(403)

            req.user = user

            next()
    })

    }
}