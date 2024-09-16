import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, { ...data });
  }

  getAll(): Observable<Response<Course[]>> {
    return this.http.get<Response<Course[]>>(`${this.baseUrl}/`).pipe(retry(3));
  }

  getById(courseId: string): Observable<Response<Course[]>> {
    return this.http
      .get<Response<Course[]>>(`${this.baseUrl}/${courseId}`)
      .pipe(retry(3));
  }

  edit(courseId: string, data: any): Observable<Response<Course[]>> {
    return this.http
      .patch<Response<Course[]>>(`${this.baseUrl}/${courseId}`, { ...data })
      .pipe(retry(3));
  }

  delete(courseId: string): Observable<any[]> {
    return this.http
      .delete<any[]>(`${this.baseUrl}/${courseId}`)
      .pipe(retry(3));
  }

  countAll(): Observable<Response<Course[]>> {
    return this.http
      .get<Response<Course[]>>(`${this.baseUrl}/count`)
      .pipe(retry(3));
  }
}
