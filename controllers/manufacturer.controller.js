import Manufacturer from "../models/manufacturers.model.js";

export default{
    GetAllManufacturers: async function(req, res){
        try{
        const manufacturers = await Manufacturer.getAllManufacturers()
        return res.status(200).json({ success: true, data: manufacturers })
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    GetSingleManufacturers: async function(req, res){
        try{
        const { id } = req.params
        const manufacturer = await Manufacturer.getSingleManufacturer(id)
        return res.status(200).json({success: true, data: manufacturer})
        }
        catch(err){
            return res.status(500).json({ message: "couldn't get single manufacturer", error: err.message})
        }
    },
    AddNewManufacturer: async function (req, res){
        console.log(req.body)
        try{
    
        const { name, phoneNumber, address} = req.body
        const newManufacturer = await Manufacturer.addNewManufacturer(name,phoneNumber, address)
        return res.status(201).json({ success: true, data: newManufacturer})
        }
        catch(error){
            return res.status(500).json({ message: "could not add new manufacturer", error: error.message})
        }
    },
    EditManufacturer: async function (req, res){
        try {
        const { id } = req.params
        const updateValues = req.body
        const editedManufacturer = await Manufacturer.editManufacturer(id, updateValues)
        return res.status(201).json({ success: true, data: editedManufacturer})
        }
        catch(error){
            return res.status(500).json({ message: "Could not edit manufacturer", error: error.message})
        }
    },
    DeleteManufacturer: async function(req, res){
        try{
        const { id } = req.params
        const deletedManufacturer = await Manufacturer.deleteManufacturer(id)
        return res.status(200).json({ success: true, data: deletedManufacturer})
        }
        catch(error){
            return res.status(500).json({message: "could not delete manufacturer", error: error.message})
        }
    }
}