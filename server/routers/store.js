const express =require('express')
const router = express.Router()
const Store =require('../models/store')





router.get('/', async(req,res) => {
 try{
    const store = await Store.find()
    res.json(store)
 }catch(err){
    res.send('Error'+err)
 }
})
router.post('/',async(req,res) =>{
    const store =new Store({
        part:req.body.part,
        qn: req.body.qn
    })
 try{
    const a1 =await store.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})
module.exports =router