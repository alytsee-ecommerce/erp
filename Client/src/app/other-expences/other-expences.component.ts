import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtherExpencesService } from '../services/other-expences.service';
import { MainCashbookService } from '../services/main-cashbook.service';
import { DatePipe } from '@angular/common';
providers:[DatePipe]
@Component({
  selector: 'app-other-expences',
  templateUrl: './other-expences.component.html',
  styleUrls: ['./other-expences.component.css'],
  providers:[DatePipe]
})
export class OtherExpencesComponent implements OnInit {

 
id='';
OtherData:any=[];
update=false;
sub=false;
srt=''
end=''
Total=0;
  expenseForm: FormGroup;
  expenseFormSubmitted = false;

  ngOnInit(): void {
    this.initialiseForm();
    this.getOtherData();
  }
    
  closeResult: string;
  
  constructor(private modalService: NgbModal,
    public datepipe: DatePipe,
    private service :OtherExpencesService,
    private service1 :MainCashbookService,
    private fb: FormBuilder,
    ) {}
    get n() {
      return this.expenseForm.controls;
    }
    initialiseForm() {
      this.expenseForm = this.fb.group({
        parts:["",[Validators.required]],
        bill:["",[Validators.required]],
        amount:["",[Validators.required]],
        tax:["",[Validators.required]],
        date:["",[Validators.required]],

      });

      this.expenseFormSubmitted = false;
    }
    
  saveOrSubmitexpenseForm( modal:any) {
   
    this.expenseFormSubmitted = true;
    if (this.expenseForm.invalid) {
      return false
    }
 
    this.service.postOtherData(this.expenseForm.value).subscribe((data:any)=>{
      this. getOtherData();
    },(error) =>{
      console.log('Error', error);
    }) 
    
    this.service1.postCashbookData(this.expenseForm.value).subscribe((data:any)=>{
    },(error) =>{
      console.log('Error', error);
    })
      this.expenseForm.reset();
this.initialiseForm();
    modal.dismiss('Cross click');
  }


getOtherData(){
  this.service.getOtherData().subscribe({
    next:(data: any) =>  this.OtherData = data,
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
srch(){
  this.Total=0
  this.service.srchOtherData(this.datepipe.transform(this.srt, 'yyyy-MM-dd'),this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe({
    next:(data: any) =>  this.OtherData = data,
    error: (e) =>console.log('Error', e),
    complete:()=>(this.OtherData.forEach((element:any )=> {
      
        this.Total=this.Total+ + element.amount
      
    }) )
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


displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];


editOtherForm(k:any){
  this.expenseForm.patchValue({
    parts : k.parts,
    bill :k.bill,
    tax :k.tax,
    amount:k.amount,
    date : k.date,
   
});
this.id=k.bill;

}
editOther(id:any){
  this.service.editOtherData(id)
  .subscribe({
    next: (data:any) => this.editOtherForm(data),  
    error: (e) => console.error(e),
    complete: () => console.info('complete') 
})
 
}

updateOther(modal:any){
  this.expenseFormSubmitted = true;
  if (this.expenseForm.invalid) {
    return false
  }
  alert(this.id)
  this.service.updateOtherData(this.id,this.expenseForm.value).subscribe( (data:any) => {
    this.getOtherData();

  },(error) => console.error(error)
   
)
this.service1.updateCashbookData(this.id,this.expenseForm.value).subscribe( (data:any) => {;
},(error) => console.error(error)
   
)
this.initialiseForm();

  modal.dismiss('Cross click');
}

deleteOther(id:any){
  this.service.deleteOtherData(id).subscribe({
    next:(data:any)=>
    this. getOtherData(),
  error:(e:any) =>
    console.log('Error', e)
  }) 
 
}
}


