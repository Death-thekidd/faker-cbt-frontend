import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from '@pascalhonegger/ng-datatable';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CalendarModule } from 'primeng/calendar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MessageService } from 'primeng/api';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './pages/user/users/users.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionsComponent } from './pages/question/questions/questions.component';
import { TestComponent } from './pages/test/test.component';
import { QuestionTypesComponent } from './pages/question/question-types/question-types.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    UsersComponent,
    QuestionsComponent,
    TestComponent,
    QuestionTypesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzTableModule,
    NgxDatatableModule,
    DataTablesModule,
    DataTableModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    NzUploadModule,
    NzButtonModule,
    NzSpinModule,
    NzPopconfirmModule,
    CalendarModule,
    NzDatePickerModule,
    InputMaskModule,
    ButtonModule,
    EditorModule,
    InputTextareaModule,
    ListboxModule,
    NzTransferModule,
    NzStepsModule,
    AdminRoutingModule,
    FontAwesomeModule,
    SkeletonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  providers: [NzMessageService, DatePipe, MessageService],
})
export class AdminModule {}
