import dispatchedModel from "../models/dispatched.model.js";

export default{
    CreateDispatched: async function(req, res) {
        const { inventory, quantity, client} = req.body
        if(inventory && client && quantity){
            try{
                const newDispatched = await dispatchedModel.CreateDispatched(inventory, quantity, client)
                return res.status(201).json({ success: true, data: newDispatched})
            }
            catch(err){ 
                return res.status(500).json({ success: false, error: err.message})

            }
        }
    },
    GetAllDispatched: async function(req, res){
        try{
            const allDispatched = await dispatchedModel.GetAllDispatched;
            return res.status(200).json({ success: true, data:allDispatched})
        }
        catch(err){
            res.status(500).json({ success: false, error: err.message})
        }
    },
    GetDispatchedByCustomer: async function(req, res){
        try{
            const { customerId } = req.body
            const customerdispatched = await dispatchedModel.GetDispatchedByCustomer(customerId)
            return res.status(200).json({ success: true, data: customerdispatched })
        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    GetDispatchedByInventory: async function (req, res) {
        try {
            const { inventoryId } = req.body
            const inventorydispatched = await dispatchedModel.GetDispatchedByCustomer(inventoryId)
            return res.status(200).json({ success: true, data:inventorydispatched })
        }
        catch (err) {
            return res.status(500).json({ success: false, error: err.message })
        }
    },
    GetSingleDispatchItem: async function (req, res) {
        try{
            const { id } = req.params
            const dispatched = await dispatchedModel.GetSingleDispatched(id)
            return res.status(200).json({ success: true, data: dispatched })
        }
        catch(error){
            return res.status(500).json({ success: false, error: err.message})
        }
    },
    EditDispatched: async function(req, res){
        try{
            const { id } = req.params
            const { quantity } = req.body
            const editedItem = await dispatchedModel.EditDispatchedDrug(id, quantity)
            return res.status(200).json({ success: true, data: editedItem})

        }
        catch(err){
            return res.status(500).json({ success: false, error: err.message})
        }
    }
}