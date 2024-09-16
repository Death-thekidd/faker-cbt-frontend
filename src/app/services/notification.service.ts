import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Response } from '../classes/types/response';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  baseUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getAllNotifications(): Observable<Response<Notification[]>> {
    return this.http.get<Response<any[]>>(`${this.baseUrl}/`).pipe(retry(3));
  }

  readNotification(id: string): Observable<Response<Notification[]>> {
    return this.http
      .post<Response<any[]>>(`${this.baseUrl}/read`, { id: id })
      .pipe(retry(3));
  }

  unreadNotification(id: string): Observable<Response<Notification[]>> {
    return this.http
      .post<Response<any[]>>(`${this.baseUrl}/unread`, { id: id })
      .pipe(retry(3));
  }
}
