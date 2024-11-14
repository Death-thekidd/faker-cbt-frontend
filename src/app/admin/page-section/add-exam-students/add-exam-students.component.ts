import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-exam-students',
  templateUrl: './add-exam-students.component.html',
  styleUrl: './add-exam-students.component.scss',
})
export class AddExamStudentsComponent {
  @Input() examId?: string;
}
