import { Schema, Types, model } from "mongoose";

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
       type: Types.ObjectId,
       ref: "user"
    }
})


Customer.statics.createCustomer = async function (customerName, contactEmail, phoneNumber, officeAddress, city, state, adminId){
    try{
    const newCustomer = await this.create({
        customerName, contactEmail, phoneNumber, officeAddress, city, state, 
        adminId: new Types.ObjectId(adminId)
    })
    return newCustomer
    }
    catch(err){
        throw err
    }
}

Customer.statics.findAllCustomers = async function(){
    try{
    const customers = await this.find().populate("adminId")
    return customers
    }
    catch(err){
        throw err
    }
}

Customer.statics.findSingleCustomer = async function(id){
    try{
        const customer = await this.findById(id).populate("adminId")
        return customer
    }
    catch(err){
        throw err
    }
}

Customer.statics.findCustomerByName = async function( query){
    try{
        const customer = await this.find({customerName:query})
        return customer
    }
    catch(err){
        throw err
    }
}

Customer.statics.findCustomersByState= async function( state){
    try{
        const customers = await this.find({ state: state})
        return customers
    }
    catch(err){
        throw err
    }
}


export default model("Customer", Customer)