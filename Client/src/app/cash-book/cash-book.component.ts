import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from "ngx-bootstrap/modal";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CashbookService } from '../services/cashbook.service';
@Component({
  selector: 'app-cash-book',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.css']
})
export class CashBookComponent implements OnInit {

id='';
cashData:any=[];
cr=0;
dr=0;
balance=0;
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
      private service :CashbookService,
      private fb: FormBuilder,
      ) {}
      get n() {
        return this.cashForm.controls;
      }
      initialiseForm() {
        this.cashForm = this.fb.group({
          date:["",[Validators.required]],

          Particulars:["",[Validators.required]],
          drExpense:[""],
          crIncome:[""],
          Bill:[""]
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
      error: (e) =>console.log('Error', e),
      complete:()=>this.getBalance()
    }) 
  }
getBalance(){
  this.cr=0
  this.dr=0
   this.cashData.forEach((element:any) => {
    this.cr =element.crIncome + +this.cr;
this.dr=element.drExpense + +this.dr;
  })


  
  this.balance=this.cr-this.dr;

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
      Particulars : k.Particulars,
      drExpense : k.drExpense,
      crIncome : k.crIncome,
      Bill : k.Bill,
     
  });
this.id=k._id;
  
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
