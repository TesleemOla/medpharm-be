
import User from "../models/user.model.js"


export default {
    CreateUser: async function(req, res){
        try{
            const { firstName, lastName, email, password } = req.body;
            const newUser = await User.createUser(firstName, lastName, email, password)
          
                   return res.status(201).json({ success: true, data: newUser})
            
            }
            catch(error){
                return res.status(500).json({success: false, error: error.message})
            }

        
        },
        GetUsers: async function(req, res){
            try{
                // if(req.query.limit && ){

                // }
                const users = await User.findAllUsers()
                return res.status(200).json({ success: true, data: users })
            }
            catch(err) {
                res.status(500).json({ success: false, err: err.message})
            }
        },
        GetUsersByType: async function(req, res){
            try{
                let accesstype = req.query.accesstype

                const users = await User.findUserByType(accesstype)
                return res.status(200).json({ success: true, data: users})
            }
            catch(error){
                res.status(500).json({ success: false, error: error.message })
            }
        },
        GetUserByEmail: async function (req, res){
            const { email }=  req.params
            
            try{
                const user = await User.findUserByEmail(email)
                return res.status(200).json({success: true, data: user})
            }
            catch(error){
                return res.status(500).json({success: false, error: error.message})
            }
        },
        GetUserById: async function (req, res) {
            const { id } = req.params
            try {
                const user = await User.findUserById(id)
                return res.status(200).json({ success: true, data: user })
            }
            catch (error) {
                return res.status(500).json({ success: false, error: error.message })
            }
    }

}