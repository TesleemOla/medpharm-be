import express from "express"
import User from "../controllers/user.controller.js"


const router = express.Router()



router.get("/all", User.GetUsers)
router.get("/:id", User.GetUserById)
router.get("/mail/:email", User.GetUserByEmail)

// uses queries of user email, newpassword1 and newpassword2
router.patch("/forgotPassword", User.ChangePassword)




export default router