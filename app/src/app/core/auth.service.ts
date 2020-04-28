import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public register(userName: string, password: string) {
    return this.http.post(environment.ROUTES.REGISTER_ROUTE, {
      userName,
      password
    },
    {observe: 'response'}
    ).pipe(
      catchError(this.handleError)
    );
  }

  public login(userName: string, password: string) {
    return this.http.post(environment.ROUTES.LOGIN_ROUTE, {
      userName,
      password
    },
    {observe: 'response'}
    ).pipe(
      catchError(this.handleError)
    );
  }

  public logOut() {
    this.tokenService.clearToken();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
