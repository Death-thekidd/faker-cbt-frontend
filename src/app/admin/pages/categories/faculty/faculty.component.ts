import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FacultyService } from '../../../../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.scss',
})
export class FacultyComponent {
  faculties!: any[];
  listFaculties!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedFaculties!: any[] | null;
  faculty!: any;
  expandedRows = {};
  submitted: boolean = false;
  facultyDialog: boolean = false;

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private facultyService: FacultyService
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
    this.facultyService.getAll().subscribe(
      (res: Response<any>) => {
        this.faculties = res?.data;
        this.listFaculties = this.faculties
          .slice(first, first + rows)
          .map((f, index) => ({
            ...f,
          }));
        this.totalRecords = this.faculties.length;
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
    this.faculty = {};
    this.submitted = false;
    this.facultyDialog = true;
  }
  hideDialog() {
    this.facultyDialog = false;
    this.submitted = false;
  }

  deleteSelectedFaculties() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected faculties?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedFaculties) {
          const deleteRequests = this.selectedFaculties.map((faculty) =>
            this.facultyService.delete(faculty.id).subscribe(
              () => {
                this.listFaculties = this.listFaculties.filter(
                  (val) => val.id !== faculty.id
                );
                this.message.create('success', 'Faculties Deleted', {
                  nzDuration: 7000,
                });
              },
              (error) => {
                this.message.create(
                  'error',
                  `Error deleting faculties: ${error}`,
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
        this.selectedFaculties = null;
      },
    });
  }

  editFaculty(faculty: any) {
    this.faculty = { ...faculty };
    this.facultyDialog = true;
  }

  deleteFaculty(faculty: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + faculty.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.facultyService.delete(faculty.id).subscribe(
          () => {
            this.listFaculties = this.listFaculties.filter(
              (val) => val.id !== faculty.id
            );
            this.faculty = {};
            this.message.create('success', 'faculty Deleted', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', `Error deleting faculty: ${error}`, {
              nzDuration: 7000,
            });
          }
        );
      },
    });
  }

  saveFaculty() {
    this.submitted = true;

    if (this.faculty.name?.trim()) {
      if (this.faculty.id) {
        // Update block
        this.faculties[this.findIndexById(this.faculty.id)] = this.faculty;
        this.facultyService.edit(this.faculty.id, this.faculty).subscribe(
          (data) => {
            this.message.create('success', 'faculty Updated', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', 'Error creating faculty', {
              nzDuration: 7000,
            });
          }
        );
      } else {
        // Call create service instead of local logic
        this.facultyService.create(this.faculty).subscribe(
          (data) => {
            // Use data._id returned from the service
            this.faculty.id = data?._id; // Assign the returned ID
            this.faculties.push(this.faculty); // Add the new question type
            this.message.create('success', 'faculty Created', {
              nzDuration: 7000,
            });
            this.faculties = [...this.faculties]; // Update the list
            this.facultyDialog = false; // Close the dialog
            this.faculty = {}; // Reset the questionType object
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
    for (let i = 0; i < this.faculties.length; i++) {
      if (this.faculties[i].id === id) {
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
