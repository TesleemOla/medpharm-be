import { Schema, model } from "mongoose";

const Customer = Schema({
    customerName:{
        type: String,
        required: true,


    },
    contactEmail:{
        type: String
    },
    
    phoneNumber:{
        type: String,
        required: true
    },
    officeAddress:{
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    adminId: {
       type: Schema.ObjectId(),
       ref: "user"
    }
})
export default model("Customer", Customer)

Customer.statics.create = async function (customerName, contactEmail, phoneNumber, officeAddress, city, state, adminId){
    try{
    const newCustomer = await this.create({
        customerName, contactEmail, phoneNumber, officeAddress, city, state, adminId
    })
    return newCustomer
    }
    catch(err){
        throw new Error(err)
    }
}

Customer.statics.findAllCustomers = async function(){
    try{
    const customers = await this.find()
    return customers
    }
    catch(err){
        throw new Error(err)
    }
}

Customer.statics.findSingleCustomer = async function(id){
    try{
        const customer = await this.findById(id)
        return customer
    }
    catch(err){
        throw new Error(err)
    }
}

Customer.statics.findCustomerByName = async function( query){
    try{
        const customer = await this.find({customerName:query})
        return customer
    }
    catch(err){
        throw new Error(err)
    }
}

Customer.statics.findCustomersByState= async function( state){
    try{
        const customers = await this.find({ state: state})
        return customers
    }
    catch(err){
        throw new Error(err)
    }
}
