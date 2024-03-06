import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/quiz.service';

import { QuizPlay } from './create-quiz.payload';
import { QuestionPlay } from '../create-question/create-question.playload';
@Component({
  selector: 'app-quizaffiche',
  templateUrl: './quizaffiche.component.html',
  styleUrls: ['./quizaffiche.component.css'],
  providers: [QuizService]
})
export class QuizafficheComponent implements OnInit {
  

  quizzes: QuizPlay[] = [];
  selectedQuiz: QuizPlay | null = null;
  editedQuiz: QuizPlay | null = null; // Removed
  currentPage: number = 1; // Current page number (default: 1)
  questions: QuestionPlay[] = []; 
  constructor(private quizService: QuizService){}
  ngOnInit(): void {
    this.loadQuizzes();
  }
  loadQuizzes() {
    this.quizService.getAllQuizzes().subscribe((quizzes: QuizPlay[]) => {
      this.quizzes = quizzes;
      console.log('Quizzes fetched:', quizzes); // Log the received data for verification
    });
  }
  selectQuiz(quiz: QuizPlay) {
    this.selectedQuiz = quiz;
    this.loadQuestionsForQuiz(quiz._id!);
  }

  loadQuestionsForQuiz(_id: string) {
    this.quizService.getQuestionsForQuiz(_id).subscribe((questions: QuestionPlay[]) => {
      this.questions = questions;
      console.log('Questions for selected quiz:', questions);
    });
  }
  
}
