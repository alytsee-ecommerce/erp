const express =require('express')
const router = express.Router()
const Vend =require('../models/vendors')
const Perkilo =require('../models/perkilo')
const Company =require('../models/company')




router.get('/vendors', async(req,res) => {
 try{
    const vend = await Vend.find()
    res.json(vend)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/perKGs', async(req,res) => {
   try{
     
      const perkilo = await Perkilo.find()
      res.json(perkilo)
   }catch(err){
      res.send('Error'+err)
   }
  })
  router.get('/company', async(req,res) => {
   try{
     
      const compani = await Company.find()
      res.json(compani)
   }catch(err){
      res.send('Error'+err)
   }
  })

router.get('/vendors/:id',async(req,res) => {
    try{
       const vend = await Vend.findById(req.params.id)
       res.json(vend)
    }catch(err){
       res.send('Error'+err)
    }
   })
   router.get('/perKGs/:id',async(req,res) => {
      try{
         const perkilo = await Perkilo.findById(req.params.id)
         res.json(perkilo)
      }catch(err){
         res.send('Error'+err)
      }
     })
     router.get('/company/:id',async(req,res) => {
      try{
         const compani = await Company.findById(req.params.id)
         res.json(compani)
      }catch(err){
         res.send('Error'+err)
      }
     })
     router.post('/perKGs',async(req,res) =>{
      const perkilo =new Perkilo({
          perkg: req.body.perkg
      })
   try{
      const a1 =await perkilo.save()
      res.json(a1)
   }
   catch(err){
      res.send('Error'+err)
   }
  })
  router.post('/company',async(req,res) =>{
   const compani =new Company({
      
       company:req.body.company,
       lorryno:req.body.lorryno
   })
try{
   const a1 =await compani.save()
   res.json(a1)
}
catch(err){
   res.send('Error'+err)
}
})
router.post('/vendors',async(req,res) =>{
    const vend =new Vend({
        VendorName: req.body.VendorName

    })
 try{
    const a1 =await vend.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/vendors/:id',async(req,res)=>{
    try{
    const vend = await Vend.findById(req.params.id)
    vend.VendorName= req.body.VendorName

   const a1 =await vend.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.put('/perKGs/:id',async(req,res)=>{
   try{
   const perkilo = await Perkilo.findById(req.params.id)
   perkilo.perkg= req.body.perkg

  const a1 =await perkilo.save()
  res.json(a1)
   }
   catch(err){
       res.send('Error')
   }
})

router.put('/company/:id',async(req,res)=>{
   try{
   const compani = await Company.findById(req.params.id)
   compani.company=req.body.company
   compani.lorryno=req.body.lorryno

  const a1 =await compani.save()
  res.json(a1)
   }
   catch(err){
       res.send('Error')
   }
})
router.delete('/vendors/:id',async(req,res)=>{
    try{
    const vend = await Vend.findById(req.params.id)
    VendorName= req.body.VendorName
   const a1 =await vend.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})
router.delete('/perKGs/:id',async(req,res)=>{
   try{
   const perkilo = await Perkilo.findById(req.params.id)
   perkg= req.body.perkg
  const a1 =await perkilo.remove()
  res.json(a1)
   }
   catch(err){
       res.send('Error' +err)
   }
})
router.delete('/company/:id',async(req,res)=>{
   try{
   const compani = await Company.findById(req.params.id)
   company=req.body.company,
   lorryno=req.body.lorryno
  const a1 =await compani.remove()
  res.json(a1)
   }
   catch(err){
       res.send('Error' +err)
   }
})


module.exports =router