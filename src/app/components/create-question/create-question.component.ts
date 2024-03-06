import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/quiz.service';
import { QuestionPlay } from './create-question.playload'; // Adjust the path as necessary
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  createQuestionForm: FormGroup;
  questionPayload: QuestionPlay;

  constructor(private router: Router, private questionService: QuizService) {
    this.createQuestionForm = new FormGroup({
      questionText: new FormControl('', Validators.required),
      options: new FormArray([], Validators.required),
      score: new FormControl(0, [Validators.required, Validators.min(0)]),
      correctOption: new FormControl(0, Validators.required),
      explication: new FormControl('', Validators.required),
      notequstion: new FormControl(0, [Validators.required, Validators.min(0)]),
      dureequestion: new FormControl(0, [Validators.required, Validators.min(0)]),
    });

    this.questionPayload = {
      questionText: '',
      options: [],
      score: 0,
      correctOption: 0,
      explication: '',
      notequstion: 0,
      dureequestion: 0,
    };
  }

  ngOnInit() {
    // Initialization if needed
  }

  get options(): FormArray {
    return this.createQuestionForm.get('options') as FormArray;
  }

  addOption() {
    const optionControl = new FormControl('', Validators.required);
    this.options.push(optionControl);
  }

  createQuestion() {
    if (!this.createQuestionForm.valid) {
      console.error('Form is not valid.');
      return;
    }

    this.questionPayload = this.createQuestionForm.value;

    this.questionService.createQuestion(this.questionPayload).subscribe(
      (data) => {
        console.log('Question successfully created:', data);
        this.router.navigateByUrl('/question'); // Adjust routing as necessary
      },
      (error) => {
        throwError(error);
        console.error('Error creating question:', error);
      }
    );
  }
}
