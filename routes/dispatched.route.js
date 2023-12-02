import dispatchedController from "../controllers/dispatchedDrug.controller.js";
import { Router } from "express";

const router = Router()

router.get("/dispatched", dispatchedController.GetAllDispatched)

router.post("/dispatched/create", dispatchedController.CreateDispatched)

router.get("/dispatched/customer", dispatchedController.GetDispatchedByCustomer)

router.get("dispatched/inventory", dispatchedController.GetDispatchedByInventory)

router.get("/dispatched/:id", dispatchedController.GetSingleDispatchItem)

router.patch("/dispatched/:id", dispatchedController.EditDispatched)



export default router
