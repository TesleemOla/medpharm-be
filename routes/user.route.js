import express from "express"
import User from "../controllers/user.controller.js"

const router = express.Router()

router.post("/register",User.CreateUser)
router.get("/", User.GetUsers)
// router.post("/login", User.login)



export default router