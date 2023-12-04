import { Schema, model, Types } from "mongoose";


const Inventory = new Schema({
  
    batchNumber:{
        type: String,
        required: true
    },
    clientId:{
        type: Types.ObjectId,
        ref: 'User',
        required: [true, "ClientId is required"]
    },
    drugId: {
        type: Schema.ObjectId,
        ref: 'drugs',
        populate: true,
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
    quantityStock:{
        type: Number,
        required: [true, "Quantity stock is required"]
    },
    supplierId:{
        type: Schema.ObjectId,
        ref: "Suppliers",
        required: [true, "Supplier Id is required"]
    }
})
Inventory.statics.addNewInventory = async function({batchNumber, clientId, drugId, drugName, expiryDate,
     manufacturedDate, manufacturerId, quantityStock, supplierId}){
    try{
        const newInventory = await this.create({
            batchNumber,
             clientId: new Types.ObjectId(clientId),
             drugId, drugName, expiryDate,
            manufacturedDate,
             manufacturerId: new Types.ObjectId(manufacturerId),
              quantityStock, supplierId
        })
        return newInventory
    }
    catch(error){
        throw error
    }
}
Inventory.statics.getAllInventory= async function(){
    try{
        const Inventories = await this.find().populate("clientId","manufacturerId")
        return Inventories
    }
    catch(error){
        throw error
    }
}
Inventory.statics.getSingleInventory = async function(id){
    try{
        const Inventory = await this.findById(id).populate("clientId", "manufacturerId")
        return Inventory
    }
    catch(error){
        throw error
    }
}
Inventory.statics.editInventory = async function(id, updateValues){
    try{
        const InventoryUpdate = await this.findByIdandUpdateValues(id, updateValues, {new: true})
        return InventoryUpdate
    }
    catch(error){
        throw error
    }
}
Inventory.statics.deleteInventory = async function(id){
    try{
        const DeletedInventory = await this.deleteOne(id)
        return DeletedInventory
    }
    catch(error){
        throw error
    }
}

export default model("Inventory", Inventory)