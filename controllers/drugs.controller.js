import Drugs from "../models/drug.model.js"


export default{
    CreateDrug: async function(req,res){
        const {
            categoryId, productId, drugName, scientificName, reOrderLevel,
            drugDescription, treatmentUsedFor, packageType, noInPackage
        } = req.body
 
        try{
            const drugs = await Drugs.createDrug(
                categoryId, productId, drugName, scientificName, reOrderLevel,
                drugDescription, treatmentUsedFor, packageType, noInPackage
            )
            return res.status(201).json({ success: true, data: drugs})
        }catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    EditDrug: async function(req, res){
        const { id } = req.params
        try{
            const data = await Drugs.editDrug(id)
            return res.status(200).json({ success:true, data})
        }
        catch(err){
            return res.status(500).json({ success:false, error: err.message})
        }
    },
    GetSingleDrug: async function(req, res){
        const { id } = req.params
        try{
            const drugs = await Drugs.getSingleDrug(id)
            return res.status(200).json({ success: true, data: drugs})
        
        }
        catch(err){
            return res.status(500).json({success: false, error: err.message})
        }
    },
    GetAllDrugs: async function(req, res){
        try{
            const alldrugs = await Drugs.getAllDrugs()
            return res.status(200).json({ success: true, data: alldrugs})
        }
        catch(error){
            return res.status(500).json({success: false, error: error.message})
        }
    },
    DeleteDrug: async function(req, res){
        const { id } = req.params
        try{
            const drugs = await Drugs.deleteDrug(id)
            return res.status(200).json({ success: true, data: drugs})
        }
        catch(err){
            return res.status(500).json({success: false, error: err.message})
        }
    }
}