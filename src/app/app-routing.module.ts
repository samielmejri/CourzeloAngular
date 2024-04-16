import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { Home2Component } from './components/home2/home2.component';
import { Home3Component } from './components/home3/home3.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { AddRessourceComponent } from './components/add-ressource/add-ressource.component';
import { ListCoursComponent } from './components/list-cours/list-cours.component';
import { ModifierCoursComponent } from './components/modifier-cours/modifier-cours.component';
import { DeleteCoursComponent } from './components/delete-cours/delete-cours.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'signin', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'home2', component: Home2Component},
  {path:'home3', component: Home3Component},
  {path:'courses', component: CoursesComponent},
  {path:'courseDetails/:idRessource', component: CourseDetailsComponent},
  {path:"add-ressource/:id" ,component:AddRessourceComponent },
  {path:"list-cours", component: ListCoursComponent},
  {path:"modifier-cours/:id",component:ModifierCoursComponent},
  {path: 'delete-course/:id', component: DeleteCoursComponent },
  {path: "payment/:prix", component: PaymentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
