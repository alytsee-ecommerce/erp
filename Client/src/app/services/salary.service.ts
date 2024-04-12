import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getSalaryData(){
    return  this.http.get<any>(
     this.server + "salary");
   }


  postSalaryData(data:any){
   return  this.http.post<any>(
    this.server + "salary",data);
  }
  editSalaryData(id:string){
    return  this.http.get<any>(
     this.server + "salary/"+id);
   }
   updateSalaryData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "salary/"+id,data);
   }
   deleteSalaryData(id:any){
    return  this.http.delete<any>(
     this.server + "salary/"+id);
   }
   searchSalaryData(key:any,srt:any,end:any){
    return  this.http.get<any>(
     this.server + "salary/search"+"/"+key+"/"+srt+"/"+end);
   }
}
