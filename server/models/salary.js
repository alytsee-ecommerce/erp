const mongoose =require('mongoose')
const router = require('../routers/salary')

const salarySchema = new mongoose.Schema({
    empName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    }
 


})

module.exports = mongoose.model('Salary',salarySchema)
