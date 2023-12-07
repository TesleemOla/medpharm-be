import Suppliers from "../models/suppliers.model.js"

export default{
    CreateSupplier: async function(req, res){
        try{
            const { name, address, phoneNumber, userId} = req.body
            const addsupplier = await Suppliers.createSupplier(name, address, phoneNumber, userId)
            return res.status(201).json({ success: true, data: addsupplier})
        }
        catch(error){
            return res.status(500).json({success: false, error: error.message})
        }
    },
    GetAllSuppliers: async function(req, res){
        try{
            const allSuppliers = await Suppliers.getAllSuppliers()
            return res.status(200).json({ success: true, data: allSuppliers})
        }
        catch(error){
            return res.status(500).json({success: false, error: error.message})
        }
    },
    GetSingleSupplier: async function(req, res){
        try{
            const {id} = req.params
            const supplier = await Suppliers.getSingleSupplier(id)
            return res.status(200).json({success: true, data: supplier})
        }
        catch(err){
            return res.status(500).json({success: false, error: err.message})
        }
    },
    GetSupplierByName: async function(req, res){
        console.log(req.query)
        try{
            const { name } = req.query
            
            const supplier = await Suppliers.getSupplierByName(name)
            return res.status(200).json({ success: true, data: supplier})
        }
        catch(err){
            return res.status(500).json({success: false, error: err.message})
        }
    },
    EditSupplier: async function(req, res){
        try{
            const {id, updatedValues} = req.body
            const editedSupplier = await Suppliers.editSupplier(id, updatedValues)
            return res.status(200).json({ success: true, data: editedSupplier})
        }
        catch(err){
            return res.status(500).json({success: false, error: err.message})
        }
    },
    DeleteSupplier: async function(req, res){
        try{
            const { id} = req.params
            const deletedSupplier = await Suppliers.deletedSupplier(id)
            return res.status(200).jsom({ success: true, data: deletedSupplier})
        }
        catch(err) {
            return res.status(500).json({ success: false, error: err.message})
        }
    }
}