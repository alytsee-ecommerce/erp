const mongoose =require('mongoose')
const router = require('../routers/vendors')

const companySchema = new mongoose.Schema({
    company:{
        type:String
    },
    lorryno:{
        type:String
    }
})
module.exports = mongoose.model('compani',companySchema)