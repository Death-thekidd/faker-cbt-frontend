import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';

@Injectable({
  providedIn: 'root',
})
export class ExamquestionService {
  baseUrl = `${environment.apiUrl}/examquestions`;

  constructor(private http: HttpClient) {}

  create(data: any, examId: string | undefined): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${examId}/questions`, {
      questionIds: data,
    });
  }

  getAllNotAdded(examId: string | undefined): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${examId}/questions`)
      .pipe(retry(3));
  }

  getAllAdded(examId: string | undefined): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${examId}/added-questions`)
      .pipe(retry(3));
  }

  delete(
    examId: string | undefined,
    questionId: string | undefined
  ): Observable<any[]> {
    return this.http
      .delete<any[]>(`${this.baseUrl}/${examId}/questions/${questionId}`)
      .pipe(retry(3));
  }
}
