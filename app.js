import express from "express";
import morgan from "morgan"
import jwt from "jsonwebtoken"
import { compare } from "bcrypt"
import { config } from "dotenv";
// import middlewares
import errorHandler from "./middlewares/errorHandler.js"
import Connect from "./db/db.js";

// import routes
import { decode } from "./middlewares/Jwt.middleware.js"
import UserRoute from "./routes/user.route.js"
import User from "./models/user.model.js"
const app = express()
Connect()

// middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use("/user", UserRoute)
config()
// routes
app.get("/login",(req,res)=>{
    return res.status(200).json({ success:"starting now"})
    
})


app.post("/login", (req, res)=>{
    User.findOne({ email: req.body.email })
    .then(resp=> {
        if(resp){
            compare(req.body.password, resp.password)
            .then( result=>{
                if(result){
                let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).json({success: false, auth: true, token: token });
            }else{
                res.status(409).json({ success: false, error: "Incorrect Password"})
            }
            })
            .catch(err=> res.status(401).send({success: false, error: err.message}))
        }
    })
        .catch(error => res.status(500).json({error: error.message}))
    


        

        
    });
    // return res.status(200).json({
    //     success: true,
    //     token: req.authToken
    // })



// use errorhandler
// app.get("*", errorHandler)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})