import { Router } from 'express'
import { decode } from '../middlewares/Jwt.middleware.js'
import Categories from "../controllers/drugcategory.controller.js"

const router = Router()

router.get("/drugCategory", decode(["admin", "client"]), Categories.GetAllCategories)

router.get("/drugCategory/:id", decode(["admin", "client"]), Categories.GetSingleCategory)

router.post("/drugCategory", decode(["admin"]), Categories.CreateCategory)

router.put("/drugCategory/:id", decode(["admin"]), Categories.EditCategory)

export default router