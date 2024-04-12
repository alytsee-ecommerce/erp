import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { AttendanceService } from '../services/attendance.service';
import { Employee } from '../employee';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, NgIfContext } from '@angular/common';
import { SalaryService } from '../services/salary.service';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers:[DatePipe]
})
export class AttendanceComponent implements OnInit {
  usedat=JSON.parse(localStorage.getItem("userData") || "[]");
  spin=false
  hour=10
userData:any=[]
userData1:any=[]
adminAttendance=false
permanent=0;
temp=0;
weekly=0;
searchData:any=[]
valid:any=[]
emp=''
salaryadv:any=[]
salaryadvance:any=[]
today:any=''
display=true
dat:any
present=''
totalsalary=0;
absent=''
objIndex:any=[]
date1:any=''
data:any=[]
data1:any=[]
data2:any=[]
sort1:any=[]
allData=[{employeeId:'',firstName:'',date:'',value:'',hour:0,employment:''}]
srt='09-01-2022'
end=''
er=false
tot=0
x=0
calc:any
prsnt:any=[]
tempPrsnt:any=[]
empId=''
employmt='';
updata:any=[]
empName=''
perdaySal=0
perdaysalary=0
sub=false
update=false
closeResult: string;
presentDay=0
submit=0
  
show = false;
fullScreen = true;
template = ``
  constructor(
    private modalService: NgbModal,
    private service:AttendanceService,
    public service1:UserserviceService,
    private service2:SalaryService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
 
    this.getEmployeeData()
   this.todaysDate()
   this.date();
   this.SuperAdminAtd()
   //this.search(this.srt,this.end)

    
    
  }

  SuperAdminAtd(){
    if( this.usedat.permission =='superadmin'){
    this.adminAttendance=true}
    if(this.usedat.permission =='admin'){
      this.getTimeDiff()
    }
  }
  getEmployeeData(){

    this.service1.getUserData().subscribe({
      next:(data: any) =>  ( data.forEach((element:any) => {
        if (element.permission!="superadmin"){
          
         this.userData.push(element)
        
        }
        
      })),
      error: (e) =>console.log('Error', e),
      complete :()=>
      this.userData.forEach((element:any) => {
        this.data2={date:'',employeeId:element.employeeId,employment:element.employment,firstName:element.firstName,value:'',hour:10}
        this.data1.push(this.data2)

      
      }  )
   

    }); 
   
  
    
   
    
    /* //
     
     this.objIndex = this.data1[0].findIndex(((obj:any) => obj.id == 100));

     //Log object to Console.
     console.log("Before update: ", this.data1[this.objIndex])
     
     //Update object's name property.
     this.data1[this.objIndex].name = "dev"
     
     //Log object to console again.
     console.log("After update: ", this.data1[this.objIndex])*/
  }

  val(i:number,value:string){
    this.submit=0
   this.show=false
    this.data =this.data1
  
    this.data1[i].value=value
    this.data1[i].date=this.dat

  
  
  
  // Array.prototype.push.apply(this.data)
   
     
    this.data1.forEach((element:any) => {
      if(element.value=='true' || element.value=='false'){
        this.submit= 1+ + this.submit
       }
       if( this.submit==((this.data1).length)){
        this.show=true
       }
       else{
        this.show=false
       }
    });
    

  }

senddata(){

  this.data =this.data1

  for( let i=0; i<=(((this.data).length)-1) ;i++){
    this.data[i].date=this.dat

   
  
  this.service.postAttendanceData(this.data[i]).subscribe({
  
  next:(data:any)=> console.log('from api'),
  error: (e) =>console.log('Error', e),
  complete:()=>this.date()
  

   } )
}

}
search(srt:any,end:any){
this.spin=true
  this.srt=srt;
  this.end=end
  this.service.srchAttendanceData(this.datepipe.transform(srt, 'MM-dd-yyyy'),this.datepipe.transform(end, 'MM-dd-yyyy')).subscribe({
  
    next:(data:any)=>(this.allData=data),
    error: (e) =>console.log('Error', e),
    complete:()=>(this.saladv(),setTimeout(() => { this.getsal()},3000),setTimeout(() => { this.totalsal()},3500))
    
  
     } )
}
saladv(){

  for(let k=0;k<=(((this.userData).length)-1) ;k++){
    this.x=0
    this.salaryadvance[k]={salary:0}
    this.service2.searchSalaryData((this.userData[k].firstName ) , this.datepipe.transform(this.srt, 'yyyy-MM-dd'),this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe({
  
      next:(data:any)=>this.salaryadv=data,
      error: (e) =>console.log('Error', e),
      complete: ()=>( this.salaryadv.forEach((element:any) =>{
        
        this.x= element.amount+ +this.x
        this.salaryadvance[k].salary=(this.x)
      
        }, this.x=0
         ) )
      
    
       } )}
}


 getsal (){ 
  this.prsnt=[]

  for(let k=0;k<=(((this.userData).length)-1) ;k++){

        this.presentDay=0
        this.perdaySal=0
        
       this. perdaysalary=(this.userData[k].salary)
      //  this.tot=(((this.allData).length)/((this.allData.firstName).length))
       this.perdaySal=((this.userData[k].salary)/10)
       
        this.calc=0;
        this.empName=''
        this.empId=''
        this.employmt=''
       
        
 
   this.allData.forEach((element:any) => {
 
     if(this.userData[k].firstName == element.firstName){
     
    this.empName=element.firstName
    this.empId=element.employeeId
    this.employmt=element.employment
     
    if(element.employment=="P"){
     
     if(element.value=='false'  ){
      var Psal= (this.userData[k].salary/26)
     
       this.calc=(Psal+this.calc)    
      
     }  
     else{
      this.presentDay=(1+ +this.presentDay)
     }
    }
    if(element.employment!="P"){
      if(element.value=='true'  ){
       
        this.calc=(element.hour+ +this.calc)    
        this.presentDay=(1+ +this.presentDay)
      }  
     }

   
   }

         
   }) ;
   if(this.userData[k].employment !="P"){
   this.prsnt.push({employeeId:this.empId ,firstName:this.empName,value:this.presentDay, hour:this.calc,perday: parseFloat( (this.perdaySal).toFixed(2)),employment:this.employmt,perdaysalary:this.perdaysalary,salaryAdvan:(0+this.salaryadvance[k].salary),salary:  parseFloat( ((this.perdaySal*this.calc)-this.salaryadvance[k].salary).toFixed(2)) }) ;
   }
   if(this.userData[k].employment =="P"){
    this.prsnt.push({employeeId:this.empId ,firstName:this.empName,value:this.presentDay, hour:0,perday: 0,employment:this.employmt,perdaysalary:0,salaryAdvan:(0+this.salaryadvance[k].salary),salary:  parseFloat( ((this.userData[k].salary)-(this.calc+this.salaryadvance[k].salary)).toFixed(2)) })  ;
  
   }
   setTimeout(() => {  this.sort1=this.prsnt ;this.spin=false;
  //  if(this.emp!=''){ console.log("emp",this.emp) this.sort()}

}, 400);}    

}

totalsal(){
  this.permanent=0;
  this.weekly=0;
  this.temp=0;
  this.totalsalary=0;

  
this.sort1.forEach((element:any) => {
  this.totalsalary=element.salary + +this.totalsalary

  if(element.employment=="P"){
    this.permanent=element.salary + +this.permanent


  }
  
  if(element.employment=="W"){
    this.weekly=element.salary + +this.weekly


  }
  if(element.employment=="T"){
    this.temp=element.salary + +this.temp


  }
  
  
});
}

sort(){
 this.sort1=[]
for (let l=0 ;l<=(((this.prsnt).length)-1); l++){

    if(this.emp ==this.prsnt[l].firstName  ) { this.sort1.push(this.prsnt[l]
     ) 
 
    }

else{

}


}
}


open(content:any) {

  this.modalService.open(content, {  size: 'lg', backdrop: 'static' ,
  ariaLabelledBy: 'update'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
   
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}


 todaysDate(){
   this.today = new Date();
var dd = String(this.today.getDate()).padStart(2, '0');
var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = this.today.getFullYear();

this.today = mm + '-' +dd + '-' + yyyy;

this.srt= mm+'-'+'01'+'-'+yyyy;
this.dat=this.today
this.end=this.today



 }
 date(){


  this.dat=this.datepipe.transform(this.dat, 'MM-dd-yyyy')
  this.display=true
  this.service. getAttendanceData(this.datepipe.transform(this.dat, 'MM-dd-yyyy')).subscribe({
    next:(data: any) =>  this.searchData = data,
    error: (e) =>console.log('Error', e),
   complete:()=>(this.date1= this.datepipe.transform(this.dat, 'MM-dd-yyyy'),this.searchData.forEach((elements:any)=>{
   this.valid=elements.value

  if( (this.valid).length!=0){
    this.display=false
    }
   else{
     this.display=true
    
   } 
  }
   
   ) )
  } )


}
change(value:string){
 this.present=value
}
updatebtn(){
  this.update=true
  if (this. sub== true){
    this. sub =false
  }
  
  }
  subbtn(){
  this.sub=true
  
    this. update =false
  
  
  }
  editAttendance(id:any){
    this.service.editAttendanceData(id)
    .subscribe({
      next: (data:any) => this.updata=data,  
      error: (e) => console.error(e),
      complete: () =>( this.present=this.updata.value,this.hour=this.updata.hour)
  })
   
  }

  getTimeDiff( )
  {
    this.adminAttendance=false
    var now = new Date();
    var time1 = "10:30 AM";
    var dt = (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + time1;
    var time2 = "8:00 AM";
    var dt2 = (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + time2;
    var userval = new Date(dt);
    var userval2 = new Date(dt2);
if (now < userval && now>userval2) {

  this.adminAttendance=true
   
}
else{
  this.adminAttendance=false
}
   }

  
  updateAttendance(modal:any){
    this.updata.value=this.present
    this.updata.hour=this.hour

console.log(this.updata)
    this.service.updateAttendanceData(this.updata._id,this.updata).subscribe( (data:any) => {
      this.date();
  
    },(error) => console.error(error)
     
  )

  
 
  }
  

}
