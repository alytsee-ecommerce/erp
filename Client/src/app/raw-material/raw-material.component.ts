import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RawmatService } from '../services/rawmat.service';
import { VendorService } from '../services/vendor.service';
import { MaterialService } from '../services/material.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { MainCashbookService } from '../services/main-cashbook.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {

    usedat=JSON.parse(localStorage.getItem("userData") || "[]");
    
    errmsg='';
    id='';
    
    update=false;
    sub=false;
    Data1:any=[]
    Data2:any=[]
    saw=false;
    om='';
    sw='SAW DUST'
    fw1='FireWood'
    default="Unpaid"
    matData:any=[];
    TotUnPaidAmount:any=[];
    matData1:any=[];
    deductData:any=[];
    wgt:any=null;
    suply:any=null;
    mat:any=null;
    selpri:any=null;
    amt:number=0;
    buy:number=0;
    total=0;
    paidtotal=0;
    Ftotal=0;
    paidFtotal=0;
    Alltotal=0;
    paidAlltotal=0;
    Allwgt=0;
    Swgt=0;
    Fwgt=0;
  swUnpaid:any = [];
    matUnpaid:any=[];
    moist:any=null;
    fw:any=null;
    search:any='';
    srt= '';
    end='';
    rmForm: FormGroup ;
    rmFormSubmitted = false;
   rmData:any=[];
   rmData1:any=[];
   rmData2:any=[];
   rmData3:any=[];
   materialData:any=[];
   vendorData:any=[];
   verified:boolean=false
   currentDateTime = new Date();

    ngOnInit(): void {
      this.RmData()
      this.initialiseForm();
      this.getRmData();
      this.getUnpaidAmount();
      this.getMaterialData();
      this.getVendorsData();
       

    }
      
    export(id:any,name:string){
      let element=document.getElementById(id)

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName=name+".xlsx"
    XLSX.writeFile(wb,fileName );
    }
    
    RmData(){
      this.service.RawmatData("CHEEVAL").subscribe({
        next:(data: any) =>  this.rmData1 = data,
        error: (e) =>console.log('Error', e)
      }) 
      this.service.RawmatData("SAW DUST").subscribe({
        next:(data: any) =>  this.rmData2 = data,
        error: (e) =>console.log('Error', e)
      }) 
      this.service.RawmatData("FireWood").subscribe({
        next:(data: any) =>  this.rmData3 = data,
        error: (e) =>console.log('Error', e)
      }) 
    }

    closeResult: string;
    
    constructor(private modalService: NgbModal,
      private service :RawmatService,
      private service2:VendorService,
      private service1 :MainCashbookService,
      private service3:MaterialService,
      private fb: FormBuilder,
      ) {}
      get n() {
        return this.rmForm.controls;
      }
      initialiseForm() {
    
        this.rmForm = this.fb.group({
          date:["",[Validators.required]],
          suplier:["",[Validators.required]],
          material:["",[Validators.required]],
          weight:["",[Validators.required]],
          units:["",[Validators.required]],
          moisture:[""],
          sp:[""],
          amot:[""],
          fwt:[""],
          slNoA:["",[Validators.required]],
          stats:[""],
          lorry:[""],
          verified:[""],
          editedBy:[""],
          editedTime:["" ],
          bill:[""],
          amount:[""],
          parts:[]
         
     
        });
  
        this.rmFormSubmitted = false;
      
      }
  
      getmoist(){
        this.fw =  (this.wgt - (this.wgt * ( this.moist/100))) ;
    
      }
      saveOrSubmitrmForm( modal:any) {
       
        this.rmFormSubmitted = true;
        if (this.rmForm.invalid) {
          return false
        }

       this.rmForm.value.editedBy=this.usedat.userName
       this.rmForm.value.editedTime= this.currentDateTime
        this.service.postRawmatData(this.rmForm.value).subscribe((data:any)=>{
          this. getRmData();
          this.RmData()
          this.getUnpaidAmount();
          this.rmForm.reset();
          this.initialiseForm();
      
              modal.dismiss('Cross click');
      
        },(error) =>{
          this.errmsg='Duplicate Data Found'
        }) 
        this.rmForm.value.bill=this.rmForm.value.slNoA
        this.rmForm.value.amount=this.rmForm.value.amot
        this.rmForm.value.parts="Raw-Material"
      

        this.service1.postCashbookData(this.rmForm.value).subscribe((data:any)=>{
        },(error) =>{
          console.log('Error', error);
        })

      }

      
    getRmData(){
      this.service.getRawmatData().subscribe({
        next:(data: any) =>  this.rmData = data,
        error: (e) =>console.log('Error', e)
      }) 
      
    }
   //
    getAllwgt(){
      this.Allwgt=0;
      this.Swgt=0;
      this.Fwgt=0;
      this.rmData1.forEach((element:any) => {

        let a=element.weight;
       this.Allwgt=+this.Allwgt+ +a;
      })
      this.rmData2.forEach((element:any) => {
        let  a= element.weight
     
       this.Swgt=+this.Swgt+ +a;
       
        })
        this.rmData3.forEach((element:any) => {
          let  a= element.weight
       
         this.Fwgt=+this.Fwgt+ +a;
         
          
        
      })

    }
  

    tabClick(event: MatTabChangeEvent) {
     
      this.search=null;
      this.srt='';
      this.end=''
      const tab = event.tab.textLabel;

      
     if(tab =="SawDust"){
      this.saw=true;
    
     }
     else{
      this.saw=false;
     }
     this.getRmData();
     
     this.getUnpaidAmount();
    }
  
    searchFn(search:any,key2:any,srt:any,end:any,id:number){
   
      this.total=0;
      this.paidAlltotal=0;
      this.paidtotal=0;
      this.paidFtotal=0;
      this.Alltotal=0;
      this.Allwgt=0;
      this.Swgt=0;
      this.Fwgt=0;
      this.Ftotal=0;
      
    if(search && key2 !=''){
      if(id==1){
        this.service.srchRawmatData(search,key2,srt,end).subscribe({
          next:(data: any) =>  this.rmData1 = data,
          error: (e) =>console.log('Error', e),
          complete:()=>(this.unpaid())
        })
      }
      if(id==2){
        this.service.srchRawmatData(search,key2,srt,end).subscribe({
          next:(data: any) =>  this.rmData2 = data,
          error: (e) =>console.log('Error', e),
          complete:()=>(this.unpaid())
        })
      }
      if(id==3){
        this.service.srchRawmatData(search,key2,srt,end).subscribe({
          next:(data: any) =>  this.rmData3 = data,
          error: (e) =>console.log('Error', e),
          complete:()=>(this.unpaid())
        })
      }

    }
    if(id==1){
      if(!!!search   ){
     
        this.service.srch1RawmatData(key2,srt,end).subscribe({
          next:(data: any) =>  this.rmData1 = data,
          error: (e) =>console.log('Error', e),
          complete:()=>(this.unpaid())
        })
      }
    }
    if(id==2){
      if(!!!search){
   
        this.service.srch1RawmatData(key2,srt,end).subscribe({
          next:(data: any) =>  this.rmData2 = data,
          error: (e) =>console.log('Error', e),
          complete:()=>(this.unpaid())
        })
      }
    }
    if(id==3){
      if(!!!search){
        this.service.srch1RawmatData(key2,srt,end).subscribe({
          next:(data: any) =>  this.rmData3 = data,
          error: (e) =>console.log('Error', e),
          complete:()=>(this.unpaid())
        })
      }
    }

    }
  
unpaid(){
  this.paidtotal=0;
  this.paidFtotal=0;
  this.paidAlltotal=0;
  this.Alltotal=0;
  this.total=0;
  this.Alltotal=0;
  this.Allwgt=0;
  this.Swgt=0;
  this.Fwgt=0;
  this.Ftotal=0;


    //-------------------sawdust-------------------------------------
  this.rmData2.forEach((element:any) => {

    let  a= element.weight
       
    this.Swgt=+this.Swgt+ +a;
    if(element.stats=="Unpaid" ){
    let  a= element.amot
 
   this.total=+this.total+ +a;
    }
    if(element.stats=="Paid" ){
      let  a= element.amot
   
     this.paidtotal=+this.paidtotal+ +a;
      }})
          //-------------------Firewood-------------------------------------
          
  this.rmData3.forEach((element:any) => {
      let  a1= element.weight
     this.Fwgt=+this.Fwgt+ +a1;

    if(element.stats=="Unpaid" ){
      let  a= element.amot
   
     this.Ftotal=+this.Ftotal+ +a;
     
      }
      if(element.stats=="Paid" ){
        let  a= element.amot
     
       this.paidFtotal=+this.paidFtotal+ +a;
       
        }
      })
        //---------------othermaterials-----------------
        
  this.rmData1.forEach((element:any) => {
    let  a2= element.weight
    this.Allwgt=+this.Allwgt+ +a2;
      if(element.stats=="Paid" ){
        let  a= element.amot
       this.paidAlltotal=+this.paidAlltotal+ +a;}
       if(element.stats=="Unpaid"){
        let  a= element.amot
       this.Alltotal=+this.Alltotal+ +a;}

      })
        
}



    getUnpaidAmount(){
      this.total=0;
      this.Ftotal=0;
      this.Alltotal=0;
     
      this.service.searchRawmatData("Unpaid").subscribe({
   
        next:(data: any) =>   data. forEach((element:any) => {
          if(element.material=="SAW DUST"){
          let  a= element.amot
         this.total=+this.total+ +a;}

         if(element.material=="FireWood"){
          let  a= element.amot
         this.Ftotal=+this.Ftotal+ +a;}
         if(element.material!=="FireWood" && element.material!=="SAW DUST" ){
          let  a= element.amot
         this.Alltotal=+this.Alltotal+ +a;


        }
       }),
        error: (e) =>console.log('Error', e),
      }) 
      

    }

  
    getVendorsData(){
      this.service2.getVendorsData().subscribe({
        next:(data: any) =>  this.vendorData = data,
        error: (e) =>console.log('Error', e),
      }) 

    }

      
  getMaterialData(){
    var data:any=[]
    this.service3.getMaterialData().subscribe({
      next:(data: any) =>  this.materialData = data ,
      error: (e) =>console.log('Error', e),
      complete:()=> { this.materialData.forEach((element:any )=> {
       
      data.push(element.material)
   
     
        
      });
      var arvalue='SAW DUST'
        this.Data1 = new Set(data);
    }
    }) 
   
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
  

  
  edit(k:any){
    this.rmForm.patchValue({
      date :k.date,
      suplier :k.suplier,
      material :k.material,
      weight :k.weight,
      units :k.units,
      moisture: k.moisture,
      amot: k.amot,
      sp:k.sp,
      slNoA: k.slNoA,
       stats : k.stats,
       lorry:k.lorry,
       verified:k.verified,
       editedBy:this.usedat.userName,
       editedTime: this.currentDateTime
  
    
  });

this.id=  k.slNoA;
}
getsuplier(){

  let data = (this.materialData).filter((x:any) =>x.material == this.mat );
  this.matData=data;  
}

getamt(){
  let data1 = (this.materialData).filter((x:any) =>x.vendor == this.suply && x.material == this.mat);

this.deductData=data1
const data =this.deductData.map((obj:any) => obj.deduct);
let t =this.deductData.map((obj:any) => obj.buying)
t.forEach((element:any) =>{
  this.buy =element

});
if(this.wgt!=null  ){
 let x =(this.wgt *this.buy );
 this.amt =parseFloat( (x-data).toFixed(2))
 //Number((Math.round( x-data)).toFixed(2));
}
}



editRmData(id:any){
  this.service.editRawmatData(id)
  .subscribe({
    next: (data:any) => this.edit(data),  
    error: (e) => console.error(e),
    complete: () => this.getsuplier()
})
 
}

updateRm(modal:any){
  this.errmsg=''
  this.rmFormSubmitted = true;
  if (this.rmForm.invalid) {
    return false
  }
  this.rmForm.value.editedTime= this.currentDateTime
  this.service.updateRawmatData(this.id,this.rmForm.value).subscribe( (data:any) => {
    this.getRmData();
    this.RmData()
    this.getUnpaidAmount();
    this.initialiseForm();
    modal.dismiss('Cross click');

  },(error) =>  this.errmsg='Duplicate Data Found'
   
)
this.rmForm.value.bill=this.rmForm.value.slNoA
this.rmForm.value.amount=this.rmForm.value.amot
this.rmForm.value.parts="Raw-Material"
this.service1.updateCashbookData(this.id,this.rmForm.value).subscribe( (data:any) => {;
},(error) => console.error(error)
   
)


 
}

deleteRm(id:any){
  this.service.deleteRawmatData(id).subscribe({
    next:(data:any)=>
    this.RmData(),
  error:(e) =>
    console.log('Error', e)
  }) 
 
}
  
    
updatebtn(){
  this.sub=false
  this.update =true
}
subbtn(){
     this.sub=true
    this. update =false
}

}
