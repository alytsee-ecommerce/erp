const mongoose =require('mongoose')
const router = require('../routers/vehicleEx')

const vehicleSchema = new mongoose.Schema({
    vehicles:{
        type:String,
        required:true
    },
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

module.exports = mongoose.model('Vehicle',vehicleSchema)
