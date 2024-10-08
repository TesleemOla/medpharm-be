
import { sendResponse } from "../middlewares/Jwt.middleware.js";
import User from "../models/user.model.js"


export default {
    CreateUser: async function(req, res){
        try{
            const { firstName, lastName, email, password, access } = req.body;
            const newUser = await User.createUser(firstName, lastName, email, password, access)
          
                   return res.status(201).json({ success: true, data: newUser})
            
            }
            catch(error){
                return res.status(500).json({success: false, error: error.message})
            }

        
        },
        GetUsers: async function(req, res){
            try{
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
    },
        ChangePassword: async function (req, res){
            const { email, newpassword1, newpassword2 } = req.body
            if (newpassword1 === newpassword2){
            try{
                const user = await User.changeUserPassword(email, newpassword1 )
                return sendResponse(res, 201, true, user)
            }
            catch(err){
                return sendResponse(res, 500,false, err.message)
            }
        }else{
            return sendResponse(res, 500, false, "New password values not the same")
        }
        }

}