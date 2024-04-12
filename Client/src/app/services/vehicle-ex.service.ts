import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleExService {

  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getVehicleData(){
    return  this.http.get<any>(
     this.server + "vehicle");
   }


  postVehicleData(data:any){
   return  this.http.post<any>(
    this.server + "vehicle",data);
  }
  editVehicleData(id:string){
    return  this.http.get<any>(
     this.server + "vehicle/"+id);
   }
   updateVehicleData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "vehicle/"+id,data);
   }
   deleteVehicleData(id:any){
    return  this.http.delete<any>(
     this.server + "vehicle/"+id);
   }
   srchVehicleData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "vehicle/srch"+"/"+srt+"/"+end);
   }
}