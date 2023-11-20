import { Router } from "express";
import manufacturer from "../controllers/manufacturer.controller.js";

const router = Router();

router.get("/manufacturers", manufacturer.GetAllManufacturers)

router.get("/manufacturers/:id", manufacturer.GetSingleManufacturers)

router.patch("/manufacturers/:id", manufacturer.EditManufacturer)

router.post("/manufacturers", manufacturer.AddNewManufacturer)

router.delete("/manufacturers/:id", manufacturer.DeleteManufacturer)


export default router;
