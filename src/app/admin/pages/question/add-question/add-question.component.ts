import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { QuestionService } from '../../../../services/question.service';
import { NzMessageService } from 'ng-zorro-antd/message';

interface Option {
  text: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  course: string = '';
  questionType: string = '';
  questionText: string = '';
  score: number = 1;
  courses: any[] = [];
  questiontypes: any[] = ['MCQ', 'Medical'];
  options: Option[] = [
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
  ];
  loading = false;
  submitted = false;

  constructor(
    private courseService: CourseService,
    private questionService: QuestionService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  addOption(): void {
    if (this.options.length < 5) {
      this.options.push({ text: '', isCorrect: false });
    }
  }

  removeOption(): void {
    if (this.options.length > 2) {
      this.options.pop();
    }
  }

  setCorrectAnswer(index: number): void {
    console.log('nawa');
    if (this.questionType === 'MCQ') {
      this.options.forEach((option, i) => (option.isCorrect = i === index));
    } else if (this.questionType === 'Medical') {
      this.options[index].isCorrect = !this.options[index].isCorrect;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (
      !this.course ||
      !this.questionType ||
      !this.questionText ||
      !this.score
    ) {
      return;
    }

    const questionData = {
      courseId: this.course,
      text: this.questionText,
      type: this.questionType,
      score: this.score,
      options: this.options,
    };

    console.log(questionData);

    // Uncomment below to integrate the question creation with the service
    // this.loading = true;
    // this.questionService.create(questionData).subscribe(
    //   (response: any) => {
    //     this.message.info(response.message);
    //     this.resetForm();
    //     this.loading = false;
    //   },
    //   (error: any) => {
    //     this.message.error(error);
    //     this.loading = false;
    //   }
    // );
  }

  getCourses() {
    this.courseService.getAll().subscribe(
      (response: any) => {
        this.courses = response.data;
      },
      (error) => {
        this.message.error('Failed to load courses: ' + error);
      }
    );
  }

  resetForm() {
    this.course = '';
    this.questionType = '';
    this.questionText = '';
    this.score = 1;
    this.options = [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
    ];
    this.submitted = false;
  }
}
