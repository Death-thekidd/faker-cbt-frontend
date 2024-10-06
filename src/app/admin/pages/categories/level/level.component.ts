import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Response } from '../../../../classes/types/response';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { LevelService } from '../../../../services/level.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss',
})
export class LevelComponent {
  levels!: any[];
  listLevels!: any[];
  loading: boolean = true;
  totalRecords: number = 0;
  cols!: any[];
  selectedLevels!: any[] | null;
  level!: any;
  expandedRows = {};
  submitted: boolean = false;
  levelDialog: boolean = false;

  @ViewChild('dt1') dt1!: Table;
  constructor(
    private message: NzMessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private levelService: LevelService
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
    this.levelService.getAll().subscribe(
      (res: Response<any>) => {
        this.levels = res?.data;
        this.listLevels = this.levels
          .slice(first, first + rows)
          .map((l, index) => ({
            ...l,
          }));
        this.totalRecords = this.levels.length;
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
    this.level = {};
    this.submitted = false;
    this.levelDialog = true;
  }
  hideDialog() {
    this.levelDialog = false;
    this.submitted = false;
  }

  deleteSelectedLevels() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected levels?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedLevels) {
          const deleteRequests = this.selectedLevels.map((level) =>
            this.levelService.delete(level.id).subscribe(
              () => {
                this.listLevels = this.listLevels.filter(
                  (val) => val.id !== level.id
                );
                this.message.create('success', 'Levels Deleted', {
                  nzDuration: 7000,
                });
              },
              (error) => {
                this.message.create(
                  'error',
                  `Error deleting levels: ${error}`,
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
        this.selectedLevels = null;
      },
    });
  }

  editLevel(level: any) {
    this.level = { ...level };
    this.levelDialog = true;
  }

  deleteLevel(level: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + level.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.levelService.delete(level.id).subscribe(
          () => {
            this.listLevels = this.listLevels.filter(
              (val) => val.id !== level.id
            );
            this.level = {};
            this.message.create('success', 'Level Deleted', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', `Error deleting level: ${error}`, {
              nzDuration: 7000,
            });
          }
        );
      },
    });
  }

  saveLevel() {
    this.submitted = true;

    if (this.level.name?.trim()) {
      if (this.level.id) {
        // Update block
        this.levels[this.findIndexById(this.level.id)] = this.level;
        this.levelService.edit(this.level.id, this.level).subscribe(
          (data) => {
            this.message.create('success', 'Level Updated', {
              nzDuration: 7000,
            });
          },
          (error) => {
            this.message.create('error', 'Error creating Level', {
              nzDuration: 7000,
            });
          }
        );
      } else {
        // Call create service instead of local logic
        this.levelService.create(this.level).subscribe(
          (data) => {
            // Use data._id returned from the service
            this.level.id = data?._id; // Assign the returned ID
            this.levels.push(this.level); // Add the new question type
            this.message.create('success', 'Level Created', {
              nzDuration: 7000,
            });
            this.levels = [...this.levels]; // Update the list
            this.levelDialog = false; // Close the dialog
            this.level = {}; // Reset the questionType object
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
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].id === id) {
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
