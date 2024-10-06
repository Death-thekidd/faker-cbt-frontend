import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { LevelService } from '../../../../services/level.service';
import { SemesterService } from '../../../../services/semester.service';
import { DepartmentService } from '../../../../services/department.service';
import { data } from 'jquery';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent implements OnInit {
  courses!: any[];
  listCourses!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedCourses!: any[] | null;
  course!: any;
  expandedRows = {};
  submitted: boolean = false;
  courseDialog: boolean = false;
  levels?: any[];
  semesters?: any[];
  departments?: any[];

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private courseService: CourseService,
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private levelService: LevelService,
    private semesterService: SemesterService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'code', header: 'Code' },
      { field: 'level', header: 'Level' },
      { field: 'department', header: 'Department' },
      { field: 'semester', header: 'Semester ' },
    ];
    this.loadData(0, 10);

    this.levelService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.levels = response.data;
      },
      (error) => {
        this.message.create('error', `${error?.message}`, {
          nzDuration: 7000,
        });
      }
    );

    this.departmentService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.departments = response.data;
      },
      (error) => {
        this.message.create('error', `${error?.message}`, {
          nzDuration: 7000,
        });
      }
    );

    this.semesterService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.semesters = response.data;
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
    this.courseService.getAll().subscribe(
      (res: Response<any>) => {
        this.courses = res?.data;
        this.listCourses = this.courses
          .slice(first, first + rows)
          .map((c, index) => ({
            ...c,
          }));
        this.totalRecords = this.courses.length;
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
    this.course = {};
    this.submitted = false;
    this.courseDialog = true;
  }
  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }

  deleteSelectedCourses() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected courses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedCourses) {
          const deleteRequests = this.selectedCourses.map((course) =>
            this.courseService.delete(course.id).subscribe(
              () => {
                this.listCourses = this.listCourses.filter(
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
        this.selectedCourses = null;
      },
    });
  }

  editCourse(course: any) {
    this.course = { ...course };
    this.courseDialog = true;
  }

  deleteCourse(course: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + course.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.delete(course.id).subscribe(
          () => {
            this.listCourses = this.listCourses.filter(
              (val) => val.id !== course.id
            );
            this.course = {};
            this.message.create('success', 'Course Deleted', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', `Error deleting course: ${error}`, {
              nzDuration: 7000,
            });
          }
        );
      },
    });
  }

  saveCourse() {
    this.submitted = true;

    if (this.course.name?.trim()) {
      if (this.course.id) {
        // Update block
        this.courses[this.findIndexById(this.course.id)] = this.course;
        this.courseService.edit(this.course.id, this.course).subscribe(
          (data) => {
            this.message.create('success', 'Course Updated', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', 'Error creating Course', {
              nzDuration: 7000,
            });
          }
        );
      } else {
        // Call create service instead of local logic
        this.courseService.create(this.course).subscribe(
          (data) => {
            // Use data._id returned from the service
            this.course.id = data?._id; // Assign the returned ID
            this.courses.push(this.course); // Add the new question type
            this.message.create('success', 'Course Created', {
              nzDuration: 7000,
            });
            this.courses = [...this.courses]; // Update the list
            this.courseDialog = false; // Close the dialog
            this.course = {}; // Reset the questionType object
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
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id === id) {
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
