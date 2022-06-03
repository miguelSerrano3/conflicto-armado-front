import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeAdminGuard } from '../guards/authorize-admin.guard';
import { LoginGuard } from '../guards/login.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeDashComponent } from './components/home-dash/home-dash.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SubsidiosComponent } from './components/subsidios/subsidios.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [LoginGuard],
    children: [
      { path: '', redirectTo: 'homeDash', pathMatch: 'full' },
      {
        path: 'homeDash',
        component: HomeDashComponent
      },
      {
        path: 'list-users',
        component: ListUsersComponent,
        canActivate:[AuthorizeAdminGuard]
      },
      {
        path: 'subsidios',
        component: SubsidiosComponent,
        canActivate:[AuthorizeAdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
