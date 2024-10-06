import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuestiontypeService } from '../../../../services/questiontype.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-question-types',
  templateUrl: './question-types.component.html',
  styleUrls: [
    './question-types.component.scss',
    './question-types.component.scss',
  ],
})
export class QuestionTypesComponent implements OnInit {
  questionTypes!: any[];
  questionType!: any;
  listQuestionTypes!: any[];
  selectedQuestionTypes!: any[] | null;
  cols!: any[];
  loading: boolean = true;
  loadingSubmit: boolean = false;
  totalRecords: number = 0;
  submitted: boolean = false;
  questionTypeDialog: boolean = false;

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private questiontypesService: QuestiontypeService,
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'NAME' },
      { field: 'description', header: 'DESCRIPTION' },
    ];
    this.loadData(0, 10);
  }

  clear(table: Table) {
    table.clear();
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.questiontypesService.getAll().subscribe(
      (res: Response<any>) => {
        this.questionTypes = res?.data.slice(first, first + rows);
        this.totalRecords = res?.data.length;
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
    this.questionType = {};
    this.submitted = false;
    this.questionTypeDialog = true;
  }
  hideDialog() {
    this.questionTypeDialog = false;
    this.submitted = false;
  }

  saveQuestionType() {
    this.submitted = true;

    if (this.questionType.name?.trim()) {
      if (this.questionType.id) {
        // Update block
        this.questionTypes[this.findIndexById(this.questionType.id)] =
          this.questionType;
        this.message.create('success', 'Question Type Updated', {
          nzDuration: 7000,
        });
      } else {
        // Call create service instead of local logic
        this.questiontypesService.create(this.questionType).subscribe(
          (data) => {
            // Use data._id returned from the service
            this.questionType.id = data?._id; // Assign the returned ID
            this.questionTypes.push(this.questionType); // Add the new question type
            this.message.create('success', 'Question Type Created', {
              nzDuration: 7000,
            });
            this.questionTypes = [...this.questionTypes]; // Update the list
            this.questionTypeDialog = false; // Close the dialog
            this.questionType = {}; // Reset the questionType object
          },
          (error) => {
            // Handle error response
            this.message.create('error', 'Error creating Question Type', {
              nzDuration: 7000,
            });
          }
        );
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.questionTypes.length; i++) {
      if (this.questionTypes[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
