const mongoose =require('mongoose')
const router = require('../routers/login')


const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
  //  saltSecret:string


});
/*loginSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(this.Password,salt,(err,hash) =>{
            this.Password =hash;
            this.saltSecret =salt;
            next();
        });
    });
});
*/
module.exports = mongoose.model('Login',loginSchema)
