import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../../models/department';
import { DepartmentService } from '../../../../services/department.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { FacultyService } from '../../../../services/faculty.service';
import {
  FormBuilder,
  FormGroup,
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
  questiontypes?: any[] = ['MCQ', 'Medical'];
  questions?: any[];
  val: any;
  examtypes?: any;
  // inputForm!: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  questionType?: string;
  questionBody: string = '';
  mytext?: string;
  formattedQuestion: any[] = [];
  inputForm: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private sessionService: SessionService,
    private courseService: CourseService,
    // private questionTypesService: QuestiontypeService,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {
    this.inputForm = this.fb.group({
      allQuestions: ['', Validators.required],
      questiontype: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(moment().valueOf());
    // this.initializeForm();
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

  setAnswer(isCorrect: boolean): string {
    return isCorrect
      ? '<i class="text-success">True</i>'
      : '<i class="text-danger">False</i>';
  }

  // Triggered whenever the text in the input field changes
  onTextChange() {
    // Get the input text and question type from the form control
    const questionBody = this.inputForm.get('allQuestions')?.value || '';
    const questionType = this.inputForm.get('questiontype')?.value || '';

    // Format the questions using the updated questionFormatter
    this.formattedQuestion = this.questionFormatter(questionBody, questionType);

    // Generate HTML preview for the formatted questions
    let tempQBody = "<ol type='1'>";
    for (let question of this.formattedQuestion) {
      tempQBody += `<li>${question.text}<ol type="a">`;

      for (let option of question.options) {
        tempQBody += `<li>${option.text} ${this.setAnswer(
          option.isCorrect
        )}</li>`;
      }

      tempQBody += `</ol></li>`;
    }
    tempQBody += `</ol>`;

    // Set the generated HTML preview
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

    // this.questionTypesService.getAll().subscribe(
    //   (response: Response<any[]>) => {
    //     this.questiontypes = response.data;
    //     //console.log(response.data)
    //   },
    //   (error) => {
    //     this.message.create('error', `${error}`, {
    //       nzDuration: 7000,
    //     });
    //   }
    // );

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

  // Format each question into a structured object
  questionFormatter(questions: string, questionType: string): any[] {
    const formattedQuestions: any[] = [];
    const questionPattern = /\[\*START\*\](.*?)(?=\[\*START\*\]|$)/gs;
    const optionPattern = /\[\*(\w)\*\]\s*(.*?)\s*\[(T|F)\]/g;

    let questionMatch;

    // Match each question block starting with [*START*]
    while ((questionMatch = questionPattern.exec(questions)) !== null) {
      const questionBlock = questionMatch[1].trim();

      // Separate question text from options
      const questionText = questionBlock.split('\n')[0].trim();
      const options: { text: string; isCorrect: boolean }[] = [];
      let optionMatch;
      let trueOptionCount = 0;

      // Extract each option and its correctness
      while ((optionMatch = optionPattern.exec(questionBlock)) !== null) {
        const optionText = optionMatch[2].trim();
        const isCorrect = optionMatch[3].toUpperCase() === 'T';

        options.push({ text: optionText, isCorrect });

        // Count true options for MCQ questions
        if (isCorrect) trueOptionCount++;
      }

      // Validate options count (minimum of 2 and maximum of 5)
      if (options.length < 2 || options.length > 5) {
        this.message.warning(
          `Question must have between 2 and 5 options. Found ${options.length}.`
        );
        continue; // Skip this question if it doesn't meet the criteria
      }

      // Additional check for MCQ-type questions
      if (questionType === 'MCQ' && trueOptionCount !== 1) {
        this.message.warning(
          `MCQ-type questions must have exactly one true option. Found ${trueOptionCount}.`
        );
        continue; // Skip this question if it doesn't meet MCQ criteria
      }

      formattedQuestions.push({ text: questionText, options });
    }

    return formattedQuestions;
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
