import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export class RestHelper {
  private readonly token;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  getHttpOptions(): any {
    const headersObject = new HttpHeaders().set('Authorization', this.token!);
    return {
      headers: headersObject,
    };
  }

  handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message

    return throwError(
      `Please try again later. Something bad happened; ${error.error.message}`
    );
  }
}
