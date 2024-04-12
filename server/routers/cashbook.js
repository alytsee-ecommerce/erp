const express =require('express')
const router = express.Router()
const Cashbook =require('../models/cashbook')




router.get('/', async(req,res) => {
 try{
    const cashbook = await Cashbook.find().sort({date:-1})
    res.json(cashbook)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const cashbook = await Cashbook.findById(req.params.id)
       res.json(cashbook)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const cashbook =new Cashbook({
        date: req.body.date,
        Particulars: req.body.Particulars,
        drExpense: req.body.drExpense,
        crIncome: req.body.crIncome,
        Bill:req.body.Bill

    })
 try{
    const a1 =await cashbook.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:id',async(req,res)=>{
    try{
    const cashbook = await Cashbook.findById(req.params.id)
    cashbook.date= req.body.date,
    cashbook.Particulars= req.body.Particulars,
    cashbook.drExpense=req.body.drExpense,
    cashbook.crIncome= req.body.crIncome,
    cashbook.Bill=req.body.Bill
   const a1 =await cashbook.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const cashbook = await Cashbook.findById(req.params.id)
    date= req.body.date,
    Particulars= req.body.Particulars,
    drExpense=req.body.drExpense,
    crIncome= req.body.crIncome,
    Bill=req.body.Bill
   const a1 =await cashbook.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})

module.exports =router