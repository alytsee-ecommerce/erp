const mongoose =require('mongoose')
const router = require('../routers/swamidasTx')

const swamidasSchema = new mongoose.Schema({
    MonthNyear:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    vet:{
        type:Number,
        required:true
    }


})

module.exports = mongoose.model('SwamidasTx',swamidasSchema)
