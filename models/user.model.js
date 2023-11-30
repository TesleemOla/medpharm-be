import mongoose from "mongoose";
import { hash, genSalt } from "bcrypt"

const User = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        lowercase: true
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
},{
    statics: {
        
    }
})

User.pre(
    'save',
    async function (next){
        const salt = await genSalt(15)
        const hashed = await hash(this.password, salt)
        this.password = hashed

        next()
    }
)

User.statics.createUser = async function ( firstName, lastName, email, password ) { 
            try{
               
            const user = await this.create({firstName, lastName, email, password } )
            
            return user
            } 
            catch(error){
                throw error}
    
    
}
User.statics.findAllUsers = async function(){
    try{
        // if
        const allUsers = await this.find()
        return allUsers
    }
    catch(error){
        throw new Error(error)
    }
}
User.statics.findUserByEmail = async function(mail){
    try{
        
        const user = await this.findOne({ email: mail})
        return user
    }
    catch(err){
        throw new Error(err)
    }
}
User.statics.findUserByType = async function(query){
    try{
        const users = await this.find({ access: query })
        return users
    }
    catch(err){
        throw new Error(err)
    }
}
User.statics.findUserById = async function(id){
    try{
        const user = await this.findById(id)
        return user
    }
    catch(error){
        throw new Error(error)
    }
}


export default mongoose.model('User',User)