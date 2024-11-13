import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamService } from '../../../../services/exam.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  exams!: any[];
  listExams!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedExams!: any[] | null;
  question!: any;
  expandedRows = {};

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private examService: ExamService,
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'courseCode', header: 'Course Code' },
      { field: 'level', header: 'Level' },
      { field: 'department', header: 'Department' },
      { field: 'semester', header: 'Semester ' },
      { field: 'sessionName', header: 'Session ' },
      { field: 'faculty', header: 'Faculty ' },
      { field: 'startDate', header: 'Start Date ' },
      { field: 'duration', header: 'Duration ' },
    ];
    this.loadData(0, 10);
  }

  clear(table: Table) {
    table.clear();
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.examService.getAll().subscribe(
      (res: Response<any>) => {
        this.exams = res?.data;
        this.listExams = this.exams
          .slice(first, first + rows)
          .map((e, index) => ({
            ...e,
          }));
        console.log(this.listExams);
        this.totalRecords = this.exams.length;
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
    this.router.navigate(['/admin/exam/add']);
  }

  bulkAdd() {
    this.router.navigate(['/admin/exam/add-bulk']);
  }

  deleteSelectedExams() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected exams?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedExams) {
          const deleteRequests = this.selectedExams.map((exam) =>
            this.examService.delete(exam.id).subscribe(
              () => {
                this.listExams = this.listExams.filter(
                  (val) => val.id !== exam.id
                );
                this.message.create('success', 'Exams Deleted', {
                  nzDuration: 7000,
                });
              },
              (error) => {
                this.message.create(
                  'error',
                  `Error deleting question: ${error}`,
                  {
                    nzDuration: 7000,
                  }
                );
              }
            )
          );

          // Optional: If you want to wait for all delete requests to finish
          // you can use forkJoin from 'rxjs' to handle multiple observables.
        }
        this.selectedExams = null;
      },
    });
  }

  editExam(exam: any) {
    // this.product = { ...product };
    // this.productDialog = true;
    this.router.navigate(['/admin/exam/edit/' + exam?.id]);
  }

  deleteExam(exam: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + exam.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.examService.delete(exam.id).subscribe(
          () => {
            this.listExams = this.listExams.filter((val) => val.id !== exam.id);
            this.question = {};
            this.message.create('success', 'Exam Deleted', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', `Error deleting exam: ${error}`, {
              nzDuration: 7000,
            });
          }
        );
      },
    });
  }

  expandAll() {
    this.expandedRows = this.exams.reduce(
      (acc, q) => (acc[q.name] = true) && acc,
      {}
    );
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
