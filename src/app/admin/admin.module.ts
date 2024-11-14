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
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { AddQuestionComponent } from './pages/question/add-question/add-question.component';
import { AddBulkQuestionsComponent } from './pages/question/add-bulk-questions/add-bulk-questions.component';
import { EditQuestionComponent } from './pages/question/edit-question/edit-question.component';
import { CourseComponent } from './pages/categories/course/course.component';
import { DepartmentComponent } from './pages/categories/department/department.component';
import { FacultyComponent } from './pages/categories/faculty/faculty.component';
import { LevelComponent } from './pages/categories/level/level.component';
import { SemesterComponent } from './pages/categories/semester/semester.component';
import { SessionComponent } from './pages/categories/session/session.component';
import { ExamResultComponent } from './pages/exam/exam-result/exam-result.component';
import { ExamsComponent } from './pages/exam/exams/exams.component';
import { ExamTypesComponent } from './pages/exam/exam-types/exam-types.component';
import { AddExamComponent } from './pages/exam/add-exam/add-exam.component';
import { EditExamComponent } from './pages/exam/edit-exam/edit-exam.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { AddExamQuestionsComponent } from './page-section/add-exam-questions/add-exam-questions.component';
import { LoadingComponent } from './page-section/loading/loading.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AddExamStudentsComponent } from './page-section/add-exam-students/add-exam-students.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    UsersComponent,
    QuestionsComponent,
    TestComponent,
    QuestionTypesComponent,
    AddQuestionComponent,
    AddBulkQuestionsComponent,
    EditQuestionComponent,
    CourseComponent,
    DepartmentComponent,
    FacultyComponent,
    LevelComponent,
    SemesterComponent,
    SessionComponent,
    ExamResultComponent,
    ExamsComponent,
    ExamTypesComponent,
    AddExamComponent,
    EditExamComponent,
    AddExamQuestionsComponent,
    LoadingComponent,
    AddExamStudentsComponent,
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
    InputNumberModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    RadioButtonModule,
    SelectModule,
    RippleModule,
    StepperModule,
    FloatLabelModule,
  ],
  providers: [
    NzMessageService,
    DatePipe,
    MessageService,
    ConfirmationService,
    BsModalService,
  ],
})
export class AdminModule {}
