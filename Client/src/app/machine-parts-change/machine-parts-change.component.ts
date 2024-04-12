import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MeachinePartsService } from '../services/meachine-parts.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-machine-parts-change',
  templateUrl: './machine-parts-change.component.html',
  styleUrls: ['./machine-parts-change.component.css'],
  providers:[DatePipe]
})
export class MachinePartsChangeComponent implements OnInit {

  id='';
  mpData:any=[];
  mpData1:any=[];
  crunt=0
  id1=''
  update=false;
  sub=false;
  srt=''
  end=''
  mpForm: FormGroup;
  mpFormSubmitted = false;
  storeForm: FormGroup;
  storeFormSubmitted = false;
  f1Time=0
  f2Time=0
  storeData:any
    ngOnInit(): void {
      this.initialiseForm();
     this.storeFormFn()
     this.  getStoreData()
      this.today()
      setTimeout(() => {
        this.getMeachinepartsData1();
      }, 100);
    }
      today(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
         this.srt=yyyy +'/'+ mm+'/'+'01'
         this.end=yyyy +'/'+ mm+'/'+dd
      }
    closeResult: string;
    
    constructor(
      public datepipe: DatePipe,
      private modalService: NgbModal,
      private service :MeachinePartsService,
      private fb: FormBuilder,
      ) {}
      get n() {
        return this.mpForm.controls;
      }
      get c() {
        return this.storeForm.controls;
      }
      initialiseForm() {
        this.mpForm = this.fb.group({
          factory:["",[Validators.required]],
          date:["",[Validators.required]],
          time:["",[Validators.required]]
        });
  
        this.mpFormSubmitted = false;
      }
      storeFormFn() {
        this.storeForm = this.fb.group({
          part:[""],
          qn:[""]
        });
  
        this.storeFormSubmitted = false;
      }
    saveOrSubmitmpForm( modal:any) {
      this.mpFormSubmitted = true;
      if (this.mpForm.invalid) {
        return false
      }
      

      this.service.postMeachinepartsData(this.mpForm.value).subscribe((data:any)=>{
        this. getMeachinepartsData1();
      
      },(error) =>{
        console.log('Error', error);
      }) 
     
        this.mpForm.reset();
  this.initialiseForm();
      modal.dismiss('Cross click');
    }
    saveOrSubmitmpForm1( modal:any) {
      this.storeFormSubmitted = true;
      if (this.storeData.invalid) {
        return false
      }
      this.service.postStoreData(this.storeForm.value).subscribe((data:any)=>{
        this.getStoreData()
      
      },(error) =>{
        console.log('Error', error);
      }) 
     
        this.storeForm.reset();
  this.storeFormFn();
      modal.dismiss('Cross click');
    }
  
  
 /* getMeachinepartsData(){
    this.service.getMeachinepartsData().subscribe({
      next:(data: any) =>  this.mpData = data,
      error: (e) =>console.log('Error', e)
     
    }) 
  }*/

  getMeachinepartsData1(){
    this.service.getMeachinepartsData1(95,this.datepipe.transform(this.srt, 'yyyy-MM-dd'),this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe({
      next:(data: any) =>  this.mpData = data,
      error: (e) =>console.log('Error', e),
      complete:() =>this.f1()
     
    }) 
    this.service.getMeachinepartsData1(65,this.datepipe.transform(this.srt, 'yyyy-MM-dd'),this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe({
      next:(data: any) =>  this.mpData1 = data,
      error: (e) =>console.log('Error', e),
      complete:() =>this.f2()
     
    }) 
  }
   f1(){
    this.f1Time=0
      this.mpData.forEach((element:any) => {
       this.f1Time= element.time + +this.f1Time
      });
   }
   f2(){
    this.f2Time=0
    this.mpData1.forEach((element:any) => {
      this.f2Time= element.time + +this.f2Time
     });
   }

   getStoreData(){
    this.service.getStoreData().subscribe({
      next:(data: any) =>  this.storeData = data,
      error: (e) =>console.log('Error', e)
    }) }

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

  refresh(): void {
    window.location.reload();
}

 
  editMpForm(k:any){
    this.mpForm.patchValue({
      factory :k.factory,
      date :k.date,
      time : k.time
  
  });
this.id=k._id;
  
  }
  editMeachineparts(id:any){
    this.service.editMeachinepartsData(id)
    .subscribe({
      next: (data:any) => this.editMpForm(data),  
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
   
  }

  updateMeachineparts(modal:any){
    this.mpFormSubmitted = true;
    if (this.mpForm.invalid) {
      return false
    }
    this.service.updateMeachinepartsData(this.id,this.mpForm.value).subscribe( (data:any) => {
      this.getMeachinepartsData1();
  
    },(error) => console.error(error)
     
  )
  this.initialiseForm();
    modal.dismiss('Cross click');
    this.refresh()
  }

  
  deleteMeachineparts(id:any){
    this.service.deleteMeachinepartsData(id).subscribe({
      next:(data:any)=>
      this. getMeachinepartsData1(),
    error:(e) =>
      console.log('Error', e)
    }) 
   
}
}
