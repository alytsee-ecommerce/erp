import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UserserviceService} from '../services/userservice.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usedat=JSON.parse(localStorage.getItem("userData") || "[]");
  
userData :any= [];
id='';
update=false;
sub=false;
  userForm: FormGroup;
  userFormSubmitted = false;

  ngOnInit(): void {
    this.initialiseForm();
    this.getUserData();
  }
    
  closeResult: string;
  
  constructor(private modalService: NgbModal,
    private service :UserserviceService,
    private fb: FormBuilder,
    ) {}
    get n() {
      return this.userForm.controls;
    }
    initialiseForm() {
      this.userForm = this.fb.group({
  
       employeeId:[""],
       firstName:["",[Validators.required]],
       lastName:[""],
       permission:[""],
       userName:["",[Validators.required]],
       email:[""],
       password:[""],
       hireDate:[""],
       salary:["",[Validators.required]],
       employment:["",[Validators.required]]
      });

      this.userFormSubmitted = false;
    }


    saveOrSubmituserForm( modal:any) {
     
      this.userFormSubmitted = true;
      if (this.userForm.invalid) {
        return false
      }
     
      this.service.postUserData(this.userForm.value).subscribe((data:any)=>{
        this. getUserData();
      
      },(error) =>{
        console.log('Error', error);
      }) 
     
        this.userForm.reset();
  this.initialiseForm();
      modal.dismiss('Cross click');
    }
  

  getUserData(){
    this.service.getUserData().subscribe({
      next:(data: any) =>  this.userData = data,
      error: (e) =>console.log('Error', e)

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


editEmployee(k:any){
 
  this.userForm.patchValue({

  employeeId :k.employeeId,
firstName : k.firstName,
lastName : k.lastName,
  permission : k.permission,
  userName:k.userName,
  email : k.email,
  hireDate:  k.hireDate,
  password:k.password,
  salary:k.salary,
  employment:k.employment
  
});
this.id=k.userName;

}


editUserData(userName:any){
  this.service.editUserData(userName).subscribe({
    next: (data:any) => this.editEmployee(data),  
    error: (e) => console.error(e)
})
 
}

updateEmployee(modal:any){
  this.userFormSubmitted = true;
  if (this.userForm.invalid) {
    return false
  }
  this.service.updateUserData(this.id,this.userForm.value).subscribe( (data:any) => {
    this.getUserData();

  },(error) => console.error(error)
   
)
this.initialiseForm();

  modal.dismiss('Cross click');
}

deleteUserData(userName:any){
  this.service.deleteUserData(userName).subscribe({
    next:(data:any)=>
    this. getUserData(),
  error:(e) =>
    console.log('Error', e)
  }) 
 
}

}
