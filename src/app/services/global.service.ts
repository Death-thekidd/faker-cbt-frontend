import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';
import { User } from '../classes/types/user';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<Response<User[]>> {
    return this.http
      .get<Response<User[]>>(`${this.baseUrl}/users/${userId}`)
      .pipe(retry(3));
  }

  getExamQuestions(): Observable<Response<Question[]>> {
    return this.http
      .get<Response<Question[]>>(`${this.baseUrl}/questions`)
      .pipe(retry(3));
  }

  uploadExamResult(result: any): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/examresults/`, result);
  }
}
