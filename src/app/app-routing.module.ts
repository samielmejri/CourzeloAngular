import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { Home2Component } from './components/home2/home2.component';
import { Home3Component } from './components/home3/home3.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ForumComponent } from './components/forum/forum.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { ArticleComponent } from './components/article/article.component';
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'signin', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'home2', component: Home2Component},
  {path:'home3', component: Home3Component},
  {path:'courses', component: CoursesComponent},
  {path:'courseDetails', component: CourseDetailsComponent},
  {path:'forum', component: ForumComponent},
  {path:'forum/:id', component: ForumComponent},
  {path:'article', component: ArticleComponent},
  { path: 'post/:id', component: ViewPostComponent },
  { path: 'newPost', component: CreatePostComponent },
  { path: 'newArticle', component: CreateArticleComponent },
  { path: 'updatePost/:postId', component: UpdatePostComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
