import { Schema, model} from "mongoose";


const Drugs = new Schema({

    categoryId:{
        type: Schema.ObjectId,
        ref: "drugcategories",
        required: [true, "Please add a drug category"]
    },
    productId: {
        type: String,
        required: [true, "Product Id is required"]
    },
    drugName: {
        type: String,
        required: true

    },
    scientificName:{
        type: String,

    },
    reOrderLevel: {
        type: Number,
        required: true
    },
    drugDescription:{
        type: String
    },
    treatmentUsedFor:{
        type: String
    },
    packageType:{ 
        type: String,
        enum: [ "syringe", "vial", "plastic", "blister pack", "ampoule", "aluminium foil", "bottle"],
        required: [true, "please select a package type"]
    },
    noInPackage:{
        type: Number,
        default: 1
    }


})
Drugs.statics.createDrug = async function (categoryId, productId, drugName, scientificName, reOrderLevel,
    drugDescription, treatmentUsedFor, packageType, noInPackage) {

    try {
        const newdrug = await this.create({
            categoryId, productId, drugName, scientificName, reOrderLevel,
            drugDescription, treatmentUsedFor, packageType, noInPackage
        })
        return newdrug
    }
    catch (err) {
       throw err
    }
}

Drugs.statics.getAllDrugs= async function(){
    try{
    let alldrugs = await this.find()
    return alldrugs
    }
    catch(error){
        throw error
    }
}

Drugs.statics.getSingleDrug = async function(id){
    try{
        const singleDrug = await this.findById(id)
        return singleDrug
    }
    catch(error){
        throw error
    }
}
Drugs.statics.deleteDrugs = async function(id){
    try{
        const deletedItem = await this.delete(id)
        return deletedItem
    }
    catch(error){
        throw error
    }
}
Drugs.statics.editDrug = async function(id, updatedValues){
    try{
        const editedItem = await this.findByIdAndUpdate(id, updatedValues)
        return editedItem
    }
    catch(error){
        throw error
    }
}
export default model("Drugs", Drugs)