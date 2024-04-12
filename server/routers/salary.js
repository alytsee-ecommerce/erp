const express =require('express')
const router = express.Router()
const Salary =require('../models/salary')




router.get('/', async(req,res) => {
 try{
    const salary = await Salary.find().sort({date:-1})
    res.json(salary)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const salary = await Salary.findById(req.params.id)
       res.json(salary)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const salary =new Salary({
        empName: req.body.empName,
        date: req.body.date,
        amount: req.body.amount
    })
 try{
    const a1 =await salary.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:id',async(req,res)=>{
    try{
    const salary = await Salary.findById(req.params.id)
    salary.empName= req.body.empName,
    salary.date= req.body.date,
    salary.amount=req.body.amount


   const a1 =await salary.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const salary = await Salary.findById(req.params.id)
    empName= req.body.empName,
    date= req.body.date,
    amount=req.body.amount
   const a1 =await salary.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.get('/search/:key/:srt/:end', async(req,res) => {

   let salary =await Salary.find(
      {
      "$and": [
         {empName:{$regex:req.params.key}},
         {date: {$gte:(req.params.srt),
         $lte:(req.params.end)},
      }
   ]
   }
   ).sort({date:-1})
    res.send(salary);
  })
module.exports =router