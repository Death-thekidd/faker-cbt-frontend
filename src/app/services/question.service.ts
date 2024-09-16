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
export class QuestionService {
  baseUrl = `${environment.apiUrl}/questions`;

  constructor(private http: HttpClient) {}

  create(question: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, question);
  }

  bulkCreate(question: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/bulk-create`, question);
  }

  getAll(): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.baseUrl}/`).pipe(retry(3));
  }

  delete(questionId: string): Observable<any[]> {
    return this.http
      .delete<any[]>(`${this.baseUrl}/${questionId}`)
      .pipe(retry(3));
  }

  getById(questionId: string): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${questionId}`)
      .pipe(retry(3));
  }

  edit(questionId: string, data: any): Observable<Response<any[]>> {
    return this.http
      .patch<Response<any[]>>(`${this.baseUrl}/${questionId}`, { ...data })
      .pipe(retry(3));
  }
}
