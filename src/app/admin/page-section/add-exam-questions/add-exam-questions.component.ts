import { Component, Input, OnInit } from '@angular/core';
import { ExamquestionService } from '../../../services/examquestion.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-add-exam-questions',
  templateUrl: './add-exam-questions.component.html',
  styleUrls: ['./add-exam-questions.component.scss'],
})
export class AddExamQuestionsComponent implements OnInit {
  @Input() examId?: string;
  isLoading: boolean = true;
  filterValue = '';
  questionsNotAdded: any[] = [];
  questionsAdded: any[] = [];
  selectedQuestions: any[] = [];
  exam: any;
  loading = false;

  constructor(
    private examquestionService: ExamquestionService,
    private message: NzMessageService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    if (this.examId) {
      this.fetchQuestions();
      this.getExamDetails(this.examId);
    }
  }

  // Fetch both not added and added questions for the exam
  fetchQuestions() {
    this.isLoading = true;

    // Fetch questions not yet added to the exam
    this.examquestionService.getAllNotAdded(this.examId).subscribe(
      (response: any) => {
        this.questionsNotAdded = response.data;
        this.isLoading = false;
      },
      (error: any) => {
        this.message.error('Failed to load questions not added.', {
          nzDuration: 5000,
        });
        this.isLoading = false;
      }
    );

    // Fetch questions already added to the exam
    this.examquestionService.getAllAdded(this.examId).subscribe(
      (response: any) => {
        this.questionsAdded = response.data;
        this.isLoading = false;
      },
      (error: any) => {
        this.message.error('Failed to load added questions.', {
          nzDuration: 5000,
        });
        this.isLoading = false;
      }
    );
  }

  // Add selected questions to the exam
  addQuestions() {
    this.loading = true;

    const submissionQuestions = this.selectedQuestions.map(
      (question: any) => question.id
    );

    this.examquestionService
      .create(submissionQuestions, this.examId)
      .subscribe(
        (response: any) => {
          this.message.success(response.message, { nzDuration: 5000 });
          this.fetchQuestions(); // Reload the lists after adding questions
        },
        (error: any) => {
          this.message.error('Failed to add questions.', { nzDuration: 5000 });
        }
      )
      .add(() => (this.loading = false));
  }

  // Delete a question from the exam
  deleteQuestion(questionId: string) {
    this.loading = true;

    this.examquestionService
      .delete(this.examId, questionId)
      .subscribe(
        () => {
          this.message.success('Question removed from the exam.', {
            nzDuration: 5000,
          });
          this.fetchQuestions(); // Reload the lists after deletion
        },
        (error: any) => {
          this.message.error('Failed to delete the question.', {
            nzDuration: 5000,
          });
        }
      )
      .add(() => (this.loading = false));
  }

  // Fetch details for the current exam
  getExamDetails(id: string) {
    this.examService.getExamById(id).subscribe(
      (response: any) => {
        this.exam = response.data;
      },
      (error: any) => {
        this.message.error('Failed to load exam details.', {
          nzDuration: 5000,
        });
      }
    );
  }
}
