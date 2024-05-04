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


import {InstitutionTableComponent} from './components/program/institution/institution-table/institution-table.component';
import {InstitutionAddFormComponent} from './components/program/institution/institution-add-form/institution-add-form.component';
import {InstitutionUpdateFormComponent} from './components/program/institution/institution-update-form/institution-update-form.component';
import {InstitutionPanelComponent} from './components/program/institution/institution-panel/institution-panel.component';
import {InstitutionUsersTableComponent} from './components/program/institution/institution-users-table/institution-users-table.component';
import {InstitutionAddUserComponent} from './components/program/institution/institution-add-user/institution-add-user.component';
import {ProgramTableComponent} from './components/program/program-table/program-table.component';
import {ProgramAddFormComponent} from './components/program/program-add-form/program-add-form.component';
import {ProgramUpdateFormComponent} from './components/program/program-update-form/program-update-form.component';
import {ProgramClassesTableComponent} from './components/program/program-classes-table/program-classes-table.component';
import {ProgramAddClassComponent} from './components/program/program-add-class/program-add-class.component';
import {ProgramClassUsersTableComponent} from './components/program/program-class-users-table/program-class-users-table.component';
import {ClassAddUserComponent} from './components/program/class/class-add-user/class-add-user.component';
import {ClassUpdateComponent} from './components/program/class/class-update/class-update.component';
import {AddFieldOfStudyComponent} from "./components/schedule/add/add-field-of-study/add-field-of-study.component";
import {EditDepartementComponent} from "./components/schedule/edit/edit-departement/edit-departement.component";
import {EditFieldOfStudyComponent} from "./components/schedule/edit/edit-field-of-study/edit-field-of-study.component";
import {GestionDepartementComponent} from "./components/schedule/gestion/gestion-departement/gestion-departement.component";
import {GestionFieldOfStudyComponent} from "./components/schedule/gestion/gestion-field-of-study/gestion-field-of-study.component";
import {NonDisponibilityComponent} from "./components/schedule/gestion/non-disponibility/non-disponibility.component";
import {TimeTableComponent} from "./components/schedule/gestion/time-table/time-table.component";
import {AddDepartementComponent} from "./components/schedule/add/add-departement/add-departement.component";
import {AddNonDisponibilityComponent} from './components/schedule/add/add-non-disponibility/add-non-disponibility.component';
import {EditNonDisponibilityComponent} from "./components/schedule/edit/edit-non-disponibility/edit-non-disponibility.component";
import {ActionsComponent} from './components/schedule/actions/actions.component';
import {MyClassesComponent} from './components/program/my-programs-and-classes/my-classes/my-classes.component';
import {MyProgramsComponent} from './components/program/my-programs-and-classes/my-programs/my-programs.component';
import {MyProgramsAndClassesComponent} from './components/program/my-programs-and-classes/my-programs-and-classes.component';
import {JoinProgramDialogComponent} from './components/program/my-programs-and-classes/my-programs/join-program-dialog/join-program-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UsersSearchComponent } from './components/user/users-search/users-search.component';
import { UserProfileByEmailComponent } from './components/user/user-profile-by-email/user-profile-by-email.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ElementModuleComponent } from './components/schedule/gestion/element-module/element-module.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { DialogModule } from 'primeng/dialog';


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
    ActivityComponent,
    AddDepartementComponent,
    AddFieldOfStudyComponent,
    EditDepartementComponent,
    EditNonDisponibilityComponent,
    EditFieldOfStudyComponent,
    GestionDepartementComponent,
    GestionFieldOfStudyComponent,
    NonDisponibilityComponent,
    TimeTableComponent,
    AddNonDisponibilityComponent,
    EditNonDisponibilityComponent,
    EditNonDisponibilityComponent,
    InstitutionTableComponent,
    InstitutionAddFormComponent,
    InstitutionUpdateFormComponent,
    InstitutionPanelComponent,
    InstitutionUsersTableComponent,
    InstitutionAddUserComponent,
    InstitutionUsersTableComponent,
    InstitutionAddUserComponent,
    ProgramTableComponent,
    ProgramAddFormComponent,
    ProgramUpdateFormComponent,
    ProgramClassesTableComponent,
    ProgramAddClassComponent,
    ProgramClassUsersTableComponent,
    ClassAddUserComponent,
    ClassUpdateComponent,
    ActionsComponent,
    MyClassesComponent,
    MyProgramsComponent,
    MyProgramsAndClassesComponent,
    JoinProgramDialogComponent,
    UsersSearchComponent,
    UserProfileByEmailComponent,
    ElementModuleComponent

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
    DialogModule,
    InfiniteScrollModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: "toast-top-right"
    }),
    MatFormFieldModule,
    MatInputModule
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
