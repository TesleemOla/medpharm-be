
import User from "../models/user.model.js"


export default {
    CreateUser: async function(req, res){
        try{
            const { firstName, lastName, email, password } = req.body;
            const newUser = await User.createUser(firstName, lastName, email, password)
          
                   return res.status(201).json({ success: true, newUser})
            
            }
            catch(error){
                return res.status(500).json({success: false, error: error.message})
            }

        
        },
        GetUsers: async function(req, res){
            try{
                const users = await User.findAllUsers()
                return res.status(200).json({ success: true, users: users })
            }
            catch(err) {
                res.status(500).json({ success: false, err: err.message})
            }
        }
}