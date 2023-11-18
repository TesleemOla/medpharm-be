import Manufacturer from "../models/manufacturers.model.js";

export default{
    GetAllManufacturers: async function(req, res){
        const manufacturers = Manufacturer.GetAllManufacturers()
        return res.status(200).json({ success: true, data: manufacturers })
    },
    GetSingleManufacturers: async function(req, res){
        const { id } = req.params
        const manufacturer = Manufacturer.GetSingleManufacturer(id)
        return res.status(200).json({success: true, data: manufacturer})
    },
    AddNewManufacturer: function (req, res){
        const { name, phoneNumber, address} = req.body
        const newManufacturer = Manufacturer.addNewManufacturer(name,phoneNumber, address)
        return res.status(201).json({ success: true, data: newManufacturer})
    },
    EditManufacturer: function (req, res){
        const { id } = req.params
        const updateValues = req.body
        const editedManufacturer = Manufacturer.EditManufacturer(id, updateValues)
        return res.status(201).json({ success: true, data: editedManufacturer})
    },
    DeleteManufacturer: function(req, res){
        const { id } = req.params
        const deletedManufacturer = Manufacturer.DeleteManufacturer(id)
        return res.status(200).json({ success: true, data: deletedManufacturer})
    }
}