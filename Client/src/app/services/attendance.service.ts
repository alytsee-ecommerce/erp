import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  server = environment.serverurl;
  constructor(private http : HttpClient) { }
  getAttendanceData(key:any){
    return  this.http.get<any>(
     this.server + "attendance/search/"+key);
   }


  postAttendanceData(data:any){
   return  this.http.post<any>(
    this.server + "attendance",data);
  }
  srchAttendanceData(srt:any,end:any){
    return  this.http.get<any>(
     this.server + "attendance/search"+"/"+srt+"/"+end);
   }
   editAttendanceData(id:string){
    return  this.http.get<any>(
     this.server + "attendance/"+id);
   }
   updateAttendanceData(id:any,value:any){
    return  this.http.put<any>(
     this.server + "attendance/"+id,value);
   }
}
