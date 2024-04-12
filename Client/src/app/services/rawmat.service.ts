import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RawmatService {

  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getRawmatData(){
    return  this.http.get<any>(
     this.server + "rawmat");
   }


  postRawmatData(data:any){
   return  this.http.post<any>(
    this.server + "rawmat",data);
  }
  editRawmatData(id:string){
    return  this.http.get<any>(
     this.server + "rawmat/"+id);
   }
   updateRawmatData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "rawmat/"+id,data);
   }
   deleteRawmatData(id:any){
    return  this.http.delete<any>(
     this.server + "rawmat/"+id);
   }
   searchRawmatData(key:any){
    return  this.http.get<any>(
     this.server + "rawmat/search/"+key);
   }
   RawmatData(key:any){
    return  this.http.get<any>(
     this.server + "rawmat/material/"+key);
   }
   srchRawmatData(key:any,key2:any,srt:any,end:any){
    return  this.http.get<any>(
     this.server + "rawmat/srch"+"/"+key+"/"+key2+"/"+srt+"/"+end);
   }
   srch1RawmatData(key2:any,srt:any,end:any){
    return  this.http.get<any>(
     this.server + "rawmat/srch1"+"/"+key2+"/"+srt+"/"+end);
   }
}
