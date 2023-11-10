import bcrypt from "bcrypt"
import User from "../models/user.model.js"


export default {
    CreateUser: async function(req, res){
        
        const { firstName, lastName, email, password } = req.body;
    
        try{
             const user = await User.createUser( firstName, lastName, email, password )
                    return res.status(201).json({ success: true, user: user })
             
        }catch(error){
            return res.status(500).json({ error: error.message})
        }
        
        },
    // login: async function(req, res){
    //     console.log(req.body)
    //     const { email, password} = req.body
    //     const userDetails = await userModel.findOne({ email: email.toLowerCase()})
    //     if(!userDetails){
    //         return res.status(404).json({ success: false, error: "User not found"})
    //     }
        
    // }
}