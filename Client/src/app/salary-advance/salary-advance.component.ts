import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalaryService } from '../services/salary.service';
import { UserserviceService } from '../services/userservice.service';
@Component({
  selector: 'app-salary-advance',
  templateUrl: './salary-advance.component.html',
  styleUrls: ['./salary-advance.component.css']
})
export class SalaryAdvanceComponent implements OnInit {
  
  usedat=JSON.parse(localStorage.getItem("userData") || "[]");

id='';
salaryData:any=[];
userData:any=[];
srt='';
end='';
empN='';
Alltotal=0;
  update=false;
  sub=false;
    salaryForm: FormGroup;
    salaryFormSubmitted = false;
  
    ngOnInit(): void {
      this.initialiseForm();
      this.getSalaryData();
      this.getEmpName()
    }
      
    closeResult: string;
    
    constructor(private modalService: NgbModal,
      private service :SalaryService,
      private service1 :UserserviceService,
      private fb: FormBuilder,
      ) {}
      get n() {
        return this.salaryForm.controls;
      }
      initialiseForm() {
        this.salaryForm = this.fb.group({
          empName:["",[Validators.required]],
          date:["",[Validators.required]],
          amount:["",[Validators.required]]
        });
  
        this.salaryFormSubmitted = false;
      }
      getEmpName(){
        this.service1.getUserData().subscribe({
          next:(data: any) =>  this.userData = data,
          error: (e) =>console.log('Error', e),
        })

      }
    saveOrSubmitsalaryForm( modal:any) {
     
      this.salaryFormSubmitted = true;
      if (this.salaryForm.invalid) {
        return false
      }
    

      this.service.postSalaryData(this.salaryForm.value).subscribe((data:any)=>{
        this. getSalaryData();
   
      },(error) =>{
        console.log('Error', error);
      }) 
     
        this.salaryForm.reset();
  this.initialiseForm();
      modal.dismiss('Cross click');
    }
  
  
  getSalaryData(){
    this.service.getSalaryData().subscribe({
      next:(data: any) =>  this.salaryData = data,
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
searchFn(key:any,srt:any,end:any){
  this.service.searchSalaryData(key,srt,end).subscribe({
    next:(data: any) =>  this.salaryData = data,
    error: (e) =>console.log('Error', e),
    complete:()=>this.saladv()
  })
}
saladv(){

  this.salaryData.forEach((element:any) => {

    this.Alltotal=element.amount+ +this.Alltotal
  });
  

 
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




  editSalaryForm(k:any){
    this.salaryForm.patchValue({
      empName :k.empName,
      date : k.date,
      amount : k.amount,
  
  });
this.id=k._id;
  
  }

  editSalary(id:any){
    this.service.editSalaryData(id)
    .subscribe({
      next: (data:any) => this.editSalaryForm(data),  
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
   
  }
  
  updateSalary(modal:any){
    this.salaryFormSubmitted = true;
    if (this.salaryForm.invalid) {
      return false
    }
    this.service.updateSalaryData(this.id,this.salaryForm.value).subscribe( (data:any) => {console.log(data);
      this.getSalaryData();
  
    },(error) => console.error(error)
     
  )
  this.initialiseForm();
  
    modal.dismiss('Cross click');
  }
  
  deleteSalary(id:any){
    this.service.deleteSalaryData(id).subscribe({
      next:(data:any)=>
      this. getSalaryData(),
    error:(e) =>
      console.log('Error', e)
    }) 
   
}
}
