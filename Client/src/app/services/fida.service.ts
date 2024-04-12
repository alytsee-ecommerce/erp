import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FidaService {

  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getFidaData(){
    return  this.http.get<any>(
     this.server + "fida");
   }


  postFidaData(data:any){
   return  this.http.post<any>(
    this.server + "fida",data);
  }
  editFidaData(id:string){
    return  this.http.get<any>(
     this.server + "fida/"+id);
   }
   updateFidaData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "fida/"+id,data);
   }
   deleteFidaData(id:any){
    return  this.http.delete<any>(
     this.server + "fida/"+id);
   }
   srchFidaData(key:any,srt:any,end:any){
    return  this.http.get<any>(
     this.server + "fida/srch"+"/"+key+"/"+srt+"/"+end);
   }
}
