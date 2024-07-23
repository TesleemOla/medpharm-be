import { Router } from "express";
import drugs from "../controllers/drugs.controller.js";
import { decode } from "../middlewares/Jwt.middleware.js";

const router = Router();

router.get("/drugs", decode(["admin","client"]), drugs.GetAllDrugs)

router.get("/drug/:id",decode(["admin"]), drugs.GetSingleDrug)

router.post("/drug", decode(["admin"]), drugs.CreateDrug)

router.patch("/drug/:id", decode(["admin"]), drugs.EditDrug)

router.delete("/drug/:id", decode(["admin"]), drugs.DeleteDrug)


export default router