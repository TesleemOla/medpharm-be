import mongoose from "mongoose"


const Connect =()=>{
    mongoose.connect(process.env.MONGO_URI)
    
    mongoose.connection.on("connected",()=>{
        console.log("Database connection established")
    })
    mongoose.connection.on("reconnected", () => {
        console.log("Database connection re-established")
    })
    mongoose.connection.on("error",(error)=>{
        console.log("Database connection error", error.message)
    })
    mongoose.connection.on("disconnected",()=>{
        console.log(`Database disconnected`)
    })
}


export default Connect;