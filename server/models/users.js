const mongoose =require('mongoose')
const router = require('../routers/users')

const usersSchema = new mongoose.Schema({
    employeeId:{
        type:String
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    permission:{
        type:String
    },
    userName:{
        type:String
    

    },
    email:{
        type:String
      
    },
    password:{
        type:String
    },
    hireDate:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    employment:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model('users',usersSchema)
