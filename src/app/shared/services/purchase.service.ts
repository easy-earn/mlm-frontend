import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Constant } from '../constants/app.constant';
import { ApiResponse } from '../types/api.types';
import { PurchaseForm } from '../types/purchase.types';

const api = Constant.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(public _httpClient: HttpClient) { }


  getPlans() {
    return this._httpClient.get<ApiResponse<any>>(`${api}/user/get-plans`)
  }

  staticPurchase(body: PurchaseForm): Observable<ApiResponse<any>> {
    return this._httpClient.post<ApiResponse<any>>(`${api}/user/upi-purchase`, body)
  }

  sendWithdrawalRequest(): Observable<ApiResponse<any> | null> {
    return this._httpClient.get<ApiResponse<any> | null>(`${api}/user/withdraw-request`).pipe(catchError(error => of(null)))
  }
}
