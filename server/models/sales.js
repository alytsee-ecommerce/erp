const mongoose =require('mongoose')
const router = require('../routers/sales')

const salesSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    item:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    lorry:{
        type:String,
        required:true
    },
    unloading:{
        type:String,
       
    },
    inv:{
        type:String,
        required:true
    },
    dc:{
        type:String,
        required:true
    },
    brqt:{
        type:Number,
        required:true
    },
    loading:{
        type:String,
       
    },
    amount:{
        type:Number,
        required:true
    },
    stats:{
        type:String,
     
    },
    editedBy:{
        type:String,
        required:false
    },
   tax:{
    type:Number,
    required:true
    }


})


module.exports = mongoose.model('Sales',salesSchema)
