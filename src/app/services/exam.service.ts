import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';
//import { Department } from '../models/department'

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  baseUrlExam = `${environment.apiUrl}/exams`;

  baseUrlExamresult = `${environment.apiUrl}/examresults`;
  baseUrlExamquestion = `${environment.apiUrl}/examquestions`;

  constructor(private http: HttpClient) {}

  create(question: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlExam}/create`, question);
  }

  bulkCreateExamQuestions(questions: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrlExamquestion}/bulkCreate`,
      questions
    );
  }

  getAll(): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrlExam}/`)
      .pipe(retry(3));
  }

  getExamById(examId: string): Observable<Response<any>> {
    return this.http
      .get<Response<any>>(`${this.baseUrlExam}/${examId}`)
      .pipe(retry(3));
  }

  getAllExamResults(): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrlExamresult}/`)
      .pipe(retry(3));
  }

  getExamResultById(examresultId: string): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrlExamresult}/${examresultId}`)
      .pipe(retry(3));
  }

  delete(examId: string): Observable<any[]> {
    return this.http
      .delete<any[]>(`${this.baseUrlExam}/${examId}`)
      .pipe(retry(3));
  }

  edit(examId: string, data: any): Observable<Response<any[]>> {
    return this.http
      .patch<Response<any[]>>(`${this.baseUrlExam}/${examId}`, { ...data })
      .pipe(retry(3));
  }
}
