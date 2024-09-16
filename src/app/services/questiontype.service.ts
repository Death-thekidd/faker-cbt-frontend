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
export class QuestiontypeService {
  baseUrl = `${environment.apiUrl}/questiontypes`;

  constructor(private http: HttpClient) {}

  create(question: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, question);
  }

  getAll(): Observable<Response<any[]>> {
    return this.http.get<Response<any[]>>(`${this.baseUrl}/`).pipe(retry(3));
  }
}
