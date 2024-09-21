import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questions!: any[];
  listQuestions!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedQuestions!: any[] | null;
  question!: any;
  expandedRows = {};

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private questionService: QuestionService,
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'course', header: 'Course' },
      { field: 'name', header: 'Name' },
      { field: 'level', header: 'Level' },
      { field: 'department', header: 'Department' },
      { field: 'semester', header: 'Semester ' },
      { field: 'questiontype', header: 'Question Type' },
    ];
    this.loadData(0, 10);
  }

  clear(table: Table) {
    table.clear();
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.questionService.getAll().subscribe(
      (res: Response<any>) => {
        this.questions = res?.data;
        this.listQuestions = this.questions
          .slice(first, first + rows)
          .map((q, index) => ({
            ...q,
            options: JSON.parse(q?.options),
            answer: JSON.parse(q?.answer),
          }));
        this.totalRecords = this.questions.length;
        this.loading = false;
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
        this.loading = false;
      }
    );
  }
  filterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.dt1.filterGlobal(value, 'contains');
  }
  openNew() {
    this.router.navigate(['/add-question']);
  }

  deleteSelectedQuestions() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected questions?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listQuestions = this.listQuestions.filter(
          (val) => !this.selectedQuestions?.includes(val)
        );
        this.selectedQuestions = null;
        this.message.create('success', 'Questions Deleted', {
          nzDuration: 7000,
        });
      },
    });
  }

  editQuestion(question: any) {
    // this.product = { ...product };
    // this.productDialog = true;
    this.router.navigate(['/edit-question']);
  }

  deleteQuestion(question: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + question.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listQuestions = this.listQuestions.filter(
          (val) => val.id !== question.id
        );
        this.question = {};
        this.message.create('success', 'Product Deleted', {
          nzDuration: 7000,
        });
      },
    });
  }

  expandAll() {
    this.expandedRows = this.questions.reduce(
      (acc, q) => (acc[q.name] = true) && acc,
      {}
    );
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
