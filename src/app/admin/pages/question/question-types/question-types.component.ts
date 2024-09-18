import { Component, OnInit } from '@angular/core';
import { QuestiontypeService } from '../../../../services/questiontype.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';

@Component({
  selector: 'app-question-types',
  templateUrl: './question-types.component.html',
  styleUrls: [
    './question-types.component.scss',
    './question-types.component.scss',
  ],
})
export class QuestionTypesComponent implements OnInit {
  questionTypes!: any[];
  cols!: any[];
  loading: boolean = true;
  totalRecords: number = 0;

  constructor(
    private questiontypesService: QuestiontypeService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'NAME' },
      { field: 'description', header: 'DESCRIPTION' },
    ];
    this.loadData(0, 10);
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.questiontypesService.getAll().subscribe(
      (res: Response<any>) => {
        this.questionTypes = res?.data.slice(first, first + rows);
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
}
