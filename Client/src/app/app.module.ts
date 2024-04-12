import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatToolbarModule}from '@angular/material/toolbar';
import{MatSidenavModule}from '@angular/material/sidenav';
import{MatButtonModule}from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {NgbModule,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import {HttpClientModule, HttpHeaders } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { SalesComponent } from './sales/sales.component';
import { CashBookComponent } from './cash-book/cash-book.component';
import { FidaComponent } from './fida/fida.component';
import { SalaryAdvanceComponent } from './salary-advance/salary-advance.component';
import { VehicleExpenseComponent } from './vehicle-expense/vehicle-expense.component';
import { MachinePartsChangeComponent } from './machine-parts-change/machine-parts-change.component';
import { SwamidasTaxComponent } from './swamidas-tax/swamidas-tax.component';
import { UsersComponent } from './users/users.component';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { LoginComponent } from './login/login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialComponent } from './material/material.component';
import { VendorComponent } from './vendor/vendor.component';
import { SignupComponent } from './signup/signup.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { OtherExpencesComponent } from './other-expences/other-expences.component';
import { MainCashbookComponent } from './main-cashbook/main-cashbook.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RawMaterialComponent,
    SalesComponent,
    CashBookComponent,
    FidaComponent,
    SalaryAdvanceComponent,
    VehicleExpenseComponent,
    MachinePartsChangeComponent,
    SwamidasTaxComponent,
    UsersComponent,
    LoginComponent,
    MaterialComponent,
    VendorComponent,
    SignupComponent,
    AttendanceComponent,
    AttendanceReportComponent,
    OtherExpencesComponent,
    MainCashbookComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgbModule,
    MatTabsModule,
    MatExpansionModule,
    HttpClientModule,
    MatRadioModule,
    MatProgressSpinnerModule

    
   
    

  ],
  providers: [
    BreadcrumbService,
    NgbActiveModal
  ],

  bootstrap: [AppComponent]
})
export class AppModule { 

}
