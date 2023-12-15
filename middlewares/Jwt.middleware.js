import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { compare } from "bcrypt"

 // encode user details


export const encode= async function(req, res, next) {
        const { email, password } = req.body
    if (!email || !password) res.status(400).json({ success: false, error: "Please provide an email and a password" })
        User.findOne({email})
       .then(resp=> {
       
            compare(password, resp.password)
            .then(response=>{
                    const payload = {_id: resp._id, email, firstName: resp.firstName, lastName: resp.lastName, access: resp.access};
                   
                    const options = { expiresIn: "10 days" }
                    const getToken = jwt.sign(payload, process.env.JWT_SECRET, options)
                    if (!getToken) res.status(500).json({ error: err.message })
                            return res.status(200).json({ success: true, token:getToken })

            })
            .catch(err=> {
                res.status(409).json({ error:err.message})})
        })
       .catch(error=> res.status(500).json({error: error.message}))
   
        
    
    }
    // decode user details
    export const decodeAdmin = function(req, res, next) {
        if(!req.headers["authorization"]) {
            return res.status(401).json({ message: "Request headers not added"})
        }
        const authHeader = req.headers["authorization"].split(' ')
        const token = authHeader && authHeader[1]
        
        if(!token) res.status(401).json({ message: "user not authorized"})
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{

            if(err) return res.status(403).json({ error: err.message})
            if(user.access === "admin"){
            req.user = user
            }

            next()
    })
    }

    export const decode =function(req,res, next){
        if(!req.headers["authorization"]){
            return res.status(401).json({ message: "Request headers not added"})
        }
        const authHeader = req.headers["authorization"].split(" ")
        const token = authHeader && authHeader[1]

        if(!token) res.status(401).json({ message: "user not authorized"})
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err) return res.status(403).json({ error: err.message})

                req.user = user
        
        })
        next()
    }
