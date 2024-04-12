const mongoose =require('mongoose')
const router = require('../routers/attendance')

const attendanceSchema = new mongoose.Schema({
    date:{
        type:String },
    employeeId:{
        type:String
    },
    firstName:{
        type:String
    },
    value:{
       type:String
    },
    hour:{
     type:Number
    },
   employment:{
    type:String

    }
})
module.exports = mongoose.model('attendance',attendanceSchema)