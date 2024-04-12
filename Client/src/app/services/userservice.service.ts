import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getUserData(){
    return  this.http.get<any>(
     this.server + "users");
   }


  postUserData(data:any){
   return  this.http.post<any>(
    this.server + "users",data);
  }
  editUserData(userName:string){
    return  this.http.get<any>(
     this.server + "users/"+userName);
   }
   updateUserData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "users/"+id,data);
   }
   deleteUserData(userName:any){
    return  this.http.delete<any>(
     this.server + "users/"+userName);
   }
}
