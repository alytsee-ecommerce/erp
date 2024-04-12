import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwamidasTxService {

  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getSwamidasData(){
    return  this.http.get<any>(
     this.server + "swamidas");
   }


  postSwamidasData(data:any){
   return  this.http.post<any>(
    this.server + "swamidas",data);
  }
  editSwamidasData(id:string){
    return  this.http.get<any>(
     this.server + "swamidas/"+id);
   }
   updateSwamidasData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "swamidas/"+id,data);
   }
   deleteSwamidasData(id:any){
    return  this.http.delete<any>(
     this.server + "swamidas/"+id);
   }
   srchTaxData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "swamidas/srch"+"/"+srt+"/"+end);
   }
}