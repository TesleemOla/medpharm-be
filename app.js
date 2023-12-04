import express from "express";
import morgan from "morgan"
import jwt from "jsonwebtoken"
import helmet from "helmet"
import { compare } from "bcrypt"
import { config } from "dotenv";
// import middlewares
import errorHandler from "./middlewares/errorHandler.js"
import Connect from "./db/db.js";

// import routes
import { decode } from "./middlewares/Jwt.middleware.js"
import UserRoute from "./routes/user.route.js"
import ManufacturerRoute from "./routes/manufacturer.route.js"
import InventoryRoute from "./routes/inventory.route.js"
import DrugRoute from "./routes/drug.route.js"
import DrugCategoryRoute from "./routes/drugCategory.route.js";
import CustomerRoute from "./routes/customer.route.js"
import DispatchedRoute from "./routes/dispatched.route.js"
import Datasummary from "./routes/datasummary.route.js";
import User from "./models/user.model.js"
const app = express()


// config and connect to mongoose
config()
Connect()

// middlewares
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))


// login route before using token as midddleware
app.get("/", (req, res) => {
    return res.status(200).json({ success: "starting now" })

})


app.post("/login", (req, res) => {

    User.findOne({ email: req.body.email })
        .then(resp => {
            if (resp) {
                compare(req.body.password, resp.password)
                    .then(result => {
                        if (result) {
                            let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            res.status(200).json({ success: false, auth: true, token: token });
                        } else {
                            res.status(409).json({ success: false, error: "Incorrect Password" })
                        }
                    })
                    .catch(err => res.status(401).send({ success: false, error: err.message }))
            }
        })
        .catch(error => res.status(500).json({ error: error.message }))


});


// token as middleware

app.use(decode)
// routes
app.use("/user", UserRoute)

app.use("/api", ManufacturerRoute)

app.use("/api", InventoryRoute)

app.use("/api", DrugRoute)

app.use("/api", DrugCategoryRoute)

app.use("/api", CustomerRoute)

app.use("/api", DispatchedRoute)

app.use("/api", Datasummary)




// use errorhandler
app.get("*", errorHandler)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})