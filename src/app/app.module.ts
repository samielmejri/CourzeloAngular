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
//import { DeleteAccountRequestComponent } from './components/model/user/delete-account-request/delete-account-request.component';
//import {SidebarComponent} from './components/shared/sidebar/sidebar.component';
//import { UserTableComponent } from './components/user/user-table/user-table.component';
import {Interceptor} from "./service/user/auth/Interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";


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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet
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
