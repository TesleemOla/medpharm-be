import mongoose from "mongoose";
import bcrypt from "bcrypt"

const User = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minLength: [6, "Password must be at least 6 characters"]
    },
    firstName: {
        type: String,
        required: [true, "please enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "please enter your last name"],
    },
    access:{
        type: String,
        enum: ["client", "admin", "staff", "marketer"],
        default: "client"


    }
},{
    timestamps: true
})
User.statics.createUser = async function ( firstName, lastName, email, password ) {
    
   
          bcrypt.hash(password, 2000,(err, encrypted)=>{
            if(err) return err
            console.log(encrypted)
             User( firstName, lastName, email.toLowerCase(), encrypted )
            .then(res=>  {
                console.log(res)
                return res})
            .catch(error=> next(error))
     
            })
    // }catch(error){
    //     throw new error
    // }
    
    
}


export default mongoose.model('User',User)