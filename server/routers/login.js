const express =require('express')
const router = express.Router()
var Users=require('../models/users')




var userData='';
var userLogin=''
 router.post('/',async(req,res) =>{
   
    var log ={
        username: req.body.username,
        password: req.body.password
    }

 try{

     userData =await log
    
   let result=await  authUser(res,log)
 res.json(userLogin)
 }
 catch(err){
    res.send('Error'+err)
 }
})






async function authUser( res,next) {

    try{
         var username=userData.username;
        var password=userData.password;
   
     if(!username){
        return res.status(400).json({error:"Please Fill The Data"})
     }
     
      userLogin = await Users.findOne({userName:username,password:password});
       

    
    if (!userLogin){
     return res.status(400).json({error:"user error"})
    }
    else{ 
  next
  return (res,userLogin)
    }
     }catch(err){
      console.log("auth user err ",err)
      return(err,userLogin)

       // res.send('Error'+err)
     }
    
 
    

}


module.exports={
    authUser
}
module.exports =router
