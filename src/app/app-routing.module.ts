import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home2/home2.component';
import { Home3Component } from './components/home3/home3.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import {RegisterComponent} from "./components/auth/register/register.component";
import {RoleGuardService} from "./service/user/guard/role-guard.service";
import {UsersTableComponent} from "./components/user/users-table/users-table.component";
import {VerifyComponent} from "./components/auth/verify/verify.component";
import {DevicesListComponent} from "./components/user/devices-list/devices-list.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthGuardService} from "./service/user/guard/auth-guard.service";
import {RecoverPasswordComponent} from "./components/auth/recover-password/recover-password.component";
import {ForgotPasswordComponent} from "./components/auth/forgot-password/forgot-password.component";
import {LogoutComponent} from "./components/auth/logout/logout.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {PanelComponent} from "./components/shared/panel/panel.component";



const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home2', component: Home2Component},
  {path:'home3', component: Home3Component},
  {path:'courses', component: CoursesComponent},
  {path:'courseDetails', component: CourseDetailsComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: RegisterComponent},
  {path:'logout', component: LogoutComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'recover-password', component: RecoverPasswordComponent},
  {
    path: 'settings',
    component: PanelComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'devices',
        component: DevicesListComponent
      }
    ]
  },
{
  path: 'verify',
  component: VerifyComponent
},
{
  path: 'superAdmin',
  component: PanelComponent,
  canActivate: [RoleGuardService],
  data: {
    expectedRole: 'SUPERADMIN'
  },
  children: [
    {
      path: 'users',
      component: UsersTableComponent
    }
  ]
}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
declarations: [],
exports: [RouterModule]
})
export class AppRoutingModule {
}
