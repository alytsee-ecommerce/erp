import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

server = environment.serverurl;
constructor(private http : HttpClient) { }

postLoginData(data:any){

  return  this.http.post<any>(
   this.server + "login",data);
 }
 getLoginData(){
  return  this.http.get<any>(
   this.server + "login");
 }
}
