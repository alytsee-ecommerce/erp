import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashBookComponent } from './cash-book/cash-book.component';
import { EmployeeComponent } from './employee/employee.component';
import { FidaComponent } from './fida/fida.component';
import { HomeComponent } from './home/home.component';
import { MachinePartsChangeComponent } from './machine-parts-change/machine-parts-change.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { SalaryAdvanceComponent } from './salary-advance/salary-advance.component';
import { SalesComponent } from './sales/sales.component';
import { SwamidasTaxComponent } from './swamidas-tax/swamidas-tax.component';
import { UsersComponent } from './users/users.component';
import { VehicleExpenseComponent } from './vehicle-expense/vehicle-expense.component';
import{LoginComponent} from './login/login.component'
import { VendorComponent } from './vendor/vendor.component';
import { MaterialComponent } from './material/material.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { OtherExpencesComponent } from './other-expences/other-expences.component';
import { MainCashbookComponent } from './main-cashbook/main-cashbook.component';
import { AuthGuard } from './auth.gaurd';

var usedat =JSON.parse(localStorage.getItem("userData") || "[]");
const routes: Routes = [

{ path: '', 
  component: LoginComponent },
 
  {
    path: 'home',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:HomeComponent
   
  },
  {
    path: 'users',
    canActivate: [AuthGuard],      canLoad: [AuthGuard],
    component:UsersComponent
   
  },
  {
    path: 'raw-material',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:RawMaterialComponent
  },
  {
    path: 'sales',
    component:SalesComponent,
    canActivate: [AuthGuard],canLoad: [AuthGuard]
  },
  {
    path: 'cash-book',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:CashBookComponent
  },
  {
    path: 'MainCash-book',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:MainCashbookComponent
  },
  {
    path: 'diesel',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:FidaComponent
  },
  {
    path: 'salary-advance',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:SalaryAdvanceComponent
  },
  {
    path: 'attendance',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:AttendanceComponent
  },
  {
    path: 'vehicle-expense',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:VehicleExpenseComponent
  },
  {
    path: 'other-expense',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:OtherExpencesComponent
  },
  {
    path: 'machine-parts-change',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:MachinePartsChangeComponent
  },
  {
    path: 'tax',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:SwamidasTaxComponent
  },
  {
    path: 'material',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:MaterialComponent
  },
  {
    path: 'vendor',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:VendorComponent
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],canLoad: [AuthGuard],
    component:EmployeeComponent
  },
  { path: '**', redirectTo: '' ,canActivate:[AuthGuard],canLoad:[AuthGuard]}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
