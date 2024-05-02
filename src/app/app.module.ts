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
import { AddRessourceComponent } from './components/add-ressource/add-ressource.component';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { ModifierCoursComponent } from './components/modifier-cours/modifier-cours.component';
import { DeleteCoursComponent } from './components/delete-cours/delete-cours.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component'; // Import ReactiveFormsModule
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuizafficheComponent } from './components/quizaffiche/quizaffiche.component';
import { QuestionafficheComponent } from './components/questionaffiche/questionaffiche.component';
import { StartQuizzComponent } from './components/start-quizz/start-quizz.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { SubmitQuizzComponent } from './components/submit-quizz/submit-quizz.component';
import { QuizStatisticsComponent } from './components/quiz-statistics/quiz-statistics.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { QuizScheduleComponent } from './components/schedule-quiz/schedule-quiz.component';
import { HomepageComponent } from './components/homepage/homepage.component';


import { MatIconModule } from '@angular/material/icon';
import { ForumComponent } from './components/forum/forum.component';
import { ForumThreadComponent } from './components/forum-thread/forum-thread.component';
import { VoteButtonComponent } from './components/vote-button/vote-button.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { PostComponent } from './components/post/post.component';
import { SideBarComponentAziz } from './components/side-bar/side-bar.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditorModule} from '@tinymce/tinymce-angular';
import { ForumHeaderComponent } from './components/forum-header/forum-header.component';
import { PostSidebarComponent } from './components/post-sidebar/post-sidebar.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { ArticleComponent } from './components/article/article.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { ActivityComponent } from './components/activity/activity.component';



@NgModule({
  declarations: [
    PaymentComponent,
    DeleteCoursComponent,
    ModifierCoursComponent,
    ListCoursComponent,
    AddRessourceComponent,
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
    UserProfileDialogComponent,
    QuizListComponent,
    CreateQuizComponent,
    CreateQuestionComponent,
    QuestionListComponent,
    QuizafficheComponent,
    QuestionafficheComponent,
    StartQuizzComponent,
    QuizzComponent,
    SubmitQuizzComponent,
    QuizStatisticsComponent,
    CalendarComponent,
    QuizScheduleComponent,
    HomepageComponent,
    ForumComponent,
    ForumThreadComponent,
    VoteButtonComponent,
    ViewPostComponent,
    PostComponent,
    SideBarComponentAziz,
    CreatePostComponent,
    ForumHeaderComponent,
    PostSidebarComponent,
    CreateArticleComponent,
    ConfirmationDialogComponent,
    UpdatePostComponent,
    ArticleComponent,
    LeaderboardComponent,
    UpdateArticleComponent,
    ActivityComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatDialogModule,
    RouterModule,
    CommonModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    EditorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
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
