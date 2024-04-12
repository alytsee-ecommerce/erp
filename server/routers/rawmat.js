const { response } = require('express')
const express =require('express')
const router = express.Router()
const Rawmat =require('../models/rawmat')
const {authUser}= require('../auth')


router.get('/search/:key', async(req,res) => {

   let rawmat =await Rawmat.find(
      {
       "$or":[
    
         {stats:{$regex:req.params.key}}
       ]
      }
   )
    res.send(rawmat);
  })
  router.get('/srch/:key/:key2/:srt/:end', async(req,res) => {

   let rawmat =await Rawmat.find(
      {
      "$and": [
         {suplier:{$regex:req.params.key}},
         {material:{$regex:req.params.key2}},
         {date: {$gte:(req.params.srt),
         $lte:(req.params.end)},
      }
   ]
   }
   ).sort({date:-1})
    res.send(rawmat);
  })
  router.get('/srch1/:key2/:srt/:end', async(req,res) => {

   let rawmat =await Rawmat.find(
      {
      "$and": [
         {material:{$regex:req.params.key2}},
         {date: {$gte:(req.params.srt),
         $lte:(req.params.end)},
      }
   ]
   }
   ).sort({date:-1})
    res.send(rawmat);
  })
 

router.get('/', async(req,res) => {
 try{
    const rawmat = await Rawmat.find().sort({date:-1})
    res.json(rawmat)
 }catch(err){
    res.send('Error'+err)
 }
})

router.get('/material/:key', async(req,res) => {
   try{
      const rawmat = await Rawmat.find(
         {
            "$or":[
               {material:{$regex:req.params.key}}
            ]
           }
      ).sort({date:-1})
      res.json(rawmat)
   }catch(err){
      res.send('Error'+err)
   }
  })
  

router.get('/:id',async(req,res) => {
    try{
       const rawmat = await Rawmat.findById(req.params.id)
       res.json(rawmat)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
   const verify = await Rawmat.findOne({slNoA:req.body.slNoA});
   if (verify==null || verify==''){ 
    const rawmat =new Rawmat({
        date: req.body.date,
        suplier: req.body.suplier,
        material: req.body.material,
        amot: req.body.amot,
        weight: req.body.weight,
        units: req.body.units,
        sp:req.body.sp,
        moisture: req.body.moisture,
        fwt:(Math.round( req.body.fwt * 100) / 100).toFixed(2),
        slNoA: req.body.slNoA,
        stats: req.body.stats,
        lorry:req.body.lorry,
        verified:req.body.verified,
        editedBy:req.body.editedBy,
        editedTime:req.body.editedTime
        
    })
 try{
    const a1 =await rawmat.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }}
 else{
   return res.status(400).json({error:"Duplicate Data Found"})
 }
})

router.put('/:slNoA',async(req,res)=>{
    try{
    const rawmat = await Rawmat.findOne({slNoA:req.params.slNoA})
    rawmat.date= req.body.date,
    rawmat.suplier= req.body.suplier,
    rawmat.material=req.body.material,
    rawmat.weight= req.body.weight,
    rawmat.units= req.body.units,
    rawmat.sp= req.body.sp,
    rawmat.moisture= req.body.moisture,
    rawmat.fwt= (Math.round( req.body.fwt * 100) / 100).toFixed(2),
    rawmat.amot=req.body.amot,
    rawmat.slNoA=req.body.slNoA,
    rawmat.stats= req.body.stats,
    rawmat.lorry= req.body.lorry,
    rawmat.verified= req.body.verified,
    rawmat.editedBy=req.body.editedBy,
    rawmat.editedTime=req.body.editedTime

    
   const a1 =await rawmat.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const rawmat = await Rawmat.findById(req.params.id)
    date= req.body.date,
    suplier= req.body.suplier,
    material=req.body.material,
    weight= req.body.weight,
    units= req.body.units,
    sp= req.body.sp,
    moisture= req.body.moisture,
    fwt= req.body.fwt ,
    amot=req.body.amot,
    slNoA=req.body.slNoA,
    stats= req.body.stats,
    lorry= req.body.lorry,
    verified= req.body.verified,
    editedBy=req.body.editedBy,
    editedTime=req.body.editedTime
    
   const a1 =await rawmat.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})



module.exports =router