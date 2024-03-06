import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/quiz.service';
import { QuestionPlay } from './create-question.playload';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionaffiche',
  templateUrl: './questionaffiche.component.html',
  styleUrls: ['./questionaffiche.component.css'],
  providers: [QuizService]

})
export class QuestionafficheComponent implements OnInit {
  questions: QuestionPlay[] = [];
  updateForm: FormGroup;
  selectedQuestion: QuestionPlay | null = null;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute, private formBuilder: FormBuilder){
      this.updateForm = this.formBuilder.group({
        _id: [''],
        questionText: ['', Validators.required],
        options: [[], Validators.required],
        score: [0, Validators.required],
        correctOption: [0, Validators.required],
        explication: ['', Validators.required],
        notequstion: [0, Validators.required],
        dureequestion: [0, Validators.required]
      })
    }
ngOnInit(): void {
  this.loadQuestions(); // Load questions only if quizId is available

}
loadQuestions() {
  this.quizService.getAllQuestions().subscribe((data: any) => {
    this.questions = data;
  });
}
selectQuestionForUpdate(question: QuestionPlay) {
  this.selectedQuestion = question;
  this.updateForm.patchValue(question); // Pre-populate the form with selected question data
}
updateQuestion(_id: string | undefined) {
  if (!_id) {
    console.error('Question ID is undefined.');
    return;
  }

  const questionToUpdate = this.updateForm.value;
  questionToUpdate._id = _id;

  this.quizService.updateQuestion(_id, questionToUpdate).subscribe(
    updatedQuestion => {
      console.log('Question updated:', updatedQuestion);
      Swal.fire("Question updated successfully");
      this.refreshPage();
    },
    error => {
      console.error('Error updating question:', error);
    }
  );
}
refreshPage() {
  window.location.reload();
}
deleteQuestion(questionId: string): void {
  this.quizService.deleteQuestion(questionId).subscribe(
    () => {
      this.questions = this.questions.filter(question => question._id !== questionId);
      console.log('Question deleted successfully');
      Swal.fire("would you like to delete this question");

    },
    error => {
      console.error('Error deleting question:', error);
    }
  );
}
navigateToQuiz() {
  this.router.navigate(['/quizaffiche']);
}  
}