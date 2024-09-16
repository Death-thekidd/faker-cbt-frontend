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
export class ExamtypeService {
  baseUrl = `${environment.apiUrl}/examtypes`;

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, data);
  }

  getAll(): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.baseUrl}/`).pipe(retry(3));
  }
}
