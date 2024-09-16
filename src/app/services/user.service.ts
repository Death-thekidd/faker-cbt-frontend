import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { User } from '../classes/types/user';
import { RestHelper } from '../utils/rest-helper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private restHelper: RestHelper) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.baseUrl}/register`, user, this.restHelper.getHttpOptions())
  //     .pipe(
  //       catchError(this.restHelper.handleError)
  //     );
  // }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/`).pipe(retry(3));
  }

  edit(userId: any, data: any): Observable<User[]> {
    return this.http
      .patch<User[]>(`${this.baseUrl}/${userId}`, data)
      .pipe(retry(3));
  }

  delete(userId: string): Observable<User[]> {
    return this.http.delete<User[]>(`${this.baseUrl}/${userId}`).pipe(retry(3));
  }

  getUserExams(userId: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/exams/${userId}`)
      .pipe(retry(3));
  }
}
