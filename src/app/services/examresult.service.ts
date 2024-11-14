import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';

@Injectable({
  providedIn: 'root',
})
export class ExamresultService {
  baseUrl = `${environment.apiUrl}/results`;

  constructor(private http: HttpClient) {}

  submit(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/submit`, data);
  }

  getStudentResult(
    studentId: string | undefined,
    examId: string | undefined
  ): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${studentId}/${examId}`)
      .pipe(retry(3));
  }

  getAllExamResults(examId: string | undefined): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${examId}`)
      .pipe(retry(3));
  }

  delete(
    examId: string | undefined,
    studentId: string | undefined
  ): Observable<any[]> {
    return this.http
      .delete<any[]>(`${this.baseUrl}/${examId}/${studentId}`)
      .pipe(retry(3));
  }
}
