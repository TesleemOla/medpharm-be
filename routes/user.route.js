import express from "express"
import User from "../controllers/user.controller.js"

const router = express.Router()

router.post("/register",User.CreateUser)
router.get("/all", User.GetUsers)
router.get("/:id", User.GetUserById)
router.get("/mail/:email", User.GetUserByEmail)
// router.post("/login", User.login)



export default router