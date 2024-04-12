const mongoose =require('mongoose')
const router = require('../routers/other')

const otherSchema = new mongoose.Schema({

    parts:{
        type:String,
        required:true
    },
    bill:{
        type:String,
        required:true
    },

    amount:{
        type:String,
        required:true
    },
    tax:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }


})

module.exports = mongoose.model('Other',otherSchema)
