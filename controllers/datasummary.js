import Customer from "../models/customer.model.js"
import Dispatched from "../models/dispatched.model.js"
import Category from "../models/drugCategory.model.js"
import Drugs from "../models/drug.model.js"
import Inventory from "../models/inventory.model.js"
import Manufacturer from "../models/manufacturers.model.js"
import User from "../models/user.model.js"
import Supplier from "../models/suppliers.model.js"



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
            const suppliers = await Supplier.find().count()
            return res.status(200).json({success: true,data: {
                users,
                customers,
                manufacturers,
                inventory,
                drugs,
                dispatched,
                categories,
                suppliers
            }})

        } catch (error) {
            return res.status(500).json({ success: false, error: error.message })
        }
    },
    GetUserCountByType: async function(req, res){
        try {
            const users = await User.find()
            let bytype =[]
            users.forEach(item => !bytype.find(type=> item === type) && bytype.push(item.access))
            
            let obj = {}
            console.log(bytype)
            for(let i=0; i<bytype.length; i++){
                
                const numberofUsers = await User.find({ access: bytype[i]})
          
                obj ={...obj, [bytype[i]]: numberofUsers.length}
                
            }
             
            return res.status(200).json({ success: true, data: obj })
        }
        catch (err) {
            return res.status(500).json({ success: false, error: err.message })
        }
    },


    GetDrugsByCategories: async function(req, res) {
        try{
            const drugs = await Drugs.find()
            let byCategory = []
            let obj = {}
            drugs.forEach(drug=> byCategory.push(drug.categoryId))

            
            for(let i=0; i<byCategory.length; i++){
                
                const categoryname = (await Category.findById(byCategory[i])).name
                const catdrugs = await Drugs.GetDrugsByCategory(byCategory[i])

                obj = { ...obj, [categoryname]: catdrugs.length }
                
            }

            return res.status(200).json({ success: true, data: obj})
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message })
        }
    },
    GetDrugsByPackage: async function(req, res) {
        try {
            const drugs = await Drugs.find()
            let bypackage = []
            drugs.forEach(drug=> bypackage.push(drug.packageType))
            let obj = {}
            
            for(let i=0; i<bypackage.length; i++) {
                const nameofpackage = bypackage[i]
                const drugsinPackage = await Drugs.GetDrugsByPackagename(bypackage[i])
                obj = {...obj, [nameofpackage]: drugsinPackage.length }
            }
            return res.status(200).json({ success: true, data: obj })
        }
        catch (err) {
            return res.status(500).json({ success: false, error: err.message })
        }
    }

}