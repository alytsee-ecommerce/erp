import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeachinePartsService {

  server = environment.serverurl;
  constructor(private http : HttpClient) { }

  getMeachinepartsData(){
    return  this.http.get<any>(
     this.server + "meachineparts");
   }
   getMeachinepartsData1(key:any,srt:any,end:any){
    return  this.http.get<any>(
      this.server + "meachineparts/factory/"+key+"/"+srt+"/"+end);
   }

  postMeachinepartsData(data:any){
   return  this.http.post<any>(
    this.server + "meachineparts",data);
  }
  editMeachinepartsData(id:string){
    return  this.http.get<any>(
     this.server + "meachineparts/"+id);
   }
   updateMeachinepartsData(id:any,data:any){
    return  this.http.put<any>(
     this.server + "meachineparts/"+id,data);
   }
   deleteMeachinepartsData(id:any){
    return  this.http.delete<any>(
     this.server + "meachineparts/"+id);
   }
   getStoreData(){
    return  this.http.get<any>(
     this.server + "store");
   }

   postStoreData(data:any){
    return  this.http.post<any>(
     this.server + "store",data);
   }

}