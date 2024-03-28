import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "src/app/components/model/RegisterRequest";
import {JsonResponse} from "src/app/components/model/user/JsonResponse";
import {LoginRequest} from "src/app/components/model/user/LoginRequest";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {RecoverPasswordRequest} from "src/app/components/model/user/RecoverPasswordRequest";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:8089/api/v1/auth';

  constructor(private http: HttpClient) {
  }

  register(registerRequest: RegisterRequest) {
    return this.http.post<JsonResponse>(`${this.baseUrl}/signup`, registerRequest)
      .pipe(
        catchError(error => {
          if (error.status === 400 && error.error.message === 'Email is already in use!') {
            alert('Email is already in use! Please use a different email.');
          }
          return throwError(error);
        })
      );
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signing`, loginRequest);
  }

  verifyAccount(code: string) {
    return this.http.get<JsonResponse>(`${this.baseUrl}/verify?code=${code}`);
  }

  forgotPassword(email: string) {
    return this.http.post<JsonResponse>(`${this.baseUrl}/forgot-password?email=${email}`, null);
  }

  recoverPassword(token: string, password: RecoverPasswordRequest) {
    return this.http.post<JsonResponse>(`${this.baseUrl}/recover-password?token=${token}`, password);
  }

  confirmDevice(loginRequest: LoginRequest, code: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/confirmDevice/${code}`, loginRequest);
  }

  isAuthenticated() {
    return this.http.get<boolean>(`${this.baseUrl}/isAuthenticated`);
  }

  getRole() {
    return this.http.get<string[]>(`${this.baseUrl}/getRole`);
  }
}
