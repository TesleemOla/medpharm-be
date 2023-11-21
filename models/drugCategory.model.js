import { Schema, model } from "mongoose"

const DrugCategory = new Schema({
    name: {
        type: String,
        unique: [true, "drug category already exists"],
        required: [true, "Please add a name to continue"]
    },
    description:{
        type: String,

    }
})

DrugCategory.statics.createCategory = async function(name, description) {
    try{
        const newCategory = await this.create({ name, description });
        return newCategory
    }
    catch(error){
        return error
    }
}
DrugCategory.statics.getAllCategories = async function(){
    try{
        const allCategory = await this.find()
        return allCategory
    }
    catch(error){
        return error
    }
}
DrugCategory.statics.getCategory = async function(id){
    try{
        const category = await this.findById(id)
        return category
    }
    catch(error){
        return error
    }
}

DrugCategory.statics.editcategory = async function(id, updatedValues){
    try{
        const newUpdate = await this.findByIdAndUpdate(id, updatedValues)
        return newUpdate
    }
    catch(error){
        return error
    }
}
export default model("DrugCategory", DrugCategory)