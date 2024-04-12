const mongoose =require('mongoose')
const router = require('../routers/cashbook')

const cashbookSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    Particulars:{
        type:String,
        required:true
    },
    drExpense:{
        type:Number,
        
    },
    crIncome:{
        type:Number,
        
    },
    Bill:{
        type:String,
        
    }

})


module.exports = mongoose.model('Cashbook',cashbookSchema)
