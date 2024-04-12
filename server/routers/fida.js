const express =require('express')
const router = express.Router()
const Fida =require('../models/fida')




router.get('/', async(req,res) => {
 try{
    const fida = await Fida.find().sort({date:-1})
    res.json(fida)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const fida = await Fida.findById(req.params.id)
       res.json(fida)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const fida =new Fida({
        invoice: req.body.invoice,
        token: req.body.token,
        dcno: req.body.dcno,
        amount: req.body.amount,
        lorry: req.body.lorry,
        trip: req.body.trip,
        fidabill: req.body.fidabill,
        date:req.body.date,
        stats:req.body.stats,
        
    })
 try{
    const a1 =await fida.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:id',async(req,res)=>{
    try{
    const fida = await Fida.findById(req.params.id)
    fida.invoice= req.body.invoice,
    fida.token=req.body.token,
    fida.dcno= req.body.dcno,
    fida.amount= req.body.amount
    fida.lorry= req.body.lorry,
    fida.trip= req.body.trip,
    fida.fidabill= req.body.fidabill,
    fida.date= req.body.date,
    fida.stats= req.body.stats

   const a1 =await fida.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const fida = await Fida.findById(req.params.id)
    invoice= req.body.invoice,
    token=req.body.token,
    dcno= req.body.dcno,
    amount= req.body.amount
    lorry= req.body.lorry,
    trip= req.body.trip,
    fidabill= req.body.fidabill,
    date= req.body.date,
    stats= req.body.stats

   const a1 =await fida.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.get('/srch/:key/:srt/:end', async(req,res) => {

   let fida =await Fida.find({
      "$and": [
      {lorry:{$regex:req.params.key}},
         {date: {$gte:(req.params.srt),
         $lte:(req.params.end)}
   }]}).sort({date:-1})
    res.send(fida);
  })

module.exports =router