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
import moment from 'moment';

@Component({
  selector: 'app-add-bulk-questions',
  templateUrl: './add-bulk-questions.component.html',
  styleUrl: './add-bulk-questions.component.scss',
})
export class AddBulkQuestionsComponent implements OnInit {
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
  questionBody?: string;
  mytext?: string;
  formattedQuestion?: any;

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
    console.log(moment().valueOf());
    this.initializeForm();
    this.getFormData();
  }

  onSubmit() {
    let questionFinalArray: any = [];
    this.submitted = true;

    if (this.inputForm!.invalid) {
      this.inputForm.errors;
      return;
    }

    this.loading = true;

    this.courseService.getById(this.f.course.value).subscribe(
      (course: any) => {
        console.info(course.data.code);
        let courseCode = course.data.code.replace(/\s+/g, '');
        const questionNoPrefix = `QS-${courseCode}`;

        for (let i = 0; i < this.formattedQuestion[0].length; i++) {
          let questionName = `${questionNoPrefix}-${moment(Date.now()).format(
            'DD-MM-YYYY-HH-MM-SS'
          )}-${i}`;
          questionFinalArray.push({
            name: questionName,
            questiontypeId: this.f.questiontype.value,
            courseId: this.f.course.value,
            questionText: this.formattedQuestion[0][i],
            options: this.formattedQuestion[1][i],
            answer: this.formattedQuestion[2][i],
          });
        }

        console.log(questionFinalArray);
        this.questionService.bulkCreate(questionFinalArray).subscribe(
          (response: any) => {
            this.message.success(response.message);
            this.loading = false;
          },
          (error: any) => {
            this.message.error(error);
            this.loading = false;
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  initializeForm() {
    this.inputForm = this.formBuilder.group({
      allQuestions: ['', [Validators.required]],
      questiontype: ['', Validators.required],
      course: ['', Validators.required],
    });

    //this.inputForm.setValue(allQuestions:) = text
  }

  setAnswer(value: any) {
    if (value == 1) return '<i class="text-success">True</i>';
    else if (value == 2) return '<i class="text-red">False</i>';
    else return;
  }

  onTextChange() {
    const questionBody = this.f.allQuestions.value;
    const questionArray = questionBody!.split('[*NEXT*]');
    let tempQBody: any = "<ol type='1'>";

    //console.log(questionArray);
    this.formattedQuestion = this.questionFormatter(questionArray);
    //console.log(this.formattedQuestion);
    for (let i = 0; i < this.formattedQuestion[0].length; i++) {
      tempQBody =
        tempQBody + `<li>${this.formattedQuestion[0][i]}<ol type="a">`;

      for (let x = 0; x < this.formattedQuestion[1][i].length; x++) {
        tempQBody =
          tempQBody +
          `<li>${this.formattedQuestion[1][i][x]} ${this.setAnswer(
            this.formattedQuestion[2][i][x]
          )}</li>`;
        //console.log(this.formattedQuestion[1][i][x])
      }
      tempQBody = tempQBody + `</ol></li>`;
      //tempOBody = `<li>${this.formattedQuestion[1][i]}`
    }
    tempQBody = tempQBody + `</ol>`;
    this.questionBody = tempQBody;
  }

  downloadJsonFormat() {
    const date = new Date(Date.now()).toLocaleString();
    this.downloadObjectAsJson(this.formattedQuestion, `Question ${date}`);
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

  questionFormatter(questions: any) {
    let oneQuestionAnswersArray: any = [];
    let oneQuestionArray: any = [];
    let oneQuestionOptionsArray: any = [];

    for (let i = 0; i < questions.length; i++) {
      let tempAnswerArray: any = [];
      let text = questions[i];
      let questionText = text
        .slice(text.indexOf('[*START*]'), text.indexOf('[*a*]'))
        .replace('[*START*]', ' ')
        .trim();
      let option1 = text
        .slice(text.indexOf('[*a*]'), text.indexOf('[*b*]'))
        .replace('[*a*]', ' ')
        .trim();
      let option2 = text
        .slice(text.indexOf('[*b*]'), text.indexOf('[*c*]'))
        .replace('[*b*]', ' ')
        .trim();
      let option3 = text
        .slice(text.indexOf('[*c*]'), text.indexOf('[*d*]'))
        .replace('[*c*]', ' ')
        .trim();
      let option4 = text
        .slice(text.indexOf('[*d*]'), text.indexOf('[*e*]'))
        .replace('[*d*]', ' ')
        .trim();
      let option5 = text
        .slice(text.indexOf('[*e*]'), text.indexOf('[*END*]'))
        .replace('[*e*]', ' ')
        .trim();

      if (option1.includes('[T]')) tempAnswerArray.push(1);
      else if (option1.includes('[F]')) tempAnswerArray.push(2);

      if (option2.includes('[T]')) tempAnswerArray.push(1);
      else if (option2.includes('[F]')) tempAnswerArray.push(2);

      if (option3.includes('[T]')) tempAnswerArray.push(1);
      else if (option3.includes('[F]')) tempAnswerArray.push(2);

      if (option4.includes('[T]')) tempAnswerArray.push(1);
      else if (option4.includes('[F]')) tempAnswerArray.push(2);

      if (option5.includes('[T]')) tempAnswerArray.push(1);
      else if (option5.includes('[F]')) tempAnswerArray.push(2);

      option1 = option1.replace('[T]', ' ').replace('[F]', ' ').trim();
      option2 = option2.replace('[T]', ' ').replace('[F]', ' ').trim();
      option3 = option3.replace('[T]', ' ').replace('[F]', ' ').trim();
      option4 = option4.replace('[T]', ' ').replace('[F]', ' ').trim();
      option5 = option5.replace('[T]', ' ').replace('[F]', ' ').trim();

      oneQuestionArray.push(questionText);
      oneQuestionOptionsArray.push([
        option1,
        option2,
        option3,
        option4,
        option5,
      ]);
      oneQuestionAnswersArray.push(tempAnswerArray);
    }
    //console.log(oneQuestionArray)
    //console.log(oneQuestionOptionsArray)
    //console.log(oneQuestionAnswersArray)

    return [oneQuestionArray, oneQuestionOptionsArray, oneQuestionAnswersArray];
  }

  downloadObjectAsJson(exportObj: any, exportName: any) {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
