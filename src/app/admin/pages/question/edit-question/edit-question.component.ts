import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../../models/department';
import { DepartmentService } from '../../../../services/department.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { FacultyService } from '../../../../services/faculty.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SessionService } from '../../../../services/session.service';
import { CourseService } from '../../../../services/course.service';
import { Faculty } from '../../../../models/faculty';
import { Course } from '../../../../models/course';
import { Session } from '../../../../models/session';
import { QuestiontypeService } from '../../../../services/questiontype.service';
import { QuestionService } from '../../../../services/question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss',
})
export class EditQuestionComponent {
  tableData?: Department[];
  faculties?: Faculty[];
  departments?: Department[];
  sessions?: Session[];
  courses?: Course[];
  questiontypes?: any[];
  questions?: any[];
  val: any;
  examtypes?: any;
  inputForm!: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  questionType?: string;
  parsedOptions!: any[];
  parsedAnswers!: any[];

  question?: any;
  isLoading: boolean = true;
  questionId?: any;

  constructor(
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private sessionService: SessionService,
    private courseService: CourseService,
    private questionTypesService: QuestiontypeService,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getFormData();
    this.initializeForm();
    this.questionId = this.route.snapshot.paramMap.get('questionId')!;
    this.questionService.getById(this.questionId).subscribe(
      (response: any) => {
        this.question = response.data;
        this.parsedOptions = JSON.parse(this?.question?.options);
        console.log(this.parsedOptions);
        this.parsedAnswers = JSON.parse(this?.question?.answer);
        console.log(this.parsedAnswers);
        this.inputForm = this.formBuilder.group({
          questionText: [this.question.questionText, [Validators.required]],
          questiontype: [this.question.questiontypeId, Validators.required],
          course: [this.question.courseId, Validators.required],
          option1: [this.parsedOptions[0], Validators.required],
          option2: [this.parsedOptions[1], [Validators.required]],
          option3: [this.parsedOptions[2], [Validators.required]],
          option4: [this.parsedOptions[3], Validators.required],
          option5: [this.parsedOptions[4], Validators.required],
          answer1: [this.parsedAnswers[0], Validators.required],
          answer2: [this.parsedAnswers[1], [Validators.required]],
          answer3: [this.parsedAnswers[2], [Validators.required]],
          answer4: [this.parsedAnswers[3], Validators.required],
          answer5: [this.parsedAnswers[4], Validators.required],
        });
        this.isLoading = false;
      },
      (error: any) => {
        this.message.error(error);
      }
    );

    //this.getPageParam();
  }

  public onSubmit() {
    //const courseId=(<HTMLInputElement>document.getElementById(`course`)).value
    this.message.info('Submitted');
    this.submitted = true;
    // stop here if form is invalid

    if (this.inputForm!.invalid) {
      this.inputForm.errors;
      return;
    }

    this.loading = true;
    const option: any = [
      this.f.option1.value,
      this.f.option2.value,
      this.f.option3.value,
      this.f.option4.value,
      this.f.option5.value,
    ];

    const answer: any = [
      this.f.answer1.value,
      this.f.answer2.value,
      this.f.answer3.value,
      this.f.answer4.value,
      this.f.answer5.value,
    ];

    const questionData = {
      questionText: this.f.questionText.value,
      questiontypeId: this.f.questiontype.value,
      options: option,
      courseId: this.f.course.value,
      answer: answer,
    };

    console.log(questionData);
    this.questionService.edit(this.questionId, questionData).subscribe(
      (response: any) => {
        this.message.info(response.message);
        this.loading = false;
      },
      (error: any) => {
        this.message.error(error);
      }
    );
  }

  initializeForm() {
    this.inputForm = this.formBuilder.group({
      questionText: ['', [Validators.required]],
      questiontype: ['', Validators.required],
      course: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', [Validators.required]],
      option3: ['', [Validators.required]],
      option4: ['', Validators.required],
      option5: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', Validators.required],
      answer5: ['', Validators.required],
    });
  }

  /**
   * Get the Route Parameter (question number) of Page
   */
  public getPageParam() {
    this.route.queryParams.subscribe(
      (params: any) => {
        this.questionType = params['question-type'];
        this.message.info(this.questionType!);
      },
      (error: any) => {
        this.message.error(error);
        this.questionType = '';
      }
    );
  }

  getFormData() {
    this.departmentService.getAll().subscribe(
      (response: Response<Department[]>) => {
        this.departments = response.data;
        //console.log(response.data)
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    this.facultyService.getAll().subscribe(
      (response: Response<Faculty[]>) => {
        this.faculties = response.data;
        //console.log(response.data)
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    this.courseService.getAll().subscribe(
      (response: Response<Course[]>) => {
        this.courses = response.data;
        //console.log(response.data)
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    this.questionTypesService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.questiontypes = response.data;
        //console.log(response.data)
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );

    this.questionService.getAll().subscribe(
      (response: Response<any[]>) => {
        this.questions = response.data;
        //console.log(response.data)
      },
      (error) => {
        this.message.create('error', `${error}`, {
          nzDuration: 7000,
        });
      }
    );
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.inputForm!.controls;
  }
}
