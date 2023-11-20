import Inventory from "../models/inventory.model.js";


export default {
    CreateInventory: async function(req, res){
        try{
        const { batchNumber, clientId, drugId, drugName, expiryDate,
            manufacturedDate, manufacturerId, qualityStock, supplierId } = req.body;
        const newInventory = await Inventory.addNewInventory({
            batchNumber, clientId, drugId, drugName, expiryDate,
            manufacturedDate, manufacturerId, qualityStock, supplierId
        })
        console.log(newInventory)
        return res.status(201).json({ success: true, data: newInventory})
    }
    catch(err){
        res.status(400).json({ success: false, error: err.message})
    }
    },
    EditInventory: async function (req, res){
        try{
        const { id } = req.params
        const edit = await Inventory.editInventory(id)
        return res.status(200).json({ message: "Inventory edited successfully", data: edit})
        }catch(err){
            return res.status(400).json({ success: false, error: err.message})
        }
    },
    DeleteInventory: async function(req, res){
        try{
        const { id }= req.params
        const Deleted = await Inventory.deleteInventory(id)
        return res.status(200).json({ message:"Inventory item deleted", data: Deleted})
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    GetAllInventory: async function(req, res){
        try{
        const allInventory = await Inventory.getAllInventory()
        return res.status(200).json({ success: true, data: allInventory})
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    GetSingleInventory: async function(req,res){
        try{
        const { id } = req.params
        const singleInventory = await Inventory.getSingleInventory(id)
        return res.status(200).json({ success: true, data: singleInventory})
        }
        catch(error){
            return res.status(500).json({ success: false, error: error.message})
        }
    }
}