import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {


  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getMaterialData(){
    return  this.http.get<any>(
     this.server + "material");
   }


  postMaterialData(data:any){
   return  this.http.post<any>(
    this.server + "material",data);
  }
  editMaterialData(id:string){
    return  this.http.get<any>(
     this.server + "material/"+id);
   }
   updateMaterialData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "material/"+id,data);
   }
   deleteMaterialData(id:any){
    return  this.http.delete<any>(
     this.server + "material/"+id);
   }
}
