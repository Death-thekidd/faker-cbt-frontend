import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

declare function createIndividualSearch(): void;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  ngAfterViewInit(): void {
    createIndividualSearch();
  }
  icons = { faPenToSquare, faTrash };
}
