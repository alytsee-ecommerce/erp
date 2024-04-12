import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {AppComponent} from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]

})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormSubmitted=false;
   usedat:any=[]
  Data:any=[]


 er= ""
  constructor(
    private rout: Router,
    public service:LoginService,
    private fb: FormBuilder,
    private dat:AppComponent

    

  ) {   }





  ngOnInit(): void {
   
    this.initialiseForm();
    
  }
    
  public  saveData() {
    
    localStorage.setItem("userData",JSON.stringify( this.Data));
     this.usedat =JSON.parse(localStorage.getItem("userData") || "[]");
     this.usedat
     this.dat.useda=JSON.parse(localStorage.getItem("userData") || "[]");
     if(this.usedat==null){

      this.er='User Name or Password is wrong'
      setTimeout(()=>{                     
        this.er=''
      }, 3000);
    
    }
    else{
      this.rout.navigateByUrl("/home")
      
      
    }

  
  
  }
  get n() {
    return this.loginForm.controls;
  }
  initialiseForm() {
    
    this.loginForm = this.fb.group({
      username:["",[Validators.required]],
      password:["",[Validators.required]],

    });

    this.loginFormSubmitted = false;
  }

  login(){
    this.loginFormSubmitted = true;
    //this.rout.navigateByUrl("/home")

 if (this.loginForm.invalid  ) {
      return false;
    }
    
   
    this.service.postLoginData(this.loginForm.value).subscribe({
      next:(data: any,) =>  this.Data={'userName':data.userName,'permission':data.permission},
      error: (e) =>console.log('Error', e),
      complete:()=>this.saveData()
    })

   //this.Userdet()

       
  }

  

}

export default{ usedat:JSON.parse(localStorage.getItem("userData") || "[]")}

 