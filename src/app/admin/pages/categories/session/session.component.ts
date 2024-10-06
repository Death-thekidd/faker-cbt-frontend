import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { SessionService } from '../../../../services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss',
})
export class SessionComponent {
  sessions!: any[];
  listSessions!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedSessions!: any[] | null;
  session!: any;
  expandedRows = {};
  submitted: boolean = false;
  sessionDialog: boolean = false;

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.cols = [{ field: 'name', header: 'Name' }];
    this.loadData(0, 10);
  }

  clear(table: Table) {
    table.clear();
  }

  loadData(first: number, rows: number): void {
    this.loading = true;
    this.sessionService.getAll().subscribe(
      (res: Response<any>) => {
        this.sessions = res?.data;
        this.listSessions = this.sessions
          .slice(first, first + rows)
          .map((q, index) => ({
            ...q,
            id: q?._id,
            options: JSON.parse(q?.options),
            answer: JSON.parse(q?.answer),
          }));
        this.totalRecords = this.sessions.length;
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
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.dt1.filterGlobal(value, 'contains');
  }
  openNew() {
    this.session = {};
    this.submitted = false;
    this.sessionDialog = true;
  }
  hideDialog() {
    this.sessionDialog = false;
    this.submitted = false;
  }

  deleteSelectedSessions() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected sessions?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedSessions) {
          const deleteRequests = this.selectedSessions.map((session) =>
            this.sessionService.delete(session.id).subscribe(
              () => {
                this.listSessions = this.listSessions.filter(
                  (val) => val.id !== session.id
                );
                this.message.create('success', 'Sessions Deleted', {
                  nzDuration: 7000,
                });
              },
              (error) => {
                this.message.create(
                  'error',
                  `Error deleting sessions: ${error}`,
                  {
                    nzDuration: 7000,
                  }
                );
              }
            )
          );

          // Optional: If you want to wait for all delete requests to finish
          // you can use forkJoin from 'rxjs' to handle multiple observables.
        }
        this.selectedSessions = null;
      },
    });
  }

  editsession(session: any) {
    this.session = { ...session };
    this.sessionDialog = true;
  }

  deletesession(session: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + session.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sessionService.delete(session.id).subscribe(
          () => {
            this.listSessions = this.listSessions.filter(
              (val) => val.id !== session.id
            );
            this.session = {};
            this.message.create('success', 'session Deleted', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', `Error deleting session: ${error}`, {
              nzDuration: 7000,
            });
          }
        );
      },
    });
  }

  saveSession() {
    this.submitted = true;

    if (this.session.name?.trim()) {
      if (this.session.id) {
        // Update block
        this.sessions[this.findIndexById(this.session.id)] = this.session;
        this.sessionService.edit(this.session.id, this.session).subscribe(
          (data) => {
            this.message.create('success', 'session Updated', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', 'Error creating session', {
              nzDuration: 7000,
            });
          }
        );
      } else {
        // Call create service instead of local logic
        this.sessionService.create(this.session).subscribe(
          (data) => {
            // Use data._id returned from the service
            this.session.id = data?._id; // Assign the returned ID
            this.sessions.push(this.session); // Add the new question type
            this.message.create('success', 'session Created', {
              nzDuration: 7000,
            });
            this.sessions = [...this.sessions]; // Update the list
            this.sessionDialog = false; // Close the dialog
            this.session = {}; // Reset the questionType object
          },
          (error) => {
            // Handle error response
            this.message.create('error', 'Error creating Question Type', {
              nzDuration: 7000,
            });
          }
        );
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
