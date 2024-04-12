import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MeachinePartsService } from './services/meachine-parts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  useda = JSON.parse(localStorage.getItem("userData") || "[]");

  showHead: boolean = false;
  formModal: any;
  notify = false
  crunt: any = ''
  partName: any = []
  constructor(
    private router: Router,
  ) {
    this.useda = JSON.parse(localStorage.getItem("userData") || "[]");
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/') {
          this.showHead = false;
        }
        else {

          this.showHead = true;
        }
      }
    });
  }


  ngOnInit(): void {

    this.useda

    //this.notlogedin()
    var userData: any

  }


  openModal() {
    this.formModal.show()
  }
  closeModal() {
    this.formModal.hide()
  }

  logout() {
    localStorage.setItem("userData", '');
    this.useda = ''
    this.router.navigateByUrl("/")

  }


  notlogedin() {
    // on route change to '/login', set the variable showHead to false

    if (this.useda !== "admin") {
      this.router.navigateByUrl("/")

    }
  }



}


