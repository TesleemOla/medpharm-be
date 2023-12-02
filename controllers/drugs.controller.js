import Drugs from "../models/drug.model.js"

export default{
    CreateDrug: async function(req,res){
        const {
            categoryId, productId, drugName, scientificName, reOrderLevel,
            drugDescription, treatmentUsedFor, packageType, noInPackage
        } = req.body
        try{
            Drugs.createDrug({
                categoryId, productId, drugName, scientificName, reOrderLevel,
                drugDescription, treatmentUsedFor, packageType, noInPackage
            })
            .then(resp=> {
                if(resp.errors){
                    return res.status(400).json({success: false, errors: resp.errors})
                }
                return res.status(201).json({ success:true, data: resp})})
            .catch(err=> res.status(400).json({ success:false, error: err}))
        }catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    EditDrug: async function(req, res){
        const { id } = req.params
        try{
            Drugs.editDrug(id)
            .then(resp=> res.status(200).json({ success:true, data: resp.data}))
            .catch(err=> res.status(500).json({ success:false, error: err.message}))
        }
        catch(err){
            return res.status(500).json({ success:false, error: err.message})
        }
    },
    GetSingleDrug: async function(req, res){
        const { id } = req.params
        try{
            Drugs.getSingleDrug(id)
            .then(resp=> res.status(200).json({ success: true, data: resp}))
            .catch(err=> res.status(400).json({success: false, error: err.message}))
        }
        catch(err){
            return res.status(500).json({success: false, error: err.message})
        }
    },
    GetAllDrugs: async function(req, res){
        try{
            Drugs.getAllDrugs()
            .then(resp=> res.status(200).json({ success: true, data: resp}))
            .catch(err=> res.status(400).json({success: false, error: err.message}))
        }
        catch(error){
            return res.status(500).json({success: false, error: error.message})
        }
    },
    DeleteDrug: async function(req, res){
        const { id } = req.params
        try{
            Drugs.deleteDrug(id)
            .then(resp=> res.status(200).json({ success: true, data: resp}))
            .catch(err=> res.status(400).json({success: false, error: err.message}))
        }
        catch(err){
            return res.status(500).json({success: false, error: err.message})
        }
    }
}