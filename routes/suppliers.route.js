import suppliersController from "../controllers/suppliers.controller.js";
import { Router } from "express";


const router = Router()


router.post("/supplier/new", suppliersController.CreateSupplier)


router.get("/suppliers", suppliersController.GetAllSuppliers)

router.get("/supplier/:id", suppliersController.GetSingleSupplier)

router.patch("/supplier/:id", suppliersController.EditSupplier)

router.get("/supplier/byname/name", suppliersController.GetSupplierByName)

router.delete("/supplier/:id", suppliersController.DeleteSupplier)



export default router