import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {


  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getVendorsData(){
    return  this.http.get<any>(
     this.server + "vendors");
   }


  postVendorsData(data:any){
   return  this.http.post<any>(
    this.server + "vendors",data);
  }
  editVendorsData(id:string){
    return  this.http.get<any>(
     this.server + "vendors/"+id);
   }
   updateVendorsData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "vendors/"+id,data);
   }
   deleteVendorsData(id:any){
    return  this.http.delete<any>(
     this.server + "vendors/"+id);
   }

   getperkgData(){
    return  this.http.get<any>(
     this.server + "perkgs");
   }
   getcompanyData(){
    return  this.http.get<any>(
     this.server + "company");
   }


  postperkgData(data:any){
   return  this.http.post<any>(
    this.server + "perkgs",data);
  }
  postcompanyData(data:any){
    return  this.http.post<any>(
     this.server + "company",data);
   }
  editperkgData(id:string){
    return  this.http.get<any>(
     this.server + "perkgs/"+id);
   }
   editcompanyData(id:string){
    return  this.http.get<any>(
     this.server + "company/"+id);
   }
   updateperkgData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "perkgs/"+id,data);
   }
   updatecompanyData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "company/"+id,data);
   }
   deleteperkgData(id:any){
    return  this.http.delete<any>(
     this.server + "perkgs/"+id);
   }
   deletecompanyData(id:any){
    return  this.http.delete<any>(
     this.server + "company/"+id);
   }
}