const mongoose =require('mongoose')
const router = require('../routers/store')

const storeSchema = new mongoose.Schema({
    part:{
        type:String,
        required:true
    },
    qn:{
        type:Number,
        required:true
    }


})

module.exports = mongoose.model('store',storeSchema)