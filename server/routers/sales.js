const express =require('express')
const router = express.Router()
const Sales =require('../models/sales')



router.get('/', async(req,res) => {
 try{
    const sales = await Sales.find().sort({date:-1})
    res.json(sales)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const sales = await Sales.findById(req.params.id)
       res.json(sales)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
   const verify = await Sales.findOne({inv: req.body.inv});
   if (verify==null || verify==''){
    const sales =new Sales({
        date: req.body.date,
        company: req.body.company,
        item: req.body.item,
        weight: req.body.weight,
        lorry: req.body.lorry,
        unloading: req.body.unloading,
        inv: req.body.inv,
        dc: req.body.dc,
        loading: req.body.loading,
        amount: req.body.amount,
        stats: req.body.stats,
        tax: req.body.tax,
        brqt: req.body.brqt,
        editedBy:req.body.editedBy

    })
 try{
    const a1 =await sales.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }}
 else{
   return res.status(400).json({error:"Duplicate Data Found"})
 }
})

router.put('/:id',async(req,res)=>{
    try{
    const sales = await Sales.findById(req.params.id)
    sales.date= req.body.date,
    sales.company= req.body.company,
    sales.item=req.body.item,
    sales.weight= req.body.weight,
    sales.lorry= req.body.lorry,
    sales.unloading= req.body.unloading,
    sales.inv= req.body.inv,
    sales.dc=req.body.dc,
    sales.brqt= req.body.brqt,
    sales.loading= req.body.loading,
    sales.amount= req.body.amount,
    sales.stats= req.body.stats,
    sales.tax= req.body.tax,
    sales.editedBy=req.body.editedBy
   const a1 =await sales.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }

})
router.delete('/:id',async(req,res)=>{
    try{
    const sales = await Sales.findById(req.params.id)
    date= req.body.date,
    company= req.body.company,
    item=req.body.item,
    weight= req.body.weight,
    lorry= req.body.lorry,
    unloading= req.body.unloading
    inv= req.body.inv,
    dc= req.body.dc,
    brqt=req.body.brqt,
    loading= req.body.loading,
    amount= req.body.amount,
    stats= req.body.stats,
    tax= req.body.tax,
    editedBy=req.body.editedBy
   const a1 =await sales.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.get('/search/:key', async(req,res) => {

   let sales =await Sales.find(
      {
       "$or":[
         {date:{$regex:req.params.key}}
       ]
      }
   )
    res.send(sales);
  })
  router.get('/srch/:srt/:end', async(req,res) => {

   let sales =await Sales.find(

         {date: {$gte:(req.params.srt),
         $lte:(req.params.end)},
      
   }
   ).sort({date:-1})
    res.send(sales);
  })
  router.get('/srch1/:srt/:end', async(req,res) => {

   let sales =await Sales.find(
           
      {
         "$and": [
            {stats:"Received"},
            {date: {$gte:(req.params.srt),
            $lte:(req.params.end)},
         }
      ]
      }
   ).sort({date:-1})
    res.send(sales);
  })
  router.get('/srch2/:srt/:end', async(req,res) => {

   let sales =await Sales.find( 
      {date: {$gte:(req.params.srt),
         $lte:(req.params.end)},
      }
   ).sort({date:-1})
    res.send(sales);
  })
module.exports =router