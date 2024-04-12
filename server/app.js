const express =require('express')
const mongoose =require ('mongoose')
const {authUser}= require('./auth')
//main
const url ='mongodb+srv://AlytseeUser:Alytseeadmin@erpalytsee.qkwlpun.mongodb.net/?retryWrites=true&w=majority'
//local
//const url='mongodb://localhost/alytsee'
 //test
//const url='mongodb+srv://admin:Alytsee321@cluster0.gw2teuv.mongodb.net/?retryWrites=true&w=majority'

const cors = require('cors');
const app =express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open',() =>{
    console.log('connected.....')
})


app.use(express.json())
//app.use(authUser)
const attendanceRouter = require('./routers/attendance')
app.use('/api/attendance',attendanceRouter)

const usersRouter = require('./routers/users')
app.use('/api/users',usersRouter)

app.get('/api/home', (req, res) => {
  res.send('Welcome ');
  });
const rawmatRouter = require('./routers/rawmat')
app.use('/api/rawmat',rawmatRouter)

const salesRouter = require('./routers/sales')
app.use('/api/sales',salesRouter)

const cashbookRouter = require('./routers/cashbook')
app.use('/api/cashbook',cashbookRouter)

const maincashRouter = require('./routers/main-cash')
app.use('/api/Maincashbook',maincashRouter)

const fidaRouter = require('./routers/fida')
app.use('/api/fida',fidaRouter)

const salaryRouter = require('./routers/salary')
app.use('/api/salary',salaryRouter)

const meachinepartsRouter = require('./routers/meachineparts')
app.use('/api/meachineparts',meachinepartsRouter)

const storeRouter = require('./routers/store')
app.use('/api/store',storeRouter)


const vehicleRouter = require('./routers/vehicleEx')
app.use('/api/vehicle',vehicleRouter)

const otherRouter = require('./routers/other')
app.use('/api/other',otherRouter)

const swamidasRouter = require('./routers/swamidasTx')
app.use('/api/swamidas',swamidasRouter)

const vendorsRouter = require('./routers/vendors')
app.use('/api',vendorsRouter)

const perKGRouter = require('./routers/vendors')
app.use('/api',perKGRouter)

const materialRouter = require('./routers/material')
app.use('/api/material',materialRouter)

const loginRouter = require('./routers/login')
app.use('/api/login',loginRouter)




//Front-end route

app.use(express.static('erp'));
app.get('/home', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/users', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });

  app.get('/raw-material', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/sales', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/cash-book', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/diesel', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/salary-advance', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/vehicle-expense', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/other-expense', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/machine-parts-change', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/tax', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/vendor', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });

  app.get('/material', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });
  app.get('/attendance', (req,res) => {
    res.sendFile(process.cwd()+"/erp/index.html")
  });

  //port
app.listen(port, () =>{
    console.log('server started')
})


