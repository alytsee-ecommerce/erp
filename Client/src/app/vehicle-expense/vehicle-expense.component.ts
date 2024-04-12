import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleExService } from '../services/vehicle-ex.service';
import { MainCashbookService } from '../services/main-cashbook.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-vehicle-expense',
  templateUrl: './vehicle-expense.component.html',
  styleUrls: ['./vehicle-expense.component.css'],
  providers:[DatePipe]
})
export class VehicleExpenseComponent implements OnInit {
id='';
vehicleData:any=[];
update=false;
sub=false;
srt=''
end=''
Total=0;
  expenseForm: FormGroup;
  expenseFormSubmitted = false;

  ngOnInit(): void {
    this.initialiseForm();
    this.getVehicleData();
  }
    
  closeResult: string;
  
  constructor(private modalService: NgbModal,
    public datepipe: DatePipe,
    private service :VehicleExService,
    private service1 :MainCashbookService,
    private fb: FormBuilder,
    ) {}
    get n() {
      return this.expenseForm.controls;
    }
    initialiseForm() {
      this.expenseForm = this.fb.group({
        vehicles:["",[Validators.required]],
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
   
    this.service.postVehicleData(this.expenseForm.value).subscribe((data:any)=>{
      this. getVehicleData();

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


getVehicleData(){
  this.service.getVehicleData().subscribe({
    next:(data: any) =>  this.vehicleData = data,
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
  this.service.srchVehicleData(this.datepipe.transform(this.srt, 'yyyy-MM-dd'),this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe({
    next:(data: any) =>  this.vehicleData = data,
    error: (e) =>console.log('Error', e),
    complete:()=>(this.vehicleData.forEach((element:any )=> {
      
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


editVehicleForm(k:any){
  this.expenseForm.patchValue({
    vehicles :k.vehicles,
    parts : k.parts,
    bill :k.bill,
    tax :k.tax,
    amount:k.amount,
    date : k.date,
   
});
this.id=k.bill;

}
editVehicle(id:any){
  this.service.editVehicleData(id)
  .subscribe({
    next: (data:any) => this.editVehicleForm(data),  
    error: (e) => console.error(e),
    complete: () => console.info('complete') 
})
 
}

updateVehicle(modal:any){
  this.expenseFormSubmitted = true;
  if (this.expenseForm.invalid) {
    return false
  }
  this.service.updateVehicleData(this.id,this.expenseForm.value).subscribe( (data:any) => {console.log(data);
    this.getVehicleData();

  },(error) => console.error(error)
   
)
this.service1.updateCashbookData(this.id,this.expenseForm.value).subscribe( (data:any) => {;
},(error) => console.error(error)
   
)
this.initialiseForm();

  modal.dismiss('Cross click');
}

deleteVehicle(id:any){
  this.service.deleteVehicleData(id).subscribe({
    next:(data:any)=>
    this. getVehicleData(),
  error:(e) =>
    console.log('Error', e)
  }) 
 
}
}

