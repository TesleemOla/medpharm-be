import CustomerModel from "../models/customer.model.js"


export default {
    GetAllCustomers: async function(req, res){
        try{
            const customers = await CustomerModel.findAllCustomers()
            return res.status(200).json({ success: true, data: customers})
        }
    
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    CreateCustomer: async function(req, res){
        try{
            const { customerName, contactEmail, phoneNumber, officeAddress, city, state, adminId } = req.body
            const newCustomer = await CustomerModel.createCustomer(customerName, contactEmail, phoneNumber, officeAddress, city, state, adminId)
            return res.status(201).json({ success: true, data: newCustomer})
            
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    GetSingleCustomer: async function(req, res){
        try{
            const {id} = req.params
            const customer = await CustomerModel.findSingleCustomer(id)
            return res.status(200).json({ success: true, data: customer})
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    GetCustomersByState: async function(req, res){
        console.log(req.query)
        try{            
            const { state } = req.query
            if(!state){
                const customers = await CustomerModel.findAllCustomers()
                return res.status(200).json({ success: true, data: customers})
            }else{
                const customers = await CustomerModel.findCustomersByState(state)
                return res.status(200).json({ success: true, data: customers})
            }
        }
        catch(err){
            return res.status(500).json({ success: false, err: err.message})
        }
    },
    GetCustomersByName: async function (req, res) {
        console.log(req.query)
        try {
            const { name } = req.query
            if (!name) {
                const customers = await CustomerModel.findAllCustomers()
                return res.status(200).json({ success: true, data: customers })
            } else {
                const customers = await CustomerModel.findCustomersByName(name)
                return res.status(200).json({ success: true, data: customers })
            }
        }
        catch (err) {
            return res.status(500).json({ success: false, err: err.message })
        }
    },
}