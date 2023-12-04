import { Schema, model, Types } from "mongoose";


const Drugs = new Schema({

    categoryId:{
        type: Types.ObjectId,
        ref: "DrugCategory",
        required: [true, "Please add a drug category"]
    },
    productId: {
        type: String,
        required: [true, "Product Id is required"],
        unique: true,
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
        enum: [1,2,3,4,5],
        required: [true, "Please add a reorder level to indicate the urgency"]
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
            categoryId: new Types.ObjectId(categoryId)
            , productId, drugName, scientificName, reOrderLevel,
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
    let alldrugs = await this.find().populate("categoryId")
    return alldrugs
    }
    catch(error){
        throw error
    }
}

Drugs.statics.getSingleDrug = async function(id){
    try{
        const singleDrug = await this.findById(id).populate("categoryId")
        return singleDrug
    }
    catch(error){
        throw error
    }
}

Drugs.statics.GetDrugsByCategory = async function(categoryid){
    try{
        const allincategory = await this.find({ categoryId: categoryid})
        return allincategory
    }
    catch(error){
        throw error
    }
}
Drugs.statics.GetDrugsByPackagename = async function(packagename){
    try{
        const allinpackage = await this.find({packageType: packagename})
        return allinpackage
    }
    catch(error){
        throw error
    }
}
Drugs.statics.deleteDrug = async function(id){
    try{
        const deletedItem = await this.deleteOne({_id: id})
        return deletedItem
    }
    catch(error){
        throw error
    }
}
Drugs.statics.editDrug = async function(id, updatedValues){
    try{
        const editedItem = await this.findByIdAndUpdate(id, updatedValues, {new: true})
        return editedItem
    }
    catch(error){
        throw error
    }
}
export default model("Drugs", Drugs)