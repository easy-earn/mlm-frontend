import { Component, OnInit } from '@angular/core';
import { Constant, Plans } from 'src/app/shared/constants/app.constant';
import * as signupJSONSchema from "./signup-form.schema.json";
import Ajv from 'ajv';
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';


const ajv = new Ajv({ $data: true, allErrors: true });
addFormats(ajv);
addErrors(ajv);
const validator = ajv.compile(signupJSONSchema);

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  constant: any = Constant;
  _unsubscribeAll: Subject<any> = new Subject();

  planList = Plans;

  form: any = {
    name: "",
    email: "",
    phone_number: "",
    password: "",
    cpassword: "",
    package: "",
    parent_code: "",
    is_terms_accepted: false
  }
  verifyForm: any = {
    otp: ''
  }

  isSignupDone: boolean = false;

  // Messages
  errors: any = {};

  constructor(private authService: AuthService, private _snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  signup() {
    try {
      console.log('this.form', this.form);
      const isValid: any = validator(this.form);
      console.log(isValid, validator.errors);
      if (isValid) {
        // Signup api cal
        this.errors = {};
        let body = Object.assign({}, this.form);
        delete body['cpassword'];
        this.authService.signup(this.form).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          console.log('result', response);
          if (response) {
            const { result } = response;
            if (result) {
              const { access_token, userDoc } = result;
              this.authService.accessToken = access_token;
              this.authService.user = userDoc;
              this.isSignupDone = true;
            }
          }
        }, error => {
          console.log('error', error);
          error?.error?.message && this._snackbarService.showError(error?.error?.message, '', 6);
        });
      } else {
        this.errors = {};
        console.log('validator.errors', validator.errors);
        validator.errors?.map(error => {
          this.errors[error['instancePath']] = error.message;
        })
      }
    } catch (error: any) {
      this._snackbarService.showError(error.message);
    }
  }

  resendOTP() {
    this.authService.resendOTP(this.form.email).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if (response) {
        const { message } = response;
        console.log('result', message);
        this._snackbarService.showInfo(message);
      }
    }, error => {
      console.log('error', error);
      error?.error?.message && this._snackbarService.showError(error?.error?.message, '', 6);
    });
  }

  verifyOTP() {
    if (this.verifyForm.otp && this.verifyForm.otp != null && this.verifyForm.otp != undefined && this.verifyForm.otp != '') {
      this.authService.verifyOTP(this.form.email, this.verifyForm.otp).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        if (response) {
          const { message } = response;
          console.log('result', message);
          this._snackbarService.showSuccess(message);

        }
      }, error => {
        console.log('error', error);
        error?.error?.message && this._snackbarService.showError(error?.error?.message, '', 6);
      });
    }
  }

}
