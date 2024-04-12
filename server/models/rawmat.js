const mongoose =require('mongoose')
const router = require('../routers/rawmat')

const rawmatSchema = new mongoose.Schema({
    date:{
        type:String,
       
    },
    suplier:{
        type:String,
       
    },
    material:{
        type:String,
       
    },
    weight:{
        type:Number,
       
    },
    units:{
        type:String,
       
    },
    sp:{
        type:Number,
       
    },
    moisture:{
        type:Number,
       
    },
    fwt:{
        type:Number,
       
    },
    amot:{
        type:String,
       
    },
    slNoA:{
        type:String,
       
    },
    stats:{
        type:String,
        required:false
    },
    lorry:{
        type:String,
        required:false
    },
    verified:{
        type:Boolean,
        
    },
    editedBy:{
        type:String,
        required:false
    },
    editedTime:{
        type:String,
        required:false
    }




})


module.exports = mongoose.model('Raw-materials',rawmatSchema)
