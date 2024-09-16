import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  baseUrl = `${environment.apiUrl}/departments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Response<Department[]>> {
    return this.http
      .get<Response<Department[]>>(`${this.baseUrl}/`)
      .pipe(retry(3));
  }

  countAll(): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/count`)
      .pipe(retry(3));
  }
}
