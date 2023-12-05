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
        if(!req.headers["authorization"]) {
            return res.status(401).json({ message: "Request headers not added"})
        }
        const authHeader = req.headers["authorization"].split(' ')
        const token = authHeader && authHeader[1]
        
        if(!token) res.status(401).json({ message: "user token not found"})
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            
            if(err) return res.status(403).json({ error: err.message})

            req.user = user

            next()
    })
    }
