import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  usedat=JSON.parse(localStorage.getItem("userData") || "[]");
  id='';
  perKG=false;
  compani=false;
  VendorData:any=[];
  perkgData:any=[];
  companyData:any=[];
  update=false;
  sub=false;
    VendorForm: FormGroup;
    VendorFormSubmitted = false;
    perkgForm: FormGroup;
    perkgFormSubmitted = false;
    companyForm: FormGroup;
    companyFormSubmitted = false;
  
    ngOnInit(): void {
      this.initialiseForm();
      this.perkForm();
      this.getVendorsData();
      this.getperkgData();
      this.getcompanyData();
      this.companiForm();
    }
      
    closeResult: string;
    
    constructor(private modalService: NgbModal,
      private service:VendorService,
      private fb: FormBuilder,
      ) {}
      get n() {
        return this.VendorForm.controls;
      }
      initialiseForm() {
        this.VendorForm = this.fb.group({
          VendorName:["",[Validators.required]]
        
        });
  
        this.VendorFormSubmitted = false;
      }
      perkForm() {
        this.perkgForm = this.fb.group({
          perkg:["",[Validators.required]]
        
        });
  
        this.perkgFormSubmitted = false;
      }
      companiForm() {
        this.companyForm = this.fb.group({
          company:[""],
          lorryno:[""]
        
        });
  
        this.companyFormSubmitted = false;
      }
      
      
    saveOrSubmitVendorForm( modal:any) {

      this.VendorFormSubmitted = true;
      if (this.VendorForm.invalid) {
        return false
      }

      this.service.postVendorsData(this.VendorForm.value).subscribe((data:any)=>{
        this. getVendorsData();
   
      },(error) =>{
        console.log('Error', error);
      }) 
        this.VendorForm.reset();
  this.initialiseForm();
      modal.dismiss('Cross click');
    }
    saveOrSubmitcompanyForm( modal:any){
    if(this.compani= true){
      this.companyFormSubmitted = true;
      if (this.companyForm.invalid) {
        return false
      }
     // console.log(JSON.stringify(this.perkgForm.value));
      this.service.postcompanyData(this.companyForm.value).subscribe((data:any)=>{
        this.getcompanyData()
    
      },(error) =>{
        console.log('Error', error);
      }) 
    }
    this.companyForm.reset();
    this.companiForm();
    modal.dismiss('Cross click');
  }
  saveOrSubmitperkgForm( modal:any){
    if(this.perKG= true){
      this.perkgFormSubmitted = true;
      if (this.perkgForm.invalid) {
        return false
      }

      this.service.postperkgData(this.perkgForm.value).subscribe((data:any)=>{
        this.getperkgData()
      
      },(error) =>{
        console.log('Error', error);
      }) 
    }
    this.perkgForm.reset();
    this.perkForm();
    modal.dismiss('Cross click');
  }
  
  
  getVendorsData(){
    this.service.getVendorsData().subscribe({
      next:(data: any) =>  this.VendorData = data,
      error: (e) =>console.log('Error', e),
    }) 
  }
  
  getperkgData(){
    this.service.getperkgData().subscribe({
      next:(data: any) =>  this.perkgData = data,
      error: (e) =>console.log('Error', e),
    }) 
  }
  getcompanyData(){
    this.service.getcompanyData().subscribe({
      next:(data: any) =>  this.companyData = data,
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
  
  
  
  editVendorsForm(k:any){
    this.VendorForm.patchValue({
      VendorName:k.VendorName,
  });
  this.id=k._id;
  
  }
  editperkgForm(k:any){
    this.perkgForm.patchValue({
      perkg:k.perkg
  });
  this.id=k._id;
  
  }
  editcompanyForm(k:any){
    this.companyForm.patchValue({
      company:k.company,
      lorryno:k.lorryno
  });
  this.id=k._id;
  
  }
  editVendors(id:any){
    this.service.editVendorsData(id)
    .subscribe({
      next: (data:any) => this.editVendorsForm(data),  
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
   
  }
  editperkg(id:any){
    this.service.editperkgData(id)
    .subscribe({
      next: (data:any) => this.editperkgForm(data),  
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
   
  }
  editcompany(id:any){
    this.service.editcompanyData(id)
    .subscribe({
      next: (data:any) => this.editcompanyForm(data),  
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
   
  }
  
  updateVendors(modal:any){
    this.VendorFormSubmitted = true;
    if (this.VendorForm.invalid) {
      return false
    }
    this.service.updateVendorsData(this.id,this.VendorForm.value).subscribe( (data:any) => {
      this.getVendorsData();
  
    },(error) => console.error(error)
     
  )
  this.initialiseForm();
  
    modal.dismiss('Cross click');
  }
  updateperkg(modal:any){
    this.perkgFormSubmitted = true;
    if (this.perkgForm.invalid) {
      return false
    }
    this.service.updateperkgData(this.id,this.perkgForm.value).subscribe( (data:any) => {console.log(data);
      this.getperkgData();
  
    },(error) => console.error(error)
     
  )
  this.perkForm();
  
    modal.dismiss('Cross click');
  }
  updatecompany(modal:any){
    this.companyFormSubmitted = true;
    if (this.companyForm.invalid) {
      return false
    }
    this.service.updatecompanyData(this.id,this.companyForm.value).subscribe( (data:any) => {console.log(data);
      this.getcompanyData();
  
    },(error) => console.error(error)
     
  )
  this.companiForm();
  
    modal.dismiss('Cross click');
  }
  
  
  deleteVendorsData(id:any){
    this.service.deleteVendorsData(id).subscribe({
      next:(data:any)=>
      this. getVendorsData(),
    error:(e) =>
      console.log('Error', e)
    }) 
   
  }
  deleteperkgData(id:any){
    this.service.deleteperkgData(id).subscribe({
      next:(data:any)=>
      this. getperkgData(),
    error:(e) =>
      console.log('Error', e)
    }) 
   
  }
  deletecompanyData(id:any){
    this.service.deletecompanyData(id).subscribe({
      next:(data:any)=>
      this. getcompanyData(),
    error:(e) =>
      console.log('Error', e)
    }) 
   
  }
  tabClick(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
   
    
   if(tab =="₹ Per KG"){
    this.perKG=true;
    this.compani=false;
    
   }
       
  else if(tab =="company"){
    this.compani=true;
    this.perKG=false;
 
   }
   else{
    this.perKG=false;
    this.compani=false;
   }
  }
  }
  