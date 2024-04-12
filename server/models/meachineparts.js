const mongoose =require('mongoose')
const router = require('../routers/meachineparts')

const meachinepartsSchema = new mongoose.Schema({
    factory:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    }


})

module.exports = mongoose.model('Meachineparts',meachinepartsSchema)



