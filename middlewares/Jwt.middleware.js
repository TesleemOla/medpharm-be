import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { compare } from "bcrypt"

 // encode user details


export const encode= async function(req, res, next) {
        const { email, password } = req.body
        User.findUserByEmail(email)
       .then(resp=> {
        if(resp){
            compare(password, resp.password)
            .then(response=>{
                if(response){
                    const payload = {
                        id: resp._id,
                        email: email
                    };

                    const options = { expiresIn: "240h" }
                    jwt.sign(payload, process.env.JWT_SECRET, options)
                    .then(result=>{
                        console.log(result)
                        if(result){
                            
                            req.authToken = result
                        }else{
                            res.sendStatus(500)
                        }
                    })
                    

                }
            })
            .catch(err=> res.status(409).json({ error: "Password incorrect"}))
        }})
       .catch(error=> res.status(500).json({error: "User not found"}))
   
        
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
