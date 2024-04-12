import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwamidasTxService } from '../services/swamidas-tx.service';
import { SalesService } from '../services/sales.service';
import { VehicleExService } from '../services/vehicle-ex.service';
import { OtherExpencesService } from '../services/other-expences.service';
@Component({
  selector: 'app-swamidas-tax',
  templateUrl: './swamidas-tax.component.html',
  styleUrls: ['./swamidas-tax.component.css']
})
export class SwamidasTaxComponent implements OnInit {
  usedat=JSON.parse(localStorage.getItem("userData") || "[]");
id='';
swamidasData:any=[];
srt=''
tax=0
totTax=0
vechTax=0
otherTax=0
end=''
rawmatTax=0
TaxDr=0

update=false;
sub=false;
  taxForm: FormGroup;
  taxFormSubmitted = false;

  ngOnInit(): void {
    this.initialiseForm();
    this.getSwamidasData()
   
  }
    
  closeResult: string;
  
  constructor(private modalService: NgbModal,
    private service:SwamidasTxService,
    private service1:SalesService,
    private service2:VehicleExService,
    private service3: OtherExpencesService ,
    private fb: FormBuilder,
    ) {}
    get n() {
      return this.taxForm.controls;
    }
    initialiseForm() {
      this.taxForm = this.fb.group({
        MonthNyear:["",[Validators.required]],
        amount:["",[Validators.required]],
        vet:["",[Validators.required]]
      });

      this.taxFormSubmitted = false;
    }
    
  saveOrSubmittaxForm( modal:any) {
   
    this.taxFormSubmitted = true;
    if (this.taxForm.invalid) {
      return false
    }
   
    this.service.postSwamidasData(this.taxForm.value).subscribe((data:any)=>{
     
  
    },(error) =>{
      console.log('Error', error);
    }) 
   
      this.taxForm.reset();
this.initialiseForm();
    modal.dismiss('Cross click');
  }


getSwamidasData(){
  this.service.getSwamidasData().subscribe({
    next:(data: any) =>  this.swamidasData = data,
    error: (e) =>console.log('Error', e),
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

searchFn(srt:any,end:any){
  
  this.tax=0
  this.service1.srch1SalesData(srt,end).subscribe({
    next:(data: any) => (  data.forEach((element:any) => {
   
     this.tax =this.tax+ +element.tax
    }) ),
    error: (e:any) =>console.log('Error', e),
    complete: ()=>this.searchFn1(srt,end)

  })
  
}
searchFn1(srt:any,end:any){
  
  this.TaxDr=0
  this.vechTax=0
  this.otherTax=0
  this.rawmatTax=0
  this.service.srchTaxData(srt,end).subscribe({
    next:(data: any) => (  data.forEach((element:any) => {
      this.rawmatTax=this.rawmatTax+ +element.amount
    }) ,
    this.service2.srchVehicleData(srt,end).subscribe({
      next:(data1: any) => (  data1.forEach((element:any) => {
     this.vechTax= this.vechTax+ +element.tax
     
       
      }) ),
      error: (e:any) =>console.log('Error', e)

  
    }),
    this.service3.srchOtherData(srt,end).subscribe({
      next:(data2: any) => (  data2.forEach((element:any) => {
     this.otherTax= this.otherTax+ +element.tax
      
      }) ),
      error: (e:any) =>console.log('Error', e)

  
    })
    
    ),
    error: (e:any) =>console.log('Error', e),
    complete: ()=>(  setTimeout(() => { 
      this.TaxDr =this.rawmatTax+ this.otherTax+ this.vechTax,
   this.totTax= this.tax-this.TaxDr
   },2000))

  })
  
}

editSwamidasForm(k:any){
  this.taxForm.patchValue({
    MonthNyear :k.MonthNyear,
    amount : k.amount,
    vet: k.vet
});
this.id=k._id;

}
editSwamidas(id:any){
  this.service.editSwamidasData(id)
  .subscribe({
    next: (data:any) => this.editSwamidasForm(data),  
    error: (e) => console.error(e),
    complete: () => console.info('complete') 
})
 
}

updateSwamidas(modal:any){
  this.taxFormSubmitted = true;
  if (this.taxForm.invalid) {
    return false
  }
  this.service.updateSwamidasData(this.id,this.taxForm.value).subscribe( (data:any) => {console.log(data);
    this.getSwamidasData();

  },(error) => console.error(error)
   
)
this.initialiseForm();

  modal.dismiss('Cross click');
}

deleteSwamidasData(id:any){
  this.service.deleteSwamidasData(id).subscribe({
    next:(data:any)=>
    this. getSwamidasData(),
  error:(e) =>
    console.log('Error', e)
  }) 
 
}

}
