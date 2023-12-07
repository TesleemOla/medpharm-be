import { Schema, model, Types} from "mongoose";


const Suppliers = new Schema({
    name:{
        type: String,
        unique: [true, "{VALUE} already exists as a supplier"],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter a phone number"]
    },
    userId:{
        type: Types.ObjectId,
        ref: "User",
        required: true
    }
})

Suppliers.statics.getAllSuppliers = async function(){
    try{
        const suppliers = await this.find().populate("userId")
        return suppliers
    }
    catch(error){
        throw error
    }
}

Suppliers.statics.createSupplier = async function (name, address, phoneNumber, userId){
    try{
        const objectId = new Types.ObjectId(userId)
        const newsupplier = await this.create({name, address, phoneNumber, userId: objectId})
        return newsupplier
    }
    catch(err){
        throw err
    }
}

Suppliers.statics.editSupplier = async function(id, updatedValues){
    try{
        const edited = await this.findByIdAndUpdate(id, updatedValues, {new:true})
        return edited
    }
    catch(err){
        throw err
    }
}

Suppliers.statics.getSingleSupplier = async function(id){
    try{
        const supplier = await this.findById(id).populate("userId")
        return supplier
    }
    catch(err){
        throw err
    }
}

Suppliers.statics.getSupplierByName = async function(name){
    try{
        const supplier = await this.find({name: name}).populate("userId")
        return supplier
    }
    catch(err){
        throw err
    }
}
Suppliers.statics.deleteSupplier = async function(id){
    try{
        const deleted = await this.findByIdAndDelete(id)
        return deleted
    }
    catch(error){
        throw error
    }
}


export default model("Suppliers", Suppliers)