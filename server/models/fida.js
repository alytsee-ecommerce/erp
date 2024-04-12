const mongoose =require('mongoose')
const router = require('../routers/fida')

const fidaSchema = new mongoose.Schema({
    lorry:{
        type:String,
        required:true
    },
    invoice:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    dcno:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    trip:{
        type:String,
        required:true
    },

    fidabill:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    stats:{
        type:String,
       
    }

})


module.exports = mongoose.model('Fida',fidaSchema)
