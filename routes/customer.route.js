import { Router } from "express"
import customerController from "../controllers/customer.controller.js"


const router= Router()

router.get("/customers", customerController.GetAllCustomers)

router.post("/customer/create", customerController.CreateCustomer)

router.get("/customer/:id", customerController.GetSingleCustomer)

router.get("/customer/name", customerController.GetCustomersByName)


router.get("/customer/state", customerController.GetCustomersByState)


export default router