//var Users=require('./models/users')
//var userData=require('./models/login')
var userLogin=''
async function authUser( res,next) {
  
     try{
       console.log("from auth",userData)
          var username=userData.username;
         var password=userData.password;
         console.log("username",username,"password",password)
      if(!username){
         return res.status(400).json({error:"Please Fill The Data"})
      }
      
       userLogin = await Users.findOne({username,password});
        
      console.log(userLogin)
     
     if (!userLogin){
      return res.status(400).json({error:"user error"})
     }
     else{ 
       next()
      return (res,userLogin)
 
     }
      }catch(err){
       console.log("auth user err ",err)
 
        res.send('Error'+err)
      }
     
  
     
 
 }
 
 module.exports =userLogin;
 module.exports={
     authUser
 }
 