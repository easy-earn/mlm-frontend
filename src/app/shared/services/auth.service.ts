import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { Constant } from '../constants/app.constant';
import { ApiResponse } from '../types/api.types';
import { SignupForm, UpdatePasswordForm, User, UserObject } from '../types/user.types';

const api = Constant.apiBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _authenticated: boolean = false;

  // user: UserObject | null = null;


  constructor(public _httpClient: HttpClient) {
  }

  set user(user: UserObject) {
    user && localStorage.setItem('user', JSON.stringify(user));
  }

  get user() {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }

  set accessToken(token: string | undefined) {
    token && localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set _authenticated(value: boolean | undefined) {
    if (value != undefined && value != null) localStorage.setItem('_authenticated', value.toString());
  }

  get _authenticated(): boolean {
    let value = localStorage.getItem('_authenticated');
    return value === 'true';
  }

  signup(form: SignupForm): Observable<ApiResponse<User>> {
    return this._httpClient
      .post<ApiResponse<User>>(`${api}/auth/register`, form)
  }

  resendOTP(email: string): Observable<ApiResponse<any>> {
    return this._httpClient.post<ApiResponse<any>>(`${api}/auth/resendOTP`, { email })
  }

  verifyOTP(email: string, otp: string): Observable<ApiResponse<any>> {
    return this._httpClient.post<ApiResponse<any>>(`${api}/auth/verifyOTP`, { email, otp })
  }

  recoverPassword(email: string) {
    return this._httpClient.post<ApiResponse<any>>(`${api}/auth/forgot-password`, { email })
  }

  resetPassword(form: UpdatePasswordForm) {
    return this._httpClient.post<ApiResponse<any>>(`${api}/auth/update-password`, form)
  }

  getUserDetail() {
    return this._httpClient.get<ApiResponse<any>>(`${api}/user/get-my-profile`)
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient
      .post<ApiResponse<User>>(`${api}/auth/login`, credentials)
      .pipe(
        switchMap((response: ApiResponse<User>) => {
          const { result } = response;
          if (result) {
            this._authenticated = true;
            console.log('_authenticated', this._authenticated);
            // Store the access token in the local storage
            this.accessToken = result?.access_token;
            // Store the user on the user service
            this.user = result?.userDoc;
          }
          // Return a new observable with the response
          return of(response);
        })
      );
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  isTokenAvailable(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated && this.accessToken) {
      return of(true);
    } else {
      return of(false)
    }
  }

}
