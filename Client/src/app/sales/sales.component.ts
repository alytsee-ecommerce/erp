import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesService } from '../services/sales.service';
import { VendorService } from '../services/vendor.service';
import { DatePipe } from '@angular/common';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [DatePipe]
})

export class SalesComponent implements OnInit {
  usedat=JSON.parse(localStorage.getItem("userData") || "[]");

  errmsg=''
  id='';
  salesData:any=[];
  curdate:any=null;
  ninemm=0;
  sixmm=0;
  update=false;
  search:any='';
  wgt=0;
  end=''
  tax=0
  srt=''
  Alltotal=0;
  paidtotal=0;
  Allwgt=0;
  total=0;
  amnt=0;
  a=0;
  data1:any=[]
  data2:any=[]
  dat:any='';
  curnMonth=''
  sub=false;
default="Unreceived"
  myDate :any= new Date();
    salesForm: FormGroup;
    salesFormSubmitted = false;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
    ngOnInit(): void {
      this.initialiseForm();
      this.getSalesData();
      this.amt();
      this.getUnpaidAmount();
      this.comp()

    }
    export(id:any,name:string){
      let element=document.getElementById(id)

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName=name+".xlsx"
    XLSX.writeFile(wb,fileName );
    }
    
    closeResult: string;
    
    constructor(private modalService: NgbModal,
      private service :SalesService,
      private service1 :VendorService,
      private fb: FormBuilder,
      private datePipe: DatePipe
      ) { this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');}
      get n() {
        return this.salesForm.controls;
      }
      initialiseForm() {
        this.salesForm = this.fb.group({
          date:["",[Validators.required]],
          company:["",[Validators.required]],
          inv:["",[Validators.required]],
          dc:["",[Validators.required]],
          item:["",[Validators.required]],
          brqt:["",[Validators.required]],
          weight:["",[Validators.required]],
          lorry:[""],
          loading:[""],
          unloading:[""],
          amount:["",[Validators.required]],
          stats:[""],
          tax:[""],
          editedBy:[""],
    
    
        });
  
        this.salesFormSubmitted = false;
        this.wgt=0;
        this.amnt=0;
      }
      
    saveOrSubmitsalesForm( modal:any) {
  
   
      this.salesFormSubmitted = true;
      if (this.salesForm.invalid) {
        return false
      }
      this.salesForm.value.tax=this.tax
      this.salesForm.value.editedBy=this.usedat.userName
      this.service.postSalesData(this.salesForm.value).subscribe((data:any)=>{
        this.getUnpaidAmount()
        this. getSalesData();
        modal.dismiss('Cross click');
        this.salesForm.reset();
        this.initialiseForm();

      },(error) =>{(
        console.log('Error', error)        
      )}) 
      

    
    }
  

  getSalesData(){
    this.service.getSalesData().subscribe({
      next:(data: any) =>  this.salesData = data,
      error: (e) =>console.log('Error', e),
    }) 
  
   this.dat = new Date();
    
   this.curnMonth =( this.monthNames[this.dat.getMonth()]);
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

  
  editSalesForm(k:any){
    this.salesForm.patchValue({
      date :k.date,
      company : k.company,
      item : k.item,
      brqt : k.brqt,
      weight : k.weight,
      lorry : k.lorry,
      unloading:  k.unloading,
      inv : k.inv,
      dc : k.dc,
      editedBy:this.usedat.userName,
      loading:  k.loading,
      amount : k.amount,
      stats : k.stats
       
  });
  this.id=k._id;
  this.wgt=k.weight

  this.getamt()
  }

  editSales(id:any){
    this.service.editSalesData(id)
    .subscribe({
      next: (data:any) => this.editSalesForm(data),  
      error: (e) => console.error(e)
  })
   
  }
  
  updateSales(modal:any){
    this.errmsg='';
    this.salesFormSubmitted = true;
    if (this.salesForm.invalid) {
      return false
    }
    this.salesForm.value.tax=this.tax
      this.salesForm.value.editedBy=this.usedat.userName
    this.service.updateSalesData(this.id,this.salesForm.value).subscribe( (data:any) => {
      this.getUnpaidAmount()
      this.getSalesData();
  
    },(error) => ( 
      console.log("error",error),this.errmsg='Duplicate Data Found')
     
  )
  this.initialiseForm();
  
    modal.dismiss('Cross click');
  }
  
  deleteSalesData(id:any){
    this.service.deleteSalesData(id).subscribe({
      next:(data:any)=>
      this. getSalesData(),
    error:(e) =>
      console.log('Error', e)
    }) 
   
  }
  amt(){

    this.service1.getperkgData().subscribe({
      next:(data:any)=> this.a= data.map((obj:any) => obj.perkg),
      error:(e) =>console.log('Error', e)
 
    }) 
   // let data1 =this.amnt.map((obj:any) => obj.perkg);  
  }
  comp(){
    this.service1.getcompanyData().subscribe({
      next:(data:any)=> this.data1=data,
      error:(e) =>console.log('Error', e),
      complete:()=> this.data1.forEach((element:any) => {
        if(element.lorryno !=''){
        this.data2.push(element.lorryno)}
        
      })
 
    }) 
    
  }
  getamt(){
    this.amnt=0;
    let b=0
    const c:any=( 5/100)
    b= (this.wgt * this.a) ;
    this.tax=b*c;
  this.amnt = parseFloat( ((b+(b*c))).toFixed(2))
  
//  (this.wgt - (this.wgt * ( this.moist/100))) 
  }

  getUnpaidAmount(){
    this.total=0;
 
    this.service.getSalesData().subscribe({
 
      next:(data: any) =>   data. forEach((element:any) => {
      
       if(element.stats=="Unreceived" ){
        let  a= element.amount
        this.total=+this.total+ +a;
      
     }

     }),
      error: (e) =>console.log('Error', e),
    }) 
  }
 
  searchFn(srt:any,end:any){
    this.service.srchSalesData(srt,end).subscribe({
      next:(data: any) =>  this.salesData = data,
      error: (e) =>console.log('Error', e),
      complete: () => this.unpaid()
    })
    

    
}
unpaid(){ 
  this.total=0;
  this.paidtotal=0;
  this.salesData.forEach((element:any) => {
   
    if(element.stats=="Received" ){
      let  a= element.amount
      this.paidtotal=+this.paidtotal+ +a;
    
   }
      if(element.stats=="Unreceived"){
        let  a= element.amount
       this.total=+this.total+ +a;
       
        }

       
          let  b= element.weight
         this.Allwgt=+this.Allwgt+ +b;
         
          })


}

}
