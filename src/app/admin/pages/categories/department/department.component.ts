import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DepartmentService } from '../../../../services/department.service';
import { FacultyService } from '../../../../services/faculty.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent {
  departments!: any[];
  listDepartments!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedDepartments!: any[] | null;
  department!: any;
  expandedRows = {};
  submitted: boolean = false;
  departmentDialog: boolean = false;
  faculties?: any[];

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private departmentService: DepartmentService,
    private facultyService: FacultyService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'faculty', header: 'Faculty' },
    ];
    this.loadData(0, 10);

    this.facultyService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.faculties = response.data;
      },
      (error) => {
        this.message.create('error', `${error?.message}`, {
          nzDuration: 7000,
        });
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.departmentService.getAll().subscribe(
      (res: Response<any>) => {
        this.departments = res?.data;
        this.listDepartments = this.departments
          .slice(first, first + rows)
          .map((d, index) => ({
            ...d,
          }));
        this.totalRecords = this.departments.length;
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
    this.department = {};
    this.submitted = false;
    this.departmentDialog = true;
  }
  hideDialog() {
    this.departmentDialog = false;
    this.submitted = false;
  }

  deleteSelectedDepartments() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected departments?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedDepartments) {
          const deleteRequests = this.selectedDepartments.map((department) =>
            this.departmentService.delete(department.id).subscribe(
              () => {
                this.listDepartments = this.listDepartments.filter(
                  (val) => val.id !== department.id
                );
                this.message.create('success', 'Departments Deleted', {
                  nzDuration: 7000,
                });
              },
              (error) => {
                this.message.create(
                  'error',
                  `Error deleting departments: ${error}`,
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
        this.selectedDepartments = null;
      },
    });
  }

  editDepartment(department: any) {
    this.department = { ...department };
    this.departmentDialog = true;
  }

  deleteDepartment(department: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + department.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.departmentService.delete(department.id).subscribe(
          () => {
            this.listDepartments = this.listDepartments.filter(
              (val) => val.id !== department.id
            );
            this.department = {};
            this.message.create('success', 'department Deleted', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create(
              'error',
              `Error deleting department: ${error}`,
              {
                nzDuration: 7000,
              }
            );
          }
        );
      },
    });
  }

  saveDepartment() {
    this.submitted = true;

    if (this.department.name?.trim()) {
      if (this.department.id) {
        // Update block
        this.departments[this.findIndexById(this.department.id)] =
          this.department;
        this.departmentService
          .edit(this.department.id, this.department)
          .subscribe(
            (data) => {
              this.message.create('success', 'department Updated', {
                nzDuration: 7000,
              });
            },
            (error) => {
              this.message.create('error', 'Error creating department', {
                nzDuration: 7000,
              });
            }
          );
      } else {
        // Call create service instead of local logic
        this.departmentService.create(this.department).subscribe(
          (data) => {
            // Use data._id returned from the service
            this.department.id = data?._id; // Assign the returned ID
            this.departments.push(this.department); // Add the new question type
            this.message.create('success', 'department Created', {
              nzDuration: 7000,
            });
            this.departments = [...this.departments]; // Update the list
            this.departmentDialog = false; // Close the dialog
            this.department = {}; // Reset the questionType object
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
    for (let i = 0; i < this.departments.length; i++) {
      if (this.departments[i].id === id) {
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
