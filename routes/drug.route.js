import { Router } from "express";
import drugs from "../controllers/drugs.controller.js";

const router = Router();

router.get("/drug", drugs.GetAllDrugs)

router.get("/drug/:id", drugs.GetSingleDrug)

router.post("/drug", drugs.CreateDrug)

router.put("/drug/:id", drugs.EditDrug)

router.delete("/drug/:id",drugs.DeleteDrug)


export default router