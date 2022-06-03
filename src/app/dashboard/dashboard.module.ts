import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeDashComponent } from './components/home-dash/home-dash.component';
import { SubsidiosComponent } from './components/subsidios/subsidios.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent,
    ListUsersComponent,
    HomeDashComponent,
    SubsidiosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgbModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
