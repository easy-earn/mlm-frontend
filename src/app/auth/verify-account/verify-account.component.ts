import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Constant } from 'src/app/shared/constants/app.constant';
import Ajv from 'ajv';
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import * as verifyAccountSchema from "./verify-account.schema.json"

const ajv = new Ajv({ $data: true, allErrors: true });
addFormats(ajv);
addErrors(ajv);
const validator = ajv.compile(verifyAccountSchema);

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {

  form: any = {
    email: '',
    otp: ''
  }
  constant: any = Constant;
  _unsubscribeAll: Subject<any> = new Subject();
  errors: any = {};
  sendMailFlag: boolean = false;


  constructor(private authService: AuthService,
    private _snackbarService: SnackbarService,
    private _purchaseService: PurchaseService,
    private router: Router,
    private loader: LoaderService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  resendOTP() {
    if (this.form.email && this.form.email.length > 0) {
      this.loader.open();
      this.authService.resendOTP(this.form.email).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        if (response) {
          const { message } = response;
          this.sendMailFlag = true;
          this._snackbarService.showInfo(message);
        }
        this.loader.close();
      }, error => {
        console.log('error', error);
        error?.error?.message && this._snackbarService.showError(error?.error?.message, '', 6);
        this.loader.close();
      });
    } else {
      this._snackbarService.showInfo("Email is required.");
    }
  }

  verifyOTP() {
    const isValid: any = validator(this.form);
    console.log(isValid, validator.errors);
    if (isValid) {
      this.errors = {};
      this.loader.open();
      this.authService.verifyOTP(this.form.email, this.form.otp).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        if (response) {
          const { message } = response;
          this.loader.close();
          this.router.navigate([`/auth/login`]);
          this._snackbarService.showSuccess(message);
        }
      }, error => {
        console.log('error', error);
        error?.error?.message && this._snackbarService.showError(error?.error?.message, '', 6);
        this.loader.close();
      });
    } else {
      this.errors = {};
      console.log('validator.errors', validator.errors);
      validator.errors?.map(error => {
        this.errors[error['instancePath']] = error.message;
      })
      this._snackbarService.showError("Please enter a valid details.")
    }
  }
}
