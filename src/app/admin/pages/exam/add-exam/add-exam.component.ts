import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { ExamtypeService } from '../../../../services/examtype.service';
import { CourseService } from '../../../../services/course.service';
import { SessionService } from '../../../../services/session.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ExamService } from '../../../../services/exam.service';
import { getISOWeek } from 'date-fns';
import { StepperContent } from 'primeng/stepper';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.scss',
})
export class AddExamComponent implements OnInit {
  val: any;
  sessions?: any;
  examtypes?: any;
  courses?: any;
  inputForm!: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  startDate?: Date;
  exam?: any;
  examId?: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private examService: ExamService,
    private examtypeService: ExamtypeService,
    private sessionService: SessionService,
    private message: NzMessageService,
    private courseService: CourseService
  ) {}

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  ngOnInit(): void {
    this.sessionService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.sessions = response.data;
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    this.examtypeService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.examtypes = response.data;
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    this.courseService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.courses = response.data;
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    this.inputForm = this.formBuilder.group({
      ename: ['', [Validators.required, Validators.minLength(5)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      hours: ['', [Validators.required, Validators.maxLength(2)]],
      minutes: ['', [Validators.required, Validators.maxLength(2)]],
      session: ['', Validators.required],
      course: ['', Validators.required],
      examtype: ['', Validators.required],
    });
  }

  onSubmit(nextCallback: any): void {
    let hours = this.f.hours.value * 60;
    let minutes = this.f.minutes.value;
    const duration = hours + minutes;
    this.submitted = true;
    console.log(this.f.startDate.value);
    // stop here if form is invalid
    if (this.inputForm!.invalid) {
      this.inputForm.errors;
      return;
    }

    this.loading = true;
    console.log(this.f.startDate.value);
    this.examService
      .create({
        name: this.f.ename.value,
        startDate: this.f.startDate.value,
        endDate: this.f.endDate.value,
        duration: duration,
        sessionId: this.f.session.value,
        examtypeId: this.f.examtype.value,
        courseId: this.f.course.value,
      })
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Success');
          this.exam = data?.data;
          this.examId = this.exam?.id;
          this.inputForm = this.formBuilder.group({
            ename: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            hours: ['', Validators.required],
            minutes: ['', Validators.required],
            session: ['', Validators.required],
            course: ['', Validators.required],
            examtype: ['', Validators.required],
          });
          this.loading = false;
          this.submitted = false;
          this.message.create('success', `${data.message}`, {
            nzDuration: 7000,
          });
          nextCallback.emit();
          //this.router.navigate([this.returnUrl]);
        },
        (error) => {
          alert(error);
          this.error = error;
          this.message.create('error', `${error}`, {
            nzDuration: 7000,
          });
          this.loading = false;
        }
      );
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.inputForm!.controls;
  }
}
