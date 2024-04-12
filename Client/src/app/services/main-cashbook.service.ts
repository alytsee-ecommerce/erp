import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainCashbookService {



  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getCashbookData(){
    return  this.http.get<any>(
     this.server + "Maincashbook");
   }


  postCashbookData(data:any){
   return  this.http.post<any>(
    this.server + "Maincashbook",data);
  }
  editCashbookData(id:string){
    return  this.http.get<any>(
     this.server + "Maincashbook/"+id);
   }
   updateCashbookData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "Maincashbook/"+id,data);
   }
   deleteCashbookData(id:any){
    return  this.http.delete<any>(
     this.server + "Maincashbook/"+id);
   }
   srchCashData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "Maincashbook/srch"+"/"+srt+"/"+end);
   }
}
