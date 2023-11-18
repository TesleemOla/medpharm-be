import Inventory from "../models/inventory.model";


export default {
    CreateInventory: async function(req, res){
        const { batchNumber, clientId, drugId, drugName, expiryDate,
            manufacturedDate, manufacturerId, qualityStock, supplierId } = req.body;
        const newInventory = Inventory.addNewInventory({
            batchNumber, clientId, drugId, drugName, expiryDate,
            manufacturedDate, manufacturerId, qualityStock, supplierId
        })
        return res.status(201).json({ success: true, data: newInventory})
    },
    EditInventory: async function (req, res){
        const { id } = req.params
        Inventory.editInventory(id)
        return res.status(200).json({ success: true, message: "Inventory edited successfully"})
    },
    DeleteInventory: async function(req, res){
        const { id }= req.params
        Inventory.deleteInventory(id)
        return res.status(200).json({success: true, message:"Inventory item deleted"})
    }
}