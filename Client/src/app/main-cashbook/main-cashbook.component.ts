import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from "ngx-bootstrap/modal";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MainCashbookService } from '../services/main-cashbook.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-main-cashbook',
  templateUrl: './main-cashbook.component.html',
  styleUrls: ['./main-cashbook.component.css'],
  providers:[DatePipe]
})
export class MainCashbookComponent implements OnInit {

  usedat=JSON.parse(localStorage.getItem("userData") || "[]");
  id='';
  cashData:any=[];
  cr=0;
  dr=0;
  srt=''
  end=''
  balance=0;
  Total=0
    update=false;
    sub=false;
      cashForm: FormGroup;
      cashFormSubmitted = false;
    
      ngOnInit(): void {
        this.initialiseForm();
        this. getCashbookData();
      }
        
      closeResult: string;
      
      constructor(private modalService: NgbModal,
        public datepipe: DatePipe,
        private service :MainCashbookService,
        private fb: FormBuilder,
        ) {}
        get n() {
          return this.cashForm.controls;
        }
        initialiseForm() {
          this.cashForm = this.fb.group({
            date:["",[Validators.required]],
            parts:["",[Validators.required]],
            amount:[""],
            bill:[""]
          });
    
          this.cashFormSubmitted = false;
        }
        
      saveOrSubmitcashForm( modal:any) {
       
        this.cashFormSubmitted = true;
        if (this.cashForm.invalid) {
          return false
        }
  
  
        this.service.postCashbookData(this.cashForm.value).subscribe((data:any)=>{
          this. getCashbookData();
      
        },(error) =>{
          console.log('Error', error);
        }) 
       
          this.cashForm.reset();
    this.initialiseForm();
        modal.dismiss('Cross click');
      }
    
  
    getCashbookData(){
   
      this.service.getCashbookData().subscribe({
        next:(data: any) =>  this.cashData = data,
        error: (e) =>console.log('Error', e)
      }) 
    }

  
    srch(){
      this.Total=0
      this.service.srchCashData(this.datepipe.transform(this.srt, 'yyyy-MM-dd'),this.datepipe.transform(this.end, 'yyyy-MM-dd')).subscribe({
        next:(data: any) =>  this.cashData = data,
        error: (e) =>console.log('Error', e),
        complete:()=>(this.cashData.forEach((element:any )=> {
          
            this.Total=this.Total+ + element.amount
          
        }) )
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
  
  
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
    
    myValue:any;
    model:any={};
    model2:any={};
    editCashForm(k:any){
      this.cashForm.patchValue({
        date :k.date,
        parts : k.parts,
        amount : k.amount,
        bill : k.bill,
       
    });
  this.id=k.bill;
    
    }
  
    editCash(id:any){
      this.service.editCashbookData(id)
      .subscribe({
        next: (data:any) => this.editCashForm(data),  
        error: (e) => console.error(e)
    })
     
    }
    
    updateCash(modal:any){
      this.cashFormSubmitted = true;
      if (this.cashForm.invalid) {
        return false
      }
      this.service.updateCashbookData(this.id,this.cashForm.value).subscribe( (data:any) => {
        this.getCashbookData();
    
      },(error) => console.error(error)
       
    )
    this.initialiseForm();
    
      modal.dismiss('Cross click');
    }
    
    deleteCash(id:any){
      this.service.deleteCashbookData(id).subscribe({
        next:(data:any)=>
        this. getCashbookData(),
      error:(e) =>
        console.log('Error', e)
      }) 
     
    }
  
  }
  