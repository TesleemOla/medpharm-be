import { Router } from 'express'
import Categories from "../controllers/drugcategory.controller.js"

const router = Router()

router.get("/drugCategory", Categories.GetAllCategories)

router.get("/drugCategory/:id", Categories.GetSingleCategory)

router.post("/drugCategory", Categories.CreateCategory)

router.put("/drugCategory/:id", Categories.EditCategory)

export default router