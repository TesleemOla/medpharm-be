import DrugCategory from "../models/drugCategory.model.js"


export default{
    CreateCategory: async function(req, res){
        const { name, description } = req.body
        try{
            DrugCategory.createCategory(name, description)
            .then(resp=> res.status(201).json({ success: true, data: resp }))
            .catch(err=> res.status(400).json({ success: false, error: err}))
        }
        catch(error){
            return res.status(500).json({ success: false, error: error.message})
        }
    },
    GetAllCategories: async function(req, res){
        try{
            DrugCategory.getAllCategories()
            .then(resp=> res.status(200).json({ success: true, data: resp.data }))
            .catch(err=> res.status(400).json({ success: false, error: err}))
        }
        catch(error){
            return res.status(500).json({success: false, error: error})
        }
    },
    GetSingleCategory: async function(req, res){
        const { id } = req.params
        try{
            DrugCategory.getCategory(id)
            .then(resp=> res.status(200).json({success: true, data: resp}))
            .catch(err=> res.status(500).json({success: false, error: err}))
        }
        catch(error){
            return res.status(500).json({success: false, error: error})
        }
    },
    EditCategory: async function(req, res){
        const { id } = req.params
        try{
            DrugCategory.editCategory(id)
            .then(resp=> res.status(200).json({success: true, data: resp}))
            .catch(err=> res.status(400).json({success: false, error: err}))
        }
        catch(error){
            return res.status(500).json({success: false, error:error})
        }
     }
}