const express =require('express')
const router = express.Router()
const Other =require('../models/other-expense')




router.get('/', async(req,res) => {
 try{
    const other = await Other.find().sort({date:-1})
    res.json(other)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const other = await Other.findById(req.params.id)
       res.json(other)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const other =new Other({
        parts: req.body.parts,
        bill: req.body.bill,
        amount: req.body.amount,
        tax: req.body.tax,
        date: req.body.date
    })
 try{
    const a1 =await other.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:bill',async(req,res)=>{
    try{
    const other = await Other.findOne({bill:req.params.bill})
    other.parts= req.body.parts,
    other.bill= req.body.bill,
    other.amount=req.body.amount,
    other.tax=req.body.tax,
    other.date=req.body.date

   const a1 =await other.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const other = await Other.findById(req.params.id)
    parts= req.body.parts,
    bill= req.body.bill,
    amount= req.body.amount,
    tax= req.body.tax,
    date=req.body.date
   const a1 =await other.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.get('/srch/:srt/:end', async(req,res) => {

    let other =await Other.find(
 
          {date: {$gte:(req.params.srt),
          $lte:(req.params.end)},
       
    }
    ).sort({date:-1})
     res.send(other);
   })
module.exports =router