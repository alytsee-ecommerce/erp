import { Injectable } from "@angular/core";
import { CanActivate,CanLoad,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";

@Injectable()

export class AuthGuard implements CanActivate , CanLoad{
    userData:any
    userName:any
    canLoad():boolean{
      this.userData=JSON.parse(localStorage.getItem("userData") || "[]");
      this.userName=this.userData.userName
      if(this.userName=='' ||this.userName==null ||this.userName=='undefined' ){
        this.router.navigate([''])
        return false
      }
      return true
    }
    canActivate():boolean{
        this.userData=JSON.parse(localStorage.getItem("userData") || "[]");
        this.userName=this.userData.userName
        if(this.userName=='' ||this.userName==null ||this.userName=='undefined'){
          this.router.navigate([''])
          return false
        }
        return true
      }
    constructor(private router:Router){}
}
