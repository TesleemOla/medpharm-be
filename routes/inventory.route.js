import { Router } from "express";
import Inventory from "../controllers/inventory.controller.js";
import { decode } from "../middlewares/Jwt.middleware.js";
const router = Router();

router.get("/inventories",decode(["admin","client"]), Inventory.GetAllInventory )

router.get("/inventories/:id", decode(["admin", "client"]), Inventory.GetSingleInventory)

router.post("/inventories",decode(["admin"]), Inventory.CreateInventory)

router.patch("/inventories/:id",decode(["admin"]), Inventory.EditInventory)

router.delete("/inventories/:id",decode(["admin"]), Inventory.DeleteInventory)


export default router;