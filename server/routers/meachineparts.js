const express =require('express')
const router = express.Router()
const Meachineparts =require('../models/meachineparts')





router.get('/', async(req,res) => {
 try{
    const meachineparts = await Meachineparts.find()
    res.json(meachineparts)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const meachineparts = await Meachineparts.findById(req.params.id)
       res.json(meachineparts)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const meachineparts =new Meachineparts({
        factory:req.body.factory,
        date: req.body.date,
        time: req.body.time
    })
 try{
    const a1 =await meachineparts.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:id',async(req,res)=>{
    try{
    const meachineparts = await Meachineparts.findById(req.params.id)
    meachineparts.factory= req.body.factory,
    meachineparts.date= req.body.date,
    meachineparts.time= req.body.time


   const a1 =await meachineparts.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const meachineparts = await Meachineparts.findById(req.params.id)
    factory= req.body.factory,
    date= req.body.date,
    time=req.body.time
   const a1 =await meachineparts.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.get('/factory/:key/:srt/:end', async(req,res) => {

   try{
      const meachineparts = await Meachineparts.find(
         {
            "$and":[
               {factory:{$regex:req.params.key}},
               {date: {$gte:(req.params.srt),
                  $lte:(req.params.end)}}
            ]
           }
      ).sort({date:-1})
      res.json(meachineparts)
   }catch(err){
      res.send('Error'+err)
   }
  })
  

module.exports =router