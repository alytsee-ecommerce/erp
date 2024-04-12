const mongoose =require('mongoose')
const router = require('../routers/vendors')

const perKGSchema = new mongoose.Schema({
    perkg:{
        type:Number
    }
})
module.exports = mongoose.model('PerKG',perKGSchema)