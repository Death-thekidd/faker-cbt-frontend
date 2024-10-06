import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { SemesterService } from '../../../../services/semester.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrl: './semester.component.scss',
})
export class SemesterComponent {
  semesters!: any[];
  listSemesters!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedSemesters!: any[] | null;
  semester!: any;
  expandedRows = {};
  submitted: boolean = false;
  semesterDialog: boolean = false;

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private semesterService: SemesterService
  ) {}

  ngOnInit(): void {
    this.cols = [{ field: 'name', header: 'Name' }];
    this.loadData(0, 10);
  }

  clear(table: Table) {
    table.clear();
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.semesterService.getAll().subscribe(
      (res: Response<any>) => {
        this.semesters = res?.data;
        this.listSemesters = this.semesters
          .slice(first, first + rows)
          .map((q, index) => ({
            ...q,
            id: q?._id,
            options: JSON.parse(q?.options),
            answer: JSON.parse(q?.answer),
          }));
        this.totalRecords = this.semesters.length;
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
    this.semester = {};
    this.submitted = false;
    this.semesterDialog = true;
  }
  hideDialog() {
    this.semesterDialog = false;
    this.submitted = false;
  }

  deleteSelectedSemesters() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected courses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedSemesters) {
          const deleteRequests = this.selectedSemesters.map((course) =>
            this.semesterService.delete(course.id).subscribe(
              () => {
                this.listSemesters = this.listSemesters.filter(
                  (val) => val.id !== course.id
                );
                this.message.create('success', 'Courses Deleted', {
                  nzDuration: 7000,
                });
              },
              (error) => {
                this.message.create(
                  'error',
                  `Error deleting courses: ${error}`,
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
        this.selectedSemesters = null;
      },
    });
  }

  editSemester(semester: any) {
    this.semester = { ...semester };
    this.semesterDialog = true;
  }

  deleteSemester(semester: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + semester.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.semesterService.delete(semester.id).subscribe(
          () => {
            this.listSemesters = this.listSemesters.filter(
              (val) => val.id !== semester.id
            );
            this.semester = {};
            this.message.create('success', 'semester Deleted', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', `Error deleting semester: ${error}`, {
              nzDuration: 7000,
            });
          }
        );
      },
    });
  }

  saveSemester() {
    this.submitted = true;

    if (this.semester.name?.trim()) {
      if (this.semester.id) {
        // Update block
        this.semesters[this.findIndexById(this.semester.id)] = this.semester;
        this.semesterService.edit(this.semester.id, this.semester).subscribe(
          (data) => {
            this.message.create('success', 'semester Updated', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', 'Error creating semester', {
              nzDuration: 7000,
            });
          }
        );
      } else {
        // Call create service instead of local logic
        this.semesterService.create(this.semester).subscribe(
          (data) => {
            // Use data._id returned from the service
            this.semester.id = data?._id; // Assign the returned ID
            this.semesters.push(this.semester); // Add the new question type
            this.message.create('success', 'semester Created', {
              nzDuration: 7000,
            });
            this.semesters = [...this.semesters]; // Update the list
            this.semesterDialog = false; // Close the dialog
            this.semester = {}; // Reset the questionType object
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
    for (let i = 0; i < this.semesters.length; i++) {
      if (this.semesters[i].id === id) {
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
