import { Router } from "express";
import datasummary from "../controllers/datasummary.js";

const router = Router()

router.get("/summary/counts", datasummary.GetCounts)

router.get("/summary/users/type", datasummary.GetUserCountByType)

router.get("/summary/drugs/categories", datasummary.GetDrugsByCategories)

router.get("/summary/drugs/package", datasummary.GetDrugsByPackage)

export default router;