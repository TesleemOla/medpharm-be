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
        required: true
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
        throw err
    }
}

Manufacturers.statics.getSingleManufacturer = async function(id){
    try{
        const manufacturer = await this.findById(id)
        return manufacturer
    }
    catch(error){
        throw error
    }
}

Manufacturers.statics.addNewManufacturer = async function(name, phoneNumber, address){
   console.log(name, address, phoneNumber)
    try{
        const manufacturer = await this.create({name, address, phoneNumber})
        return manufacturer
    }
    catch(error){
        throw error
    }
}
Manufacturers.statics.deleteManufacturer = async function(id){
    try{
        const deletedManufacturer = await this.deleteOne(id)
        return deletedManufacturer
    }
    catch(error){
        throw error
    }
}
Manufacturers.statics.EditManufacturer = async function(id, updateValues){
    try{
        const newManufacturer = await this.findByIdandUpdate(id, updateValues, { new: true })
        return newManufacturer
    }
    catch(error){
        throw error
    }
}

export default mongoose.model("Manufacturers", Manufacturers)