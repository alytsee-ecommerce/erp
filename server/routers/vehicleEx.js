const express =require('express')
const router = express.Router()
const Vehicle =require('../models/vehicleEx')




router.get('/', async(req,res) => {
 try{
    const vehicle = await Vehicle.find().sort({date:-1})
    res.json(vehicle)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const vehicle = await Vehicle.findById(req.params.id)
       res.json(vehicle)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const vehicle =new Vehicle({
        vehicles: req.body.vehicles,
        parts: req.body.parts,
        bill: req.body.bill,
        amount: req.body.amount,
        tax: req.body.tax,
        date: req.body.date
    })
 try{
    const a1 =await vehicle.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:bill',async(req,res)=>{
    try{
    const vehicle = await Vehicle.findOne({bill:req.params.bill})
    vehicle.vehicles= req.body.vehicles,
    vehicle.parts= req.body.parts,
    vehicle.bill= req.body.bill,
    vehicle.amount=req.body.amount,
    vehicle.tax=req.body.tax,
    vehicle.date=req.body.date

   const a1 =await vehicle.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const vehicle = await Vehicle.findById(req.params.id)
    vehicles= req.body.vehicles,
    parts= req.body.parts,
    bill= req.body.bill,
    amount= req.body.amount,
    tax= req.body.tax,
    date=req.body.date
   const a1 =await vehicle.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.get('/srch/:srt/:end', async(req,res) => {

   let vehicle =await Vehicle.find(

         {date: {$gte:(req.params.srt),
         $lte:(req.params.end)},
      
   }
   ).sort({date:-1})
    res.send(vehicle);
  })

module.exports =router