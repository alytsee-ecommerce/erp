import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getSalesData(){
    return  this.http.get<any>(
     this.server + "sales");
   }


  postSalesData(data:any){
   return  this.http.post<any>(
    this.server + "sales",data);
  }
  editSalesData(id:string){
    return  this.http.get<any>(
     this.server + "sales/"+id);
   }
   updateSalesData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "sales/"+id,data);
   }
   deleteSalesData(id:any){
    return  this.http.delete<any>(
     this.server + "sales/"+id);
   }
   searchSalesData(key:any){
    return  this.http.get<any>(
     this.server + "sales/search/"+key);
   }
   srchSalesData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "sales/srch"+"/"+srt+"/"+end);
   }
   srch1SalesData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "sales/srch1"+"/"+srt+"/"+end);
   }
   srch2SalesData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "sales/srch2"+"/"+srt+"/"+end);
   }
}