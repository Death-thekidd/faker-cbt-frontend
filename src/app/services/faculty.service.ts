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

  create(question: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, question);
  }

  edit(levelId: string, data: any): Observable<Response<any>> {
    return this.http
      .patch<Response<any>>(`${this.baseUrl}/${levelId}`, { ...data })
      .pipe(retry(3));
  }

  delete(levelId: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/${levelId}`).pipe(retry(3));
  }

  getAll(): Observable<Response<Faculty[]>> {
    return this.http
      .get<Response<Faculty[]>>(`${this.baseUrl}/`)
      .pipe(retry(3));
  }
}
