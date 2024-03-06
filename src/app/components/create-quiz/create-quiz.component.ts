
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { QuizService } from 'src/app/quiz.service';
import { QuizPlay } from './create-quiz.payload';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { QuestionPlay } from '../create-question/create-question.playload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],

})
export class CreateQuizComponent implements OnInit {
  createQuizForm: FormGroup;
  quizPayload: QuizPlay;
  title = new FormControl('');
  score = new FormControl('');
  numberOfQuestions = new FormControl('');
  attemptsAllowed = new FormControl('');
  randomizeQuestions = new FormControl('');
  visibilite = new FormControl('');
  dureequiz = new FormControl('');

  constructor(private router: Router, private quizService: QuizService) {
    this.createQuizForm = new FormGroup({
      title: new FormControl('', Validators.required),
      score: new FormControl('', Validators.required),
      numberOfQuestions: new FormControl('', Validators.required),
      attemptsAllowed: new FormControl('', Validators.required),
      randomizeQuestions: new FormControl('', Validators.required),
      visibilite: new FormControl('', Validators.required),
      dureequiz: new FormControl('', Validators.required),
    });
    this.quizPayload = {
    
      title:'',
      score: 0,
      numberOfQuestions: 0,
      attemptsAllowed: 0,
      randomizeQuestions: false,
      visibilite: false,
      dureequiz: 0,
    };
  }

  ngOnInit() {
    this.createQuizForm = new FormGroup({
      title: new FormControl('',Validators.required),
      score: new FormControl('', Validators.required),
      numberOfQuestions: new FormControl('', Validators.required),
      attemptsAllowed: new FormControl('', Validators.required),
      randomizeQuestions: new FormControl('', Validators.required),
      visibilite: new FormControl('', Validators.required),
      dureequiz: new FormControl('', Validators.required),
      
    });

    this.quizPayload = {
     
      title:'',
      score: 0,
      numberOfQuestions: 0,
      attemptsAllowed: 0,
      randomizeQuestions: false,
      visibilite: false,
      dureequiz: 0,
    };
   
  }

  createQuiz() {
    if (!this.createQuizForm || !this.quizPayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }
    

    const titleControl = this.createQuizForm.get('title');
    if (titleControl) {
      this.quizPayload.title = titleControl.value || '';
    }

    const scoreControl = this.createQuizForm.get('score');
    if (scoreControl) {
      this.quizPayload.score = scoreControl.value || 0;
    }

    const numberOfQuestionsControl = this.createQuizForm.get('numberOfQuestions');
    if (numberOfQuestionsControl) {
      this.quizPayload.numberOfQuestions = numberOfQuestionsControl.value || 0;
    }

    const attemptsAllowedControl = this.createQuizForm.get('attemptsAllowed');
    if (attemptsAllowedControl) {
      this.quizPayload.attemptsAllowed = attemptsAllowedControl.value || 0;
    }

    const randomizeQuestionsControl = this.createQuizForm.get('randomizeQuestions');
    if (randomizeQuestionsControl) {
      this.quizPayload.randomizeQuestions = randomizeQuestionsControl.value || false;
    }

    const visibiliteControl = this.createQuizForm.get('visibilite');
    if (visibiliteControl) {
      this.quizPayload.visibilite = visibiliteControl.value || false;
    }

    const dureequizControl = this.createQuizForm.get('dureequiz');
    if (dureequizControl) {
      this.quizPayload.dureequiz = dureequizControl.value || 0;
    }
    

    this.quizService.createQuiz(this.quizPayload).subscribe(
      (data) => {
        this.quizPayload._id = data._id;
        this.router.navigate(['/questionlist'], { queryParams: { _id: data._id } });
        Swal.fire("quiz Added succesfully");

      },  
      (error) => {
        throwError(error);
        console.error('Error creating quiz:', error);
        Swal.fire("ERROR VERIFY ");

      }
    );
  }
  

}
