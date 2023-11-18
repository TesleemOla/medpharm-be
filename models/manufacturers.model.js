import mongoose from "mongoose";

const Manufacturers = new mongoose.Schema({
    name:{
        type: String,
        unique: [true, "Manufacturer name already exists in database"],
        lowercase: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: [true, "Manufacturer phone number already exists in database"],
        required: true
    },
    address:{
        type: String,
        
    },
    status:{
        type: String,
        default: "Not approved"
    }
},{
    timestamps: true
})

Manufacturers.statics.getAllManufacturers = async function(){
    try{
        const manufacturers = await this.find()
        return manufacturers
    }
    catch(err){
        throw new Error(err)
    }
}

Manufacturers.statics.getSingleManufacturer = async function(id){
    try{
        const manufacturer = await this.findById(id)
        return manufacturer
    }
    catch(error){
        throw new Error(error)
    }
}

Manufacturers.statics.addNewManufacturer = async function(name, phoneNumber, address){
    try{
        const manufacturer = await this.create({ name, address, phoneNumber})
        return manufacturer
    }
    catch(error){
        throw new Error(error)
    }
}

Manufacturers.statics.EditManufacturer = async function(id, updateValues){
    try{
        const newManufacturer = await this.findByIdandUpdate(id, updateValues)
        return newManufacturer
    }
    catch(error){
        return error.message
    }
}

export default mongoose.Model("Manufacturers", Manufacturers)