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
import { AddRessourceComponent } from './components/add-ressource/add-ressource.component';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { ModifierCoursComponent } from './components/modifier-cours/modifier-cours.component';
import { DeleteCoursComponent } from './components/delete-cours/delete-cours.component';
import { PaymentComponent } from './components/payment/payment.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component'; // Import here
import { QuestionListComponent } from './components/question-list/question-list.component'; // Import here
import { QuizafficheComponent } from './components/quizaffiche/quizaffiche.component';
import { QuestionafficheComponent } from './components/questionaffiche/questionaffiche.component';
import { StartQuizzComponent } from './components/start-quizz/start-quizz.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { SubmitQuizzComponent } from './components/submit-quizz/submit-quizz.component';
import { QuizStatisticsComponent } from './components/quiz-statistics/quiz-statistics.component';
import { CalendarComponent } from './components/calendar/calendar.component';
/*import { HelpTComponent } from './components/help-t/help-t.component';*/
import { QuizScheduleComponent } from './components/schedule-quiz/schedule-quiz.component';
import { HomepageComponent } from './components/homepage/homepage.component';






const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home2', component: Home2Component},
  {path:'home3', component: Home3Component},
  {path:'courses', component: CoursesComponent},
  {path:'course-details/:idRessource', component: CourseDetailsComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: RegisterComponent},
  {path:'logout', component: LogoutComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'recover-password', component: RecoverPasswordComponent},
  { path: 'profile', component: ProfileComponent }, // Profile page route
  {path:"add-ressource/:id" ,component:AddRessourceComponent },
  {path:"list-cours", component: ListCoursComponent},
  {path:"modifier-cours/:id",component:ModifierCoursComponent},
  {path: 'delete-course/:id', component: DeleteCoursComponent },
  {path: "payment/:prix", component: PaymentComponent},

  { path: 'quizl', component: QuizListComponent },
  { path: 'newQuiz', component: CreateQuizComponent },
  { path: 'newQuestion', component: CreateQuestionComponent },
  { path: 'questionlist', component: QuestionListComponent },
  { path: 'quizaffiche', component: QuizafficheComponent },
  { path: 'questionaffiche', component: QuestionafficheComponent },
  { path: 'startquiz', component: StartQuizzComponent },
  { path: 'quizz/:title', component: QuizzComponent },
  { path: 'submit-quizz/:userId/:quizId', component: SubmitQuizzComponent },
  { path: 'quizstat', component: QuizStatisticsComponent },
  { path: 'calend', component: CalendarComponent },
  { path: 'quizsched', component: QuizScheduleComponent }, // Set the home page as the default route
  { path: 'home', component: HomepageComponent }, // Set the home page as the default route




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
      component: UsersTableComponent,
      canActivate: [RoleGuardService],
      data: {
        expectedRole: 'SUPERADMIN'
      },
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