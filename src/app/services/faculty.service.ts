import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';
import { Faculty } from '../models/faculty';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  baseUrl = `${environment.apiUrl}/faculties`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Response<Faculty[]>> {
    return this.http
      .get<Response<Faculty[]>>(`${this.baseUrl}/`)
      .pipe(retry(3));
  }
}
