import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as planPurchaseJSONSchema from "./plan-purchase-form.schema.json";

import Ajv from 'ajv';
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { PlanDialogData, PurchaseForm } from 'src/app/shared/types/purchase.types';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
const ajv = new Ajv({ $data: true, allErrors: true });
addFormats(ajv);
addErrors(ajv);
const validator = ajv.compile(planPurchaseJSONSchema);

@Component({
  selector: 'app-plan-purchase-modal',
  templateUrl: './plan-purchase-modal.component.html',
  styleUrls: ['./plan-purchase-modal.component.scss']
})
export class PlanPurchaseModalComponent implements OnInit, OnDestroy {

  form: PurchaseForm = {
    upi: '',
    utr: '',
    account_holder_name: null,
    bank_account_number: null,
    ifsc_code: null,
    plan_amount: null,
    plan_id: null,
  }

  errors: any = {};

  _unsubscribeAll: Subject<any> = new Subject();


  constructor(
    public dialogRef: MatDialogRef<PlanPurchaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlanDialogData,
    private purchaseService: PurchaseService,
    private _snackbarService: SnackbarService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  get planName() {
    return this.data.plan.plan_name;
  }

  get planAmount() {
    return this.data.plan.amount;
  }

  get planQR() {
    return this.data.plan.qr;
  }

  closeDialog(response: any) {
    this.dialogRef.close(response);
  }

  purchasePlan() {
    try {
      this.form.plan_id = this.data.plan.plan_id;
      const input = JSON.parse(JSON.stringify(this.form))
      delete input.plan_amount;
      const isValid: any = validator(input);
      if (isValid) {
        // Signup api cal
        this.loader.open();
        this.errors = {};
        let body = Object.assign({}, input);

        this.purchaseService.staticPurchase(body).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          if (response) {
            this.closeDialog(response);
          }
          this.loader.close();
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
        this._snackbarService.showError("Please enter a valid details.");
      }
    } catch (error: any) {
      this._snackbarService.showError(error.message);
      this.loader.close();
    }
  }

}
