import express from "express";
import morgan from "morgan"
import helmet from "helmet"
import cors from 'cors'

// import middlewares
import errorHandler from "./middlewares/errorHandler.js"
import Connect from "./db/db.js";

// import routes
import { decode, encode } from "./middlewares/Jwt.middleware.js"
import UserRoute from "./routes/user.route.js"
import ManufacturerRoute from "./routes/manufacturer.route.js"
import InventoryRoute from "./routes/inventory.route.js"
import DrugRoute from "./routes/drug.route.js"
import DrugCategoryRoute from "./routes/drugCategory.route.js";
import CustomerRoute from "./routes/customer.route.js"
import DispatchedRoute from "./routes/dispatched.route.js"
import SupplierRoute from "./routes/suppliers.route.js"
import Datasummary from "./routes/datasummary.route.js";
import UserController from "./controllers/user.controller.js"
const app = express()


// config and connect to mongoose
Connect()

// middlewares
app.use(helmet())
app.use(cors())
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
app.use("/user", decode(["admin"]), UserRoute)

app.use("/api", ManufacturerRoute)

app.use("/api", InventoryRoute)

app.use("/api", DrugRoute)

app.use("/api", DrugCategoryRoute)

app.use("/api", decode(["admin"]), CustomerRoute)

app.use("/api", DispatchedRoute)

app.use("/api", decode(["client"]), Datasummary)

app.use("/api", decode(["admin"]), SupplierRoute)



// use errorhandler
app.get("*", errorHandler)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
})