import express from "express";
import morgan from "morgan"
import jwt from "jsonwebtoken"
import helmet from "helmet"
import { config } from "dotenv";
// import middlewares
import errorHandler from "./middlewares/errorHandler.js"
import Connect from "./db/db.js";

// import routes
import { decode, decodeAdmin, encode } from "./middlewares/Jwt.middleware.js"
import UserRoute from "./routes/user.route.js"
import ManufacturerRoute from "./routes/manufacturer.route.js"
import InventoryRoute from "./routes/inventory.route.js"
import DrugRoute from "./routes/drug.route.js"
import DrugCategoryRoute from "./routes/drugCategory.route.js";
import CustomerRoute from "./routes/customer.route.js"
import DispatchedRoute from "./routes/dispatched.route.js"
import SupplierRoute from "./routes/suppliers.route.js"
import Datasummary from "./routes/datasummary.route.js";
import User from "./models/user.model.js"
import UserController from "./controllers/user.controller.js"
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


app.post("/login", encode);
app.post("/register", UserController.CreateUser)


// token as middleware


// routes
app.use("/user", decodeAdmin, UserRoute)

app.use("/api", decodeAdmin, ManufacturerRoute)

app.use("/api", decodeAdmin, InventoryRoute)

app.use("/api", decode, DrugRoute)

app.use("/api", decodeAdmin, DrugCategoryRoute)

app.use("/api", decodeAdmin, CustomerRoute)

app.use("/api", decodeAdmin, DispatchedRoute)

app.use("/api", decode, Datasummary)

app.use("/api", decode, SupplierRoute)



// use errorhandler
app.get("*", errorHandler)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})