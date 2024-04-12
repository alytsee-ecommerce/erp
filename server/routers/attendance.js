const express =require('express')
const router = express.Router()
const Attendance =require('../models/attendance')




router.get('/', async(req,res) => {
 try{
    const attendance = await Attendance.find()
    res.json(attendance)
 }catch(err){
    res.send('Error'+err)
 }
})
router.get('/:id',async(req,res) => {
    try{
       const attendance = await Attendance.findById(req.params.id)
       res.json(attendance)
    }catch(err){
       res.send('Error'+err)
    }
   })
router.post('/',async(req,res) =>{
    const attendance =new Attendance({
        date: req.body.date,
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        value: req.body.value,
        hour:req.body.hour,
        employment:req.body.employment
        
    })
 try{
    const a1 =await attendance.save()
    res.json(a1)
 }
 catch(err){
    res.send('Error'+err)
 }
})
router.get('/search/:key', async(req,res) => {

    let attendance =await Attendance.find(
       {
        "$or":[
     
          { date:req.params.key}
        ]
       }
    )
     res.send(attendance);
    
   })

   router.get('/search/:srt/:end', async(req,res) => {

      let attendance =await Attendance.find(
         {
         "$and": [
           
            {date: {$gte:(req.params.srt),
            $lte:(req.params.end)},
         }
      ]
      }
      ).sort({date:-1})
       res.send(attendance);
      
     })
    
     router.get('/:id',async(req,res) => {
      try{
         const attendance = await Attendance.findById(req.params.id)
         res.json(attendance)
      }catch(err){
         res.send('Error'+err)
      }
     })

     router.put('/:id',async(req,res)=>{
      try{
      const attendance = await Attendance.findById(req.params.id)
      attendance.date= req.body.date,
      attendance.employeeId=req.body.employeeId,
      attendance.firstName=req.body.firstName,
      attendance.value= req.body.value
      attendance.hour= req.body.hour
      employment:req.body.employment
  
     const a1 =await attendance.save()
     res.json(a1)
      }
      catch(err){
          res.send('Error')
      }
  })
module.exports =router