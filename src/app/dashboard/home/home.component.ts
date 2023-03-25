import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Constant } from 'src/app/shared/constants/app.constant';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  form: any = {
    bank_account: null,
    balance: 0,
    referral_code: null,
  }

  withdrawal_limit: number = Constant.withdrawLimit;
  _unsubscribeAll: Subject<any> = new Subject();
  bank_searchQuery: string = '';

  accounts: any = [
    { name: 'John Doe', number: '1234567890' },
    { name: 'Jane Doe', number: '0987654321' },
    { name: 'Bob Smith', number: '2468101214' },
    { name: 'Alice Johnson', number: '3691215182' },
    { name: 'David Lee', number: '4812162022' },
    { name: 'David Lee', number: '4812162022' },
    { name: 'David Lee', number: '4812162022' },
    { name: 'David Lee', number: '4812162022' },
    { name: 'David Lee', number: '4812162022' },
    { name: 'David Lee', number: '4812162022' }
  ]
  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private purchaseService: PurchaseService,
    private snackbarService: SnackbarService
  ) {
    this.loader.open();
    this.authService.getUserDetail().pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if (response) {
        const { result } = response;
        this.authService.user = result;
        this.form.balance = this.authService.user.account_balance;
        this.form.referral_code = this.authService.user.referral_code;
      }
      this.loader.close();
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  withdraw() {
    this.loader.open();
    this.purchaseService.sendWithdrawalRequest().pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if (response) {
        this.snackbarService.showSuccess("Your balance withdrawal request has been sent.")
      }
      this.loader.close();
    }, error => {
      console.log("error", error);
      this.snackbarService.showError("Please try again.")
      this.loader.close();
    });
  }

}
