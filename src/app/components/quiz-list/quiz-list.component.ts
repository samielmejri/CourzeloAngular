import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizPlay } from './create-quiz.payload';
import { QuestionPlay } from '../create-question/create-question.playload';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],

  providers: [QuizService]
})
export class QuizListComponent implements OnInit {
  quizzes: QuizPlay[] = [];
  updateForm: FormGroup;
  selectedQuiz: QuizPlay | null = null;
  editedQuiz: QuizPlay | null = null; // Removed
  currentPage: number = 1; // Current page number (default: 1)
  questions: QuestionPlay[] = []; // Add this to store questions of the selected quiz



  constructor(private quizService: QuizService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      score: [0, Validators.required],
      numberOfQuestions: [0, Validators.required],
      attemptsAllowed: [0, Validators.required],
      randomizeQuestions: [false, Validators.required],
      visibilite: [false, Validators.required],
      dureequiz: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  selectQuizForUpdate(quiz: QuizPlay) {
    this.selectedQuiz = quiz;
    this.updateForm.patchValue(quiz); // Pre-populate the form with selected quiz data

    // Fetch questions for the selected quiz
    if (quiz._id) { // Ensure the quiz has an ID
      this.quizService.getQuestionsForQuiz(quiz._id).subscribe(
        questions => {
          this.questions = questions; // Store the fetched questions
          console.log('Questions for selected quiz:', questions);

        },
      );
    }
  }

  loadQuizzes() {
    this.quizService.getAllQuizzes().subscribe((quizzes: QuizPlay[]) => {
      this.quizzes = quizzes;
      console.log('Quizzes fetched:', quizzes); // Log the received data for verification
    });
  }
  startEditingQuiz(quiz: QuizPlay) {
    this.editedQuiz = quiz; // Removed (commented out to preserve intent)
    this.updateForm.patchValue(quiz); // Pre-populate the form with selected quiz data
  }


  updateQuiz(_id: string | undefined) {
    if (!_id) {
      console.error('Quiz ID is undefined.');
      return;
    }

    const quizToUpdate = this.updateForm.value;
    quizToUpdate._id = _id;

    this.quizService.updateQuiz(_id, quizToUpdate).subscribe(
      updatedQuiz => {
        console.log('Quiz updated:', updatedQuiz);
        Swal.fire("quiz updated succesfully");
        refreshPage() {
        window.location.reload();
      }

      },
      error => {
        console.error('Error updating quiz:', error);
      }
    );
  }
 

 

  deleteQuiz(quizId: string): void {
    this.quizService.deleteQuiz(quizId).subscribe(
      () => {
        // Remove the deleted quiz from the list
        this.quizzes = this.quizzes.filter(quiz => quiz._id !== quizId);
        console.log('Quiz deleted successfully');
      },
      error => {
        console.error('Error deleting quiz:', error);
      }
    );
  }
}

