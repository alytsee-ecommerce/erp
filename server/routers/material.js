const express =require('express')
const router = express.Router()
const Mat =require('../models/material')




router.get('/', async(req,res) => {
 try{
    const mat = await Mat.find()
    res.json(mat)
 }catch(err){
    res.send('Error'+err)
 }
})

router.get('/:id',async(req,res) => {
    try{
       const mat = await Mat.findById(req.params.id)
       res.json(mat)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const mat =new Mat({
        vendor: req.body.vendor,
        material: req.body.material,
        deduct: req.body.deduct,
        buying: req.body.buying,


    })
 try{
    const a1 =await mat.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})

router.put('/:id',async(req,res)=>{
    try{
    const mat = await Mat.findById(req.params.id)
    mat.vendor= req.body.vendor,
    mat.material= req.body.material,
    mat.deduct= req.body.deduct,
    mat.buying= req.body.buying

   const a1 =await mat.save()
   res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const mat = await Mat.findById(req.params.id)
    vendor= req.body.vendor
    material= req.body.material,
    deduct= req.body.deduct,
    buying= req.body.buying
    
   const a1 =await mat.remove()
   res.json(a1)
    }
    catch(err){
        res.send('Error' +err)
    }
})

module.exports =router