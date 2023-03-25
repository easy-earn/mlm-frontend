import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-my-users',
  templateUrl: './my-users.component.html',
  styleUrls: ['./my-users.component.scss']
})
export class MyUsersComponent implements OnInit {
  _unsubscribeAll: Subject<any> = new Subject();

  displayedColumns: string[] = ['name', 'email', 'phone_number', 'referral_code', 'is_verified', 'transaction_verified', 'account_balance', 'plan_amount', 'status'];
  isLoading: boolean = false;
  pagination: any = {
    length: 0,
    page: 0,
    size: 25
  }
  dataSource = new MatTableDataSource<any>();
  sortObj: any = {};
  filterObj = {
    field: "",
    operator: "",
    value: ""
  }

  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getMyUsers();
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  pageChange(event: any) {
    this.isLoading = true;
    return this.getMyUsers(
      event.pageIndex,
      event.pageSize,
      this.sortObj?.active,
      this.sortObj?.direction,
      this.filterObj
    )
  }

  sortData(event: any) {
    console.log('evnet', event);
    this.isLoading = true;
    this.sortObj.active = event.active;
    this.sortObj.direction = event.direction;
    return this.getMyUsers(
      this.pagination.page,
      this.pagination.size,
      this.sortObj?.active,
      this.sortObj?.direction,
      this.filterObj
    )
  }


  getMyUsers(page: any = 0, size: any = 25, sort: any = null, direction: any = 'asc', filter: any = null) {
    this.loader.open();
    this.userService.getUsers(page, size, sort, direction, filter).pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      console.log('response', response);
      if (response) {
        const { result, count } = response;
        count ? this.pagination.length = count : null;
        this.dataSource.data = result;
      }
      this.isLoading = false;
      this.loader.close();
    });
  }

}
