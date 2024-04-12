import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from '../services/material.service';
import { VendorService } from '../services/vendor.service';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  usedat=JSON.parse(localStorage.getItem("userData") || "[]");

  id='';
  materialData:any=[];
  vendorData:any=[];
  update=false;
  sub=false;
    materialForm: FormGroup;
    materialFormSubmitted = false;
  
    ngOnInit(): void {
      this.initialiseForm();
      this.getMaterialData();
      this.getVendorsData();
    }
      
    closeResult: string;
    
    constructor(private modalService: NgbModal,
      private service:MaterialService,
       private service2:VendorService,

      private fb: FormBuilder,
      ) {}
      get n() {
        return this.materialForm.controls;
      }
      initialiseForm() {
        this.materialForm = this.fb.group({
          material:["",[Validators.required]],
          vendor:["",[Validators.required]],
          deduct:["",[Validators.required]],
          buying:["",[Validators.required]]
        
        });
  
        this.materialFormSubmitted = false;
      }
      
    saveOrSubmitmaterialForm( modal:any) {
     
      this.materialFormSubmitted = true;
      if (this.materialForm.invalid) {
        return false
      }
   
      this.service.postMaterialData(this.materialForm.value).subscribe((data:any)=>{
        this. getMaterialData();
      
      },(error) =>{
        console.log('Error', error);
      }) 
     
        this.materialForm.reset();
  this.initialiseForm();
      modal.dismiss('Cross click');
    }
  
  
  getMaterialData(){
    this.service.getMaterialData().subscribe({
      next:(data: any) =>  this.materialData = data,
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
  getVendorsData(){
    this.service2.getVendorsData().subscribe({
      next:(data: any) =>  this.vendorData = data,
      error: (e) =>console.log('Error', e),
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
  
  
  
  editMaterialForm(k:any){
    this.materialForm.patchValue({
      material :k.material,
      vendor :k.vendor,
      deduct:k.deduct,
      buying:k.buying,
  });
  this.id=k._id;
  
  }
  editMaterial(id:any){
    this.service.editMaterialData(id)
    .subscribe({
      next: (data:any) => this.editMaterialForm(data),  
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
   
  }
  
  updateMaterial(modal:any){
    this.materialFormSubmitted = true;
    if (this.materialForm.invalid) {
      return false
    }
    this.service.updateMaterialData(this.id,this.materialForm.value).subscribe( (data:any) => {
      this.getMaterialData();
  
    },(error) => console.error(error)
     
  )
  this.initialiseForm();
  
    modal.dismiss('Cross click');
  }
  
  deleteMaterialData(id:any){
    this.service.deleteMaterialData(id).subscribe({
      next:(data:any)=>
      this. getMaterialData(),
    error:(e) =>
      console.log('Error', e)
    }) 
   
  }
  
  }
  