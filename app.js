import express from "express";
import morgan from "morgan"

const app = express()


// middlewares
app.use(express.json())
app.use(morgan("dev"))

// routes
app.get("/",(req,res)=>{
    return res.send('<h1>Medpharm be started')
})


const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})