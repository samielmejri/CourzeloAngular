import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { IntroComponent } from './components/intro/intro.component';
import { AboutComponent } from './components/about/about.component';
import { CourseComponent } from './components/course/course.component';
import { CounterComponent } from './components/counter/counter.component';
import { WorkComponent } from './components/work/work.component';
import { TestimonailComponent } from './components/testimonail/testimonail.component';
import { TeamComponent } from './components/team/team.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { Home2Component } from './components/home2/home2.component';
import { Home3Component } from './components/home3/home3.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HeaderComponent } from './components/header/header.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RecoverPasswordComponent } from './components/auth/recover-password/recover-password.component';
import { VerifyComponent } from './components/auth/verify/verify.component';
import { DevicesListComponent } from './components/user/devices-list/devices-list.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import {SidebarComponent} from './components/shared/sidebar/sidebar.component';
import { UsersTableComponent } from './components/user/users-table/users-table.component';
import {Interceptor} from "./service/user/auth/Interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {PanelComponent} from './components/shared/panel/panel.component';
import {PaginationComponent} from './components/shared/pagination/pagination.component';
import {ToastrModule} from "ngx-toastr";
import {UserProfileDialogComponent} from './components/user/user-profile-dialog/user-profile-dialog.component';
import {QaDialogComponent} from './components/user/qa-dialog/qa-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    BannerComponent,
    IntroComponent,
    AboutComponent,
    CourseComponent,
    CounterComponent,
    WorkComponent,
    TestimonailComponent,
    TeamComponent,
    BlogComponent,
    ContactComponent,
    Home2Component,
    Home3Component,
    CoursesComponent,
    CourseDetailsComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    VerifyComponent,
    UserProfileComponent,
    DevicesListComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    HeaderComponent,
    PanelComponent,
    SidebarComponent,
    UsersTableComponent,
    VerifyComponent,
    PaginationComponent,
    QaDialogComponent,
    UserProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right"
    })
  ],
  providers: [HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
