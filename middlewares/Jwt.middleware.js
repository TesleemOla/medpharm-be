import jwt from "jsonwebtoken"
 // encode user details
export const encode= function(req, res, next) {
        const { email, password } = req.body
        
        const payload = {
            id: user.id,
            email: user.email
        };

        const options = {expiresIn : "100h"}
       const coded = jwt.sign(payload, process.env.JWT_SECRET, options)
       if(!coded) res.sendStatus(500)
       req.authToken = coded
    next()
    }
    // decode user details
    export const decode = function(req, res, next) {
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