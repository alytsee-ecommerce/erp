const express =require('express')
//const mongoose =require ('mongoose')
const router = express.Router()
//const Users =require('../models/users')
var data1=''
const MongoClient = require('mongodb').MongoClient;
var url ='mongodb://localhost/alytsee';



router.get('/', async(req,res) => {
   try{
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("alytsee");
  dbo.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    data1=result;
     res.json(data1)
    db.close();
  });
});  
   }catch(err){
      res.send('Error'+err)
   }
  })

router.get('/:userName',async(req,res) => {
    try{
       
      MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var dbo = db.db("alytsee");
         var query = { userName:req.params.userName };
         dbo.collection("users").find(query).next( function(err, result) {
           if (err) throw err;
          var data=result;
           res.json(data)
           db.close();
         });
       });
    
    }catch(err){
       res.send('Error'+err)
    }
   })

/*router.post('/',async(req,res) =>{
    const users =new Users({
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        permission: req.body.permission,
        userName: req.body.userName,
        email: req.body.email,
        password:req.body.email,
        hireDate: req.body.hireDate
    })
 try{
    const a1 =await users.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})*/
router.post('/',async(req,res)=>{
   try{
MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("alytsee");
   var myobj = {  employeeId: req.body.employeeId,
      firstName: req.body.firstName,
     lastName:req.body.lastName,
     permission: req.body.permission,
     userName: req.body.userName,
     email: req.body.email,
     password: req.body.password,
      hireDate: req.body.hireDate,
      salary: req.body.salary,
      employment: req.body.employment,
      
   };
 dbo.collection("users").insertOne(myobj,  function(err, result) {
     if (err) throw err;
     
    // const a1 =await result.save()
       res.json(result)
     db.close();

   });
   
 });
}
catch(err){
    res.send('Error')
}
})
router.put('/:userName',async(req,res)=>{
   try{
MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("alytsee");
   var myquery = { userName:req.params.userName };
   var newvalues = { $set: {
      employeeId: req.body.employeeId,
         firstName: req.body.firstName,
      lastName:req.body.lastName,
     permission: req.body.permission,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  hireDate: req.body.hireDate,
  salary: req.body.salary  ,
  employment: req.body.employment         } };
   dbo.collection("users").updateOne(myquery, newvalues, function(err, result) {
     if (err) throw err;
     res.send(result)
     db.close();
   });
 });
}
catch(err){
    res.send('Error')
}
})
router.delete('/:userName',async(req,res)=>{
   try{
MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("alytsee");
   var myquery ={
      userName:req.params.userName
      } ;
   dbo.collection("users").deleteOne(myquery, function(err, obj) {
     if (err) throw err;
     db.close();
     res.send(obj)
   });
 });
}
catch(err){
    res.send('Error' +err)
}
})
/*router.put('/:id',async(req,res)=>{
    try{
    const users = await Users.findById(req.params.id)
    users.employeeId= req.body.employeeId,
    users.firstName= req.body.firstName,
    users.lastName=req.body.lastName,
    users.permission= req.body.permission,
    users.userName= req.body.userName,
    users.email= req.body.email,
    users.password= req.body.password,
    users.hireDate= req.body.hireDate
   const a1 =await users.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})*/
/*router.delete('/:id',async(req,res)=>{
    try{
    const users = await Users.findById(req.params.id)
    employeeId= req.body.employeeId,
    firstName= req.body.firstName,
    lastName=req.body.lastName,
    permission= req.body.permission,
    userName= req.body.userName,
    email= req.body.email,
    password= req.body.password,
    hireDate= req.body.hireDate
   const a1 =await users.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})*/

module.exports =router