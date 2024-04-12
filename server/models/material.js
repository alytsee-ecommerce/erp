const mongoose =require('mongoose')
const router = require('../routers/material')

const materialSchema = new mongoose.Schema({
    material:{
        type:String,
        required:true
    },
    vendor:{
        type:String,
        required:true
    },
    deduct:{
        type:Number,
        required:true
    },
    buying:{
        type:Number,
        required:true
    }

})

module.exports = mongoose.model('Material',materialSchema)
