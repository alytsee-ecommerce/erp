const mongoose =require('mongoose')
const router = require('../routers/main-cash')

const MaincashSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    parts:{
        type:String
    },
    amount:{
        type:Number
        
    },
    bill:{
        type:String,
        
    }

})


module.exports = mongoose.model('maincash',MaincashSchema)
