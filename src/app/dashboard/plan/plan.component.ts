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

  is_plan_purchased: boolean = false;

  _unsubscribeAll: Subject<any> = new Subject();

  constructor(private snackbarService: SnackbarService, private _activatedRoute: ActivatedRoute, private _dialog: MatDialog, private _purchaseService: PurchaseService,
    private authService: AuthService,
    private loader: LoaderService,
  ) {
  }

  ngOnInit(): void {
    if (this._activatedRoute?.snapshot?.data['userResponse']['result']) {
      this.authService.user = this._activatedRoute?.snapshot?.data['userResponse']['result'];
      this.is_plan_purchased = this.authService?.user.transaction_id && this.authService?.user?.transaction ? true : false;
    }
    if (!this.is_plan_purchased) {
      this.getPlanList();
      const planId = this._activatedRoute.snapshot.queryParamMap.get('planId');
      if (planId) {
        this.purchase(+planId);
      }
    } else {
      this.snackbarService.showError("You are already purchase your first plan.", 'X', 3);
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
        console.log('result', result);
        this.plans = result;
      }
      this.loader.close();
    });
  }


  purchase(planId: number) {
    if (!planId) {
      this.snackbarService.showError("Please select a plan");
      return;
    }
    const plan = this.plans.find((item: any) => item.plan_id === planId);
    if (plan) {
      this.form.plan = plan;
      this._dialog.open(PlanPurchaseModalComponent, {
        data: {
          plan: plan
        },
        panelClass: ['w-full', 'h-full', 'max-w-none', 'white-modal', 'p-0'],
        hasBackdrop: true,
        disableClose: false,
        width: '500px'
      })
    }
  }

  compareFn(user1: any, user2: any) {
    return user1 && user2 ? user1.plan_id === user2.plan_id : user1 === user2;
  }
}
