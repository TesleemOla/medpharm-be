
import User from "../models/user.model.js"


export default {
    CreateUser: async function(req, res){
        try{
            const { firstName, lastName, email, password } = req.body;
            //  const user = await User.createUser( firstName, lastName, email, password )
            //  if(!user) return res.status(403).json({message:"failed to create user"})
            //         return res.status(201).json({ success: true, user: user })
            User.createUser(firstName, lastName, email, password)
            .then(response=> res.status(201).json({success: true, user: response}))
            .catch(err=> res.status(500).json({success:false, error: err.message}))
        }catch(error){
            return res.status(500).json({ success: false, error})
        }
        
        },

}