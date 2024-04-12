const express =require('express')
const router = express.Router()
const Swamidas =require('../models/swamidasTx')



router.get('/srch/:srt/:end', async(req,res) => {

   let swamidas =await Swamidas.find(
      
            
         { MonthNyear: {$gte:(req.params.srt),
         $lte:(req.params.end)},
      }
   
   
   ).sort({ MonthNyear:-1})
    res.send(swamidas);
  })
router.get('/', async(req,res) => {
 try{
    const swamidas = await Swamidas.find()
    res.json(swamidas)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const swamidas = await Swamidas.findById(req.params.id)
       res.json(swamidas)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const swamidas =new Swamidas({
        MonthNyear: req.body.MonthNyear,
        amount: req.body.amount,
        vet: req.body.vet

    })
 try{
    const a1 =await swamidas.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:id',async(req,res)=>{
    try{
    const swamidas = await Swamidas.findById(req.params.id)
    swamidas.MonthNyear= req.body.MonthNyear,
    swamidas.amount=req.body.amount,
    swamidas.vet=req.body.vet

   const a1 =await swamidas.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const swamidas = await Swamidas.findById(req.params.id)
    MonthNyear= req.body.MonthNyear,
    amount=req.body.amount,
    vet=req.body.vet
   const a1 =await swamidas.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})

module.exports =router