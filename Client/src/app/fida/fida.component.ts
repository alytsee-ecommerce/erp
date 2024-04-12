import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FidaService } from '../services/fida.service';
import { VendorService } from '../services/vendor.service';
import { MainCashbookService } from '../services/main-cashbook.service';
@Component({
  selector: 'app-fida',
  templateUrl: './fida.component.html',
  styleUrls: ['./fida.component.css']
})
export class FidaComponent implements OnInit {
  usedat=JSON.parse(localStorage.getItem("userData") || "[]");
  id='';
  end=''
  srt=''
  trp='';
  lory='';
  statusval=''
  data2:any=[]
  total=0
  Alltotal=0

  fidaData:any=[];
update=false;
sub=false;
  fidaForm: FormGroup;
  fidaFormSubmitted = false;
data1:any=[];
  ngOnInit(): void {
    this.initialiseForm();
    this. getFidaData();
    this.comp();
    
  }
    
  closeResult: string;
  
  constructor(private modalService: NgbModal,
    private service :FidaService,
    private fb: FormBuilder,
    private service2 :MainCashbookService,
    private service1 :VendorService,
    ) {}
    get n() {
      return this.fidaForm.controls;
    }
    initialiseForm() {
      this.fidaForm = this.fb.group({
        invoice:["",[Validators.required]],
        token:["",[Validators.required]],
        dcno:["",[Validators.required]],
        amount:["",[Validators.required]],
        lorry:["",[Validators.required]],
        trip:["",Validators.required],
        fidabill:["",[Validators.required]],
        date:["",[Validators.required]],
        stats:["",[Validators.required]],
        bill:[""]
      });

      this.fidaFormSubmitted = false;
    }
    
  saveOrSubmitfidaForm( modal:any) {
   
    this.fidaFormSubmitted = true;
    if (this.fidaForm.invalid) {
      return false
    }
    
    this.service.postFidaData(this.fidaForm.value).subscribe((data:any)=>{
      this. getFidaData();

    },(error) =>{
      console.log('Error', error);
    }) 
    this.fidaForm.value.bill=this.fidaForm.value.dcno
    this.fidaForm.value.parts="Diesel-Expense"
    this.service2.postCashbookData(this.fidaForm.value).subscribe((data:any)=>{
    },(error) =>{
      console.log('Error', error);
    })
   
      this.fidaForm.reset();
this.initialiseForm();
    modal.dismiss('Cross click');
  }
  comp(){
    this.service1.getcompanyData().subscribe({
      next:(data2:any)=> this.data1=data2,
      error:(e) =>console.log('Error', e),
      complete:()=> this.data1.forEach((element:any) => {
        if(element.lorryno !=''){
        this.data2.push(element.lorryno)}
        
      })
 
    }) 
  }

getFidaData(){
  this.service.getFidaData().subscribe({
    next:(data: any) =>  this.fidaData = data,
    error: (e) =>console.log('Error', e),
    complete:() =>this.getunpaid()
  }) 

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

stat(){
  if(this.trp!='I'){
    this.statusval='NA'

  }
  else{
    this.statusval='Unpaid'
  }
}

editFidaForm(k:any){
  this.fidaForm.patchValue({
    invoice : k.invoice,
    token : k.token,
    dcno : k.dcno,
    amount : k.amount,
    lorry : k.lorry,
    trip:k.trip,
    fidabill : k.fidabill,
    date:k.date,
    stats:k.stats
    
});
this.id=k._id;
}

editFida(id:any){
  this.service.editFidaData(id)
  .subscribe({
    next: (data:any) => this.editFidaForm(data),  
    error: (e) => console.error(e),
    complete: () => console.info('complete') 
})
 
}

updateFida(modal:any){
  this.fidaFormSubmitted = true;
  if (this.fidaForm.invalid) {
    return false
  }
  this.service.updateFidaData(this.id,this.fidaForm.value).subscribe( (data:any) => {
    this.getFidaData();

  },(error) => console.error(error)
   
)
this.service2.updateCashbookData(this.id,this.fidaForm.value).subscribe( (data:any) => {;
},(error) => console.error(error)
   
)
this.initialiseForm();

  modal.dismiss('Cross click');
}

deleteFida(id:any){
  this.service.deleteFidaData(id).subscribe({
    next:(data:any)=>
    this. getFidaData(),
  error:(e) =>
    console.log('Error', e)
  }) 
 
}
searchFn(key:any,srt:any,end:any){
 
  this.service.srchFidaData(key,srt,end).subscribe({
    next:(data: any) =>  this.fidaData = data,
    error: (e) =>console.log('Error', e),
    complete:()=>this.unpaid()
  })
  

  
}
getunpaid(){ 
  this.total=0;
  this.fidaData.forEach((element:any) => {

      if(element.stats=="Unpaid"){
        let  a= element.amount
       this.total=+this.total+ +a;
       
        }
         
          })


}
unpaid(){ 
  this.total=0;
  this.Alltotal=0
  this.fidaData.forEach((element:any) => {
       let b=element.amount
       this.Alltotal=+this.Alltotal+ +b;

      if(element.stats=="Unpaid"){
        let  a= element.amount
       this.total=+this.total+ +a;
       
        }
         
          })


}

}