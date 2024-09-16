import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [StudentComponent],
  imports: [CommonModule, StudentRoutingModule],
  bootstrap: [StudentComponent],
  providers: [NzMessageService],
})
export class StudentModule {}
