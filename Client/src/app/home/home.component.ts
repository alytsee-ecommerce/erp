import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SalesService } from '../services/sales.service';
import { MainCashbookService } from '../services/main-cashbook.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[DatePipe]
})
export class HomeComponent implements OnInit {
  usedat =JSON.parse(localStorage.getItem("userData") || "[]");
srt:any=""
end:any=""
saleamount=0
tax=0
amount=0
profit=0
today:any=""
dat:any=""

constructor(  public datepipe: DatePipe,
  private service:SalesService,
  public service1:MainCashbookService

 
) { }

  ngOnInit(): void {
    this.usedat,
 
   this.todaysDate();
   this.getProfit(this.srt,this.end)

  }

  getProfit(srt:any,end:any){
    this.profit=0;
    this.amount=0;
    this.saleamount=0
    this.service.srch2SalesData(this.datepipe.transform(srt, 'yyyy-MM-dd'),this.datepipe.transform(end, 'yyyy-MM-dd')).subscribe({
      next:(data: any) =>  ( data.forEach((element:any) => {
       
      this.saleamount= element.amount+ +this.saleamount
    
      })),
      error: (e) =>console.log('Error', e),
      complete:()=> ( this.tax= ( this.saleamount-this.saleamount*(5/100))  )
       
  }) 
  this.service1.srchCashData(this.datepipe.transform(srt, 'yyyy-MM-dd'),this.datepipe.transform(end, 'yyyy-MM-dd')).subscribe({
    next:(data: any) =>  ( data.forEach((element:any) => {
  
    this.amount= element.amount+ +this.amount  
    })),
    error: (e) =>console.log('Error', e),
    complete: ()=>(
      setTimeout(() => {
        this.profit=this.tax-this.amount
      }, 1000))
  })
  
  
  }
  todaysDate(){
  
    this.today = new Date();
  var dd = String(this.today.getDate()).padStart(2, '0');
  var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = this.today.getFullYear();
  
  this.today = mm + '-' +dd + '-' + yyyy;
  
  this.srt= mm+'-'+'01'+'-'+yyyy;
  this.dat=this.today
  this.end=this.today


  }
  

}
