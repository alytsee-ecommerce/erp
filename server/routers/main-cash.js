const express =require('express')
const router = express.Router()
const Maincash =require('../models/main-cash')




router.get('/', async(req,res) => {
 try{
    const maincash = await Maincash.find().sort({date:-1})
    res.json(maincash)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const maincash = await Maincash.findById(req.params.id)
       res.json(maincash)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const maincash =new Maincash({
        date: req.body.date,
        parts: req.body.parts,
        amount: req.body.amount,
        bill:req.body.bill

    })
 try{
    const a1 =await maincash.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:bill',async(req,res)=>{
    try{
    const maincash = await Maincash.findOne({bill:req.params.bill})
    maincash.date= req.body.date,
    maincash.parts= req.body.parts,
    maincash.amount=req.body.amount,
    maincash.bill=req.body.bill
   const a1 =await maincash.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const maincash = await Maincash.findById(req.params.id)
    date= req.body.date,
    parts= req.body.parts,
    amount=req.body.amount,
    bill=req.body.bill
   const a1 =await maincash.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.get('/srch/:srt/:end', async(req,res) => {

   let maincash =await Maincash.find(   
            {date: {$gte:(req.params.srt),
            $lte:(req.params.end)},
         }
      
      
   ).sort({date:-1})
    res.send(maincash);
  })

module.exports =router