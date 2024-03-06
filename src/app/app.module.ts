import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { Home2Component } from './components/home2/home2.component';
import { Home3Component } from './components/home3/home3.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ForumComponent } from './components/forum/forum.component';
import { ForumThreadComponent } from './components/forum-thread/forum-thread.component';
import { VoteButtonComponent } from './components/vote-button/vote-button.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditorModule} from '@tinymce/tinymce-angular';
import { ForumHeaderComponent } from './components/forum-header/forum-header.component';
import { PostSidebarComponent } from './components/post-sidebar/post-sidebar.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from './components/article/article.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component'; // Import ReactiveFormsModule
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuizafficheComponent } from './components/quizaffiche/quizaffiche.component';
import { QuestionafficheComponent } from './components/questionaffiche/questionaffiche.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';


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
    ContactComponent,
    SigninComponent,
    SignupComponent,
    Home2Component,
    Home3Component,
    CoursesComponent,
    CourseDetailsComponent,
    ForumComponent,
    ForumThreadComponent,
    VoteButtonComponent,
    ViewPostComponent,
    PostComponent,
    SideBarComponent,
    CreatePostComponent,
    ForumHeaderComponent,
    PostSidebarComponent,
    CreateArticleComponent,
    ConfirmationDialogComponent,
    UpdatePostComponent,
    ArticleComponent,
    LeaderboardComponent,
    UpdateArticleComponent,
  ],
 
  imports: [
    ToastrModule.forRoot(),
    HeaderComponent,
    QuizListComponent,
    CreateQuizComponent,
    CreateQuestionComponent,
    QuestionListComponent,
    QuizafficheComponent,
    QuestionafficheComponent,
    SideBarComponent,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    EditorModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    CommonModule,

  
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
