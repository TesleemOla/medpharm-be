import express from "express";
import morgan from "morgan"

// import middlewares
import errorHandler from "./middlewares/errorHandler.js"
import Connect from "./db/db.js";
const app = express()
Connect()

// middlewares
app.use(express.json())
app.use(morgan("dev"))

// routes
app.get("/",(req,res)=>{
    return res.send('<h1>Medpharm be started')
})



// use errorhandler
app.get(errorHandler)
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})