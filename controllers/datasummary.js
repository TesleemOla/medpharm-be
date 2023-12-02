import Customer from "../models/customer.model.js"
import Dispatched from "../models/dispatched.model.js"
import Category from "../models/drugCategory.model.js"
import Drugs from "../models/drug.model.js"
import Inventory from "../models/inventory.model.js"
import Manufacturer from "../models/manufacturers.model.js"
import User from "../models/user.model.js"
export default{
    GetCounts: async function(req, res){
        try {
            const customers = await Customer.find().count()
            const manufacturers = await Manufacturer.find().count()
            const inventory = await Inventory.find().count()
            const drugs = await Drugs.find().count()
            const dispatched = await Dispatched.find().count()
            const categories = await Category.find().count()
            const users = await User.find().count()
            return res.status(200).json({success: true,data: {
                users,
                customers,
                manufacturers,
                inventory,
                drugs,
                dispatched,
                categories
            }})

        } catch (error) {
            return res.status(500).json({ success: false, error: error.message })
        }
    },
    GetUserCountByType: async function(req, res){
        try {
            const users = await User.find()
            const bytype = new Set([users.forEach(item => item.access)])
            const obj = {}
            bytype.forEach(item => {
                const arr = users.filter(drug => drug.access === item)
                obj[item] = arr
            })
            return res.status(200).json({ success: true, data: obj })
        }
        catch (err) {
            return res.status(500).json({ success: false, error: err.message })
        }
    },


    GetDrugsByCategories: async function(req, res) {
        try{
            const drugs = await Drugs.find()
            const bycategory = new Set([drugs.forEach(item=> item.categoryId)])
            const obj = {}
            bycategory.forEach(item=>{
                const arr = drugs.filter(drug=> drug.categoryId === item)
                obj[item] = arr
            })
            return res.status(200).json({ success: true, data: obj})
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message })
        }
    },
    GetDrugsByPackage: async function(req, res) {
        try {
            const drugs = await Drugs.find()
            const bypackage = new Set([drugs.forEach(item => item.packageType)])
            const obj = {}
            bypackage.forEach(item => {
                const arr = drugs.filter(drug => drug.packageType === item)
                obj[item] = arr
            })
            return res.status(200).json({ success: true, data: obj })
        }
        catch (err) {
            return res.status(500).json({ success: false, error: err.message })
        }
    }

}