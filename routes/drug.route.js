import { Router } from "express";
import drugs from "../controllers/drugs.controller.js";

const router = Router();

router.get("/drugs", drugs.GetAllDrugs)

router.get("/drug/:id", drugs.GetSingleDrug)

router.post("/drug", drugs.CreateDrug)

router.patch("/drug/:id", drugs.EditDrug)

router.delete("/drug/:id",drugs.DeleteDrug)


export default router