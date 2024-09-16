import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';

@Injectable({
  providedIn: 'root',
})
export class BacklogService {
  baseUrl = `${environment.apiUrl}/backlogs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.baseUrl}/`).pipe(retry(3));
  }

  getById(backlogId: string): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/${backlogId}`)
      .pipe(retry(3));
  }

  getByUserId(userId: string): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/user/${userId}`)
      .pipe(retry(3));
  }

  edit(backlogId: string, data: any): Observable<Response<any[]>> {
    return this.http
      .patch<Response<any[]>>(`${this.baseUrl}/${backlogId}`, { ...data })
      .pipe(retry(3));
  }

  delete(backlogId: string): Observable<any[]> {
    return this.http
      .delete<any[]>(`${this.baseUrl}/${backlogId}`)
      .pipe(retry(3));
  }

  countAll(): Observable<Response<any[]>> {
    return this.http
      .get<Response<any[]>>(`${this.baseUrl}/count`)
      .pipe(retry(3));
  }
}
