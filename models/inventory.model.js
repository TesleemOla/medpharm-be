import { Schema, Model } from "mongoose";


const Inventory = new Schema({
  
    batchNumber:{
        type: String,
        required: true
    },
    clientId:{
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, "ClientId is required"]
    },
    drugId: {
        type: Schema.ObjectId,
        ref: 'drug',
        required: [true, "drugId is required"]
    },
    drugName: {
        type: String,
        required: [true, 'please provide a drugName'],
        unique: [true, 'drug already exists in inventory']
    },
    expiryDate: {
        type: Date,
        required: [true, "expiryDate is required"]
    },
    manufacturedDate: {
        type: Date,
        required: [true, "Date of manufacture is required"]
    },
    manufacturerId:{
        type: Schema.ObjectId,
        ref: "Manufacturers",
        required: [true, "Manufacturer Id is required"]
    },
    qualityStock:{
        type: Number,
        required: [true, "Quality stock is required"]
    },
    supplierId:{
        type: Schema.ObjectId,
        ref: "Suppliers",
        required: [true, "Supplier Id is required"]
    }
})
Inventory.statics.addNewInventory = async function({batchNumber, clientId, drugId, drugName, expiryDate,
     manufacturedDate, manufacturerId, qualityStock, supplierId}){
    try{
        const newInventory = await this.create({
            batchNumber, clientId, drugId, drugName, expiryDate,
            manufacturedDate, manufacturerId, qualityStock, supplierId
        })
        return newInventory
    }
    catch(error){
        return error
    }
}
Inventory.statics.getAllInventory= async function(){
    try{
        const Inventories = await this.find()
        return Inventories
    }
    catch(error){
        return error
    }
}
Inventory.statics.getSingleInventory = async function(id){
    try{
        const Inventory = await this.findById(id)
        return Inventory
    }
    catch(error){
        return error
    }
}
Inventory.statics.EditInventory = async function(id, updateValues){
    try{
        const InventoryUpdate = await this.findByIdandUpdateValues(id, updateValues)
        return InventoryUpdate
    }
    catch(error){
        return error
    }
}
Inventory.statics.DeleteInventory = async function(id){
    try{
        const DeletedInventory = await this.deleteOne(id)
        return DeletedInventory
    }
    catch(error){
        return error
    }
}

export default Model("Inventory", Inventory)