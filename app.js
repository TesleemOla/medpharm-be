import express from "express";
import morgan from "morgan"

// import middlewares
import errorHandler from "./middlewares/errorHandler.js"
import Connect from "./db/db.js";

// import routes
import { encode} from "./middlewares/Jwt.middleware.js"
import UserRoute from "./routes/user.route.js"
import User from "./models/user.model.js"
const app = express()
Connect()

// middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use("/user", UserRoute)

// routes
app.get("/",(req,res)=>{
    return res.status(200).json({ success:"starting now"})
    
})


// app.post("/login", encode , (req, res)=>{

//     return res.status(200).json({
//         success: true,
//         authorization: req.token
//     })
// })



// use errorhandler
// app.get("*", errorHandler)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})