import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';

@Injectable({
  providedIn: 'root',
})
export class ExamstudentService {
  baseUrl = `${environment.apiUrl}/examstudents`;

  constructor(private http: HttpClient) {}

  create(data: any, examId: string | undefined): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${examId}/students`, {
      students: data,
    });
  }

  getAllStudentExams(
    studentId: string | undefined
  ): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${studentId}/exams`)
      .pipe(retry(3));
  }

  getAllAdded(examId: string | undefined): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${examId}/students`)
      .pipe(retry(3));
  }

  delete(
    examId: string | undefined,
    studentId: string | undefined
  ): Observable<any[]> {
    return this.http
      .delete<any[]>(`${this.baseUrl}/${examId}/students/${studentId}`)
      .pipe(retry(3));
  }
}
