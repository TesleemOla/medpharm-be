import dispatchedController from "../controllers/dispatchedDrug.controller.js";
import { decode}  from "../middlewares/Jwt.middleware.js"
import { Router } from "express";

const router = Router()

router.get("/dispatched", decode(["admin", "client"]), dispatchedController.GetAllDispatched)

router.post("/dispatched/create", decode(["admin"]), dispatchedController.CreateDispatched)

router.get("/dispatched/customer", decode(["admin", "client"]), dispatchedController.GetDispatchedByCustomer)

router.get("dispatched/inventory", decode(["admin", "client"]), dispatchedController.GetDispatchedByInventory)

router.get("/dispatched/:id", decode(["admin", "client"]), dispatchedController.GetSingleDispatchItem)

router.patch("/dispatched/:id", decode(["admin"]), dispatchedController.EditDispatched)



export default router
