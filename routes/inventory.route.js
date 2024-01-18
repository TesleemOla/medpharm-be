import { Router } from "express";
import Inventory from "../controllers/inventory.controller.js";
const router = Router();

router.get("/inventories", Inventory.GetAllInventory )

router.get("/inventories/:id", Inventory.GetSingleInventory)

router.post("/inventories", Inventory.CreateInventory)

router.patch("/inventories/:id", Inventory.EditInventory)

router.delete("/inventories/:id", Inventory.DeleteInventory)


export default router;