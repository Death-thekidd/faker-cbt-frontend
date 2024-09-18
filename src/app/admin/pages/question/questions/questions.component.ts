import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questions!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private questionService: QuestionService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'CODE' },
      { field: 'name', header: 'NAME' },
      { field: 'level', header: 'LEVEL' },
      { field: 'department', header: 'DEPARTMENT' },
      { field: 'semester', header: 'SEMESTER ' },
      { field: 'questiontype', header: 'Question Type' },
    ];
    this.loadData(0, 10);
  }

  clear(table: Table) {
    table.clear();
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.questionService.getAll().subscribe(
      (res: Response<any>) => {
        this.questions = res?.data.slice(first, first + rows);
        this.totalRecords = res?.data.length;
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
    const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const value = input.value;
    // Assuming dt1 is accessible, otherwise pass it as a parameter
    // You may need to adjust this if you're using a different approach
    // For example, you might want to use a ViewChild to reference dt1
    this.dt1.filterGlobal(value, 'contains');
  }
}
