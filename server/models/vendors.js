const mongoose =require('mongoose')
const router = require('../routers/vendors')


const vendorsSchema = new mongoose.Schema({
    VendorName:{
        type:String
    }
})
module.exports = mongoose.model('Vendors',vendorsSchema)



