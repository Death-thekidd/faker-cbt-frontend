import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ListboxFilterOptions } from 'primeng/listbox';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-add-exam-questions',
  templateUrl: './add-exam-questions.component.html',
  styleUrl: './add-exam-questions.component.scss',
})
export class AddExamQuestionsComponent implements OnInit {
  @Input() examId?: string;
  isLoading: boolean = true;
  filterValue = '';
  questions?: any;
  selectedQuestions?: any = [];
  exam?: any;
  loading = false;

  constructor(
    private questionService: QuestionService,
    private message: NzMessageService,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.questionService.getAll().subscribe(
      (response: any) => {
        this.questions = response.data.map((question: any) => {
          return {
            ...question,
            options: JSON.parse(question.options),
          };
        });
        this.list = this.questions;
        this.getExamDetails(this.examId!);
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  list: TransferItem[] = [];
  getData(): void {
    let ret: TransferItem[] = [];
    this.questionService.getAll().subscribe(
      (response: any) => {
        this.list = response.data;
        this.questions = response.data;
        ret = response.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
    //this.list = ret;
  }

  reload(direction: string): void {
    this.getData();
    this.message.success(`your clicked ${direction}!`, { nzDuration: 7000 });
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    const getList: any = ret;
    console.log('nzChange', getList.list);
  }

  myResetFunction(options: any) {
    options.reset();
    this.filterValue = '';
  }
  addQuestions() {
    this.loading = true;
    const submissionQuestions = new Array(this.selectedQuestions.length)
      .fill(0)
      .map((_, index) => ({
        examId: this.examId,
        questionId: this.selectedQuestions[index].id,
      }));

    this.examService.bulkCreateExamQuestions(submissionQuestions).subscribe(
      (response: any) => {
        this.message.success(response.message, { nzDuration: 7000 });
      },
      (error: any) => {
        this.message.error(error, { nzDuration: 7000 });
      }
    );
    this.loading = false;
    console.info(submissionQuestions);
  }

  getExamDetails(id: string) {
    this.examService.getExamById(id).subscribe(
      (response: any) => {
        this.exam = response.data;
      },
      (error: any) => {
        this.message.error(error, { nzDuration: 7000 });
      }
    );
  }
}
