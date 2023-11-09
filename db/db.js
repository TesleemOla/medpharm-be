import mongoose from "mongoose"


const Connect =()=>{
    mongoose.connect(process.env.MONGO_URI)
    
    mongoose.connection.on("connection",()=>{
        console.log("Database connection established")
    })
    mongoose.connection.on("error",(error)=>{
        console.log("Database connection error", error.message)
    })
    mongoose.connection.on("disconnect",()=>{
        console.log(`Database disconnected`)
    })
}


export default Connect;