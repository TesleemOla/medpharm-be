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
    try{
         const hashpw = await bcrypt.hash(password, Number(process.env.SALT))
            if(hashpw){
            const user = await new User( firstName, lastName, email.toLowerCase(), hashpw )
            return user
            }
    }catch(error){
        throw new error
    }
    
    
}


export default mongoose.model('User',User)