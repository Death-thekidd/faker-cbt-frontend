import { Component, OnInit } from '@angular/core';
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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrl: './edit-exam.component.scss',
})
export class EditExamComponent implements OnInit {
  isLoading = true;
  val: any;
  sessions?: any;
  examtypes?: any[] = ['MCQ', 'Medical'];
  courses?: any;
  inputForm!: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  startDate?: Date;
  examId?: string;
  exam?: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private examService: ExamService,
    // private examtypeService: ExamtypeService,
    private sessionService: SessionService,
    private message: NzMessageService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.examId = this.route.snapshot.paramMap.get('examId')!;
    this.examService.getExamById(this.examId).subscribe(
      (response: any) => {
        console.log(response);
        this.exam = response.data;
        let hours = Math.floor(this.exam.duration / 60);
        let minutes = this.exam.duration - hours * 60;
        let startDate = this.datepipe.transform(
          new Date(this.exam.startDate),
          'yyyy-MM-dd'
        );
        let endDate = this.datepipe.transform(
          new Date(this.exam.endDate),
          'yyyy-MM-dd'
        );
        this.inputForm = this.formBuilder.group({
          name: [this.exam.name, Validators.required],
          startDate: [startDate, Validators.required],
          endDate: [endDate, Validators.required],
          hours: [hours, [Validators.required, Validators.maxLength(2)]],
          minutes: [minutes, [Validators.required, Validators.maxLength(2)]],
          session: [this.exam.session.id, Validators.required],
          course: [this.exam.course.id, Validators.required],
          type: [this.exam.type, Validators.required],
        });
        this.isLoading = false;
      },
      (error: any) => {
        this.message.error(error);
      }
    );
  }

  onSubmit(nextCallback: any): void {
    let hours = this.f.hours.value * 60;
    let minutes = this.f.minutes.value;
    const duration = hours + minutes;
    this.submitted = true;
    // stop here if form is invalid
    if (this.inputForm!.invalid) {
      this.inputForm.errors;
      return;
    }

    this.loading = true;
    this.examService
      .edit(this.examId!, {
        name: this.f.name.value,
        startDate: this.f.startDate.value,
        endDate: this.f.endDate.value,
        duration: duration,
        sessionId: this.f.session.value,
        type: this.f.type.value,
        courseId: this.f.course.value,
      })
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Success');

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

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
  initializeForm() {
    this.inputForm = this.formBuilder.group({
      ename: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      hours: ['', Validators.required],
      minutes: ['', Validators.required],
      session: ['', Validators.required],
      course: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.sessionService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.sessions = response.data;
        console.log('session', response.data);
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    // this.examtypeService.getAll().subscribe(
    //   (response: Response<any[]>) => {
    //     this.examtypes = response.data;
    //     console.log('examtypes', response.data);
    //   },
    //   (error) => {
    //     this.message.create('error', `${error}`, {
    //       nzDuration: 7000,
    //     });
    //   }
    // );

    this.courseService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.courses = response.data;
        console.log('course', response.data);
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );
  }
}
