import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PlanPurchaseModalComponent } from '../plan-purchase-modal/plan-purchase-modal.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  plans: any = [];
  form: any = {
    plan: null
  }

  user_pro_status: 'NOT_PRO' | 'PENDING' | 'PRO' = 'NOT_PRO';

  _unsubscribeAll: Subject<any> = new Subject();

  constructor(private snackbarService: SnackbarService, private _activatedRoute: ActivatedRoute, private _dialog: MatDialog, private _purchaseService: PurchaseService,
    private authService: AuthService,
    private loader: LoaderService,
  ) {
  }

  ngOnInit(): void {
    if (this._activatedRoute?.snapshot?.data['userResponse']['result']) {
      this.authService.user = this._activatedRoute?.snapshot?.data['userResponse']['result'];
      const user = this.authService?.user;
      if ('payment_verification_pending' in user) {
        this.user_pro_status = "PENDING";
      } else {
        if (user?.transaction && user?.transaction_id) {
          this.user_pro_status = 'PRO';
        }
        else {
          this.user_pro_status = 'NOT_PRO';
        }
      }
    }
    if (this.user_pro_status == 'NOT_PRO') {
      this.getPlanList();
    } else if (this.user_pro_status == 'PENDING') {
      this.snackbarService.showInfo("Your transaction is in pending verification.", 'X', 3);
    } else {
      this.snackbarService.showInfo("You are already purchase your first plan.", 'X', 3);
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getPlanList() {
    this.loader.open();
    this._purchaseService.getPlans().pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      if (response) {
        const { result } = response;
        this.plans = result;
        const planId = this._activatedRoute.snapshot.queryParamMap.get('planId');
        if (planId) {
          this.purchase(planId);
        }
      }
      this.loader.close();
    });
  }


  purchase(planId: any) {
    if (!planId) {
      this.snackbarService.showError("Please select a plan");
      return;
    }
    const plan = this.plans.find((item: any) => item.plan_id === planId);
    if (plan) {
      this.form.plan = plan;
      const ref = this._dialog.open(PlanPurchaseModalComponent, {
        data: {
          plan: plan
        },
        panelClass: ['w-full', 'h-full', 'max-w-none', 'white-modal', 'p-0'],
        hasBackdrop: true,
        disableClose: false,
        width: '500px'
      })

      ref.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        console.log(response);
        if (response) {
          this.user_pro_status = "PENDING";
        }
      })
    }
  }

  compareFn(user1: any, user2: any) {
    return user1 && user2 ? user1.plan_id === user2.plan_id : user1 === user2;
  }
}
