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
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component'; // Import here
import { QuestionListComponent } from './components/question-list/question-list.component'; // Import here
import { QuizafficheComponent } from './components/quizaffiche/quizaffiche.component';
import { QuestionafficheComponent } from './components/questionaffiche/questionaffiche.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

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
  { path: 'updateArticle/:articleId', component: UpdateArticleComponent },
  { path: 'quizl', component: QuizListComponent },
  { path: 'newQuiz', component: CreateQuizComponent },
  { path: 'newQuestion', component: CreateQuestionComponent },
  { path: 'questionlist', component: QuestionListComponent },
  { path: 'quizaffiche', component: QuizafficheComponent },
  { path: 'questionaffiche', component: QuestionafficheComponent },
  { path: 'sidebar', component: SideBarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
