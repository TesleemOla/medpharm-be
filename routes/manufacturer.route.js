import { Router } from "express";
import manufacturer from "../controllers/manufacturer.controller.js";

const router = Router();

router.get('/api/manufacturers', manufacturer.GetAllManufacturers)

router.get('/api/manufacturers/:id', manufacturer.GetSingleManufacturers)

router.patch('/api/manufacturers/:id', manufacturer.EditManufacturer)

router.post("/api/maufacturers", manufacturer.AddNewManufacturer)

router.delete("/api/manufacturers/:id", manufacturer.DeleteManufacturer)
export default router;
