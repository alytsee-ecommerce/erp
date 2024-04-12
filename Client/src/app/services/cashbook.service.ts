import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashbookService {

  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getCashbookData(){
    return  this.http.get<any>(
     this.server + "cashbook");
   }


  postCashbookData(data:any){
   return  this.http.post<any>(
    this.server + "cashbook",data);
  }
  editCashbookData(id:string){
    return  this.http.get<any>(
     this.server + "cashbook/"+id);
   }
   updateCashbookData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "cashbook/"+id,data);
   }
   deleteCashbookData(id:any){
    return  this.http.delete<any>(
     this.server + "cashbook/"+id);
   }
}
