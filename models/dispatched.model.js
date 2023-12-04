import { Schema,model } from "mongoose";

const DispatchedDrug = new Schema({

    inventory: {
        type: Schema.ObjectId,
        ref: "Inventory",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    client: {
        type: Schema.ObjectId,
        ref: "Customer"
    }
},{
    timestamps: true,
})
DispatchedDrug.statics.CreateDispatchedDrug = async function(inventory, quantity, client){
    try{
        const newDispatched = await this.create({ inventory, quantity, client });
        return newDispatched
    }
    catch(err){
        throw err
    }
}

DispatchedDrug.statics.GetAllDispatched = async function(){
    try{
        const allDispatched = await this.find()
        return allDispatched
    }
    catch(err){
        throw err
    }
}

DispatchedDrug.statics.GetDispatchedByCustomer = async function(customerId){
    try{
        const dispatched = await this.find({ client: customerId}).populate(inventory, client)
        return dispatched
    }
    catch(err){
        throw err
    }
}
DispatchedDrug.statics.GetDispatchedByInventory = async function(inventoryId){
    try {
        const dispatched = await this.find({ inventory: inventoryId }).populate(inventory, client)
        return dispatched

    }
    catch (err) {
        throw err
    }
}
DispatchedDrug.statics.GetSingleDispatched = async function(id){
    try {
        const dispatched = await this.findById(id).populate(inventory, client)
        return dispatched

    }
    catch (err) {
        throw err
    }
}

DispatchedDrug.statics.EditDispatchedDrug = async function(id, updateValues){
    try{
        const dispatched = await this.findByIdAndUpdate(id, updateValues)
        return dispatched
    }
    catch(err){
        throw err
    }
}
export default model("DispatchedDrug", DispatchedDrug)


