import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtherExpencesService {

 
  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getOtherData(){
    return  this.http.get<any>(
     this.server + "other");
   }


  postOtherData(data:any){
   return  this.http.post<any>(
    this.server + "other",data);
  }
  editOtherData(id:string){
    return  this.http.get<any>(
     this.server + "other/"+id);
   }
   updateOtherData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "other/"+id,data);
   }
   deleteOtherData(id:any){
    return  this.http.delete<any>(
     this.server + "other/"+id);
   }
   srchOtherData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "other/srch"+"/"+srt+"/"+end);
   }
}