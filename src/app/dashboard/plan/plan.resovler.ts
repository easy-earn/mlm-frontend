import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { catchError, Observable, of } from "rxjs"
import { AuthService } from "src/app/shared/services/auth.service"
import { ApiResponse } from "src/app/shared/types/api.types"

@Injectable({
  providedIn: 'root',
})
export class UserDetailResolver implements Resolve<any> {

  constructor(private _authService: AuthService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApiResponse<any> | null> {
    return this._authService.getUserDetail().pipe(catchError(error => { return of(null) }))
  }
}
