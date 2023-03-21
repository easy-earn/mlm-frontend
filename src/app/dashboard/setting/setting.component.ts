import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AccountCreateEditModalComponent } from './account-create-edit-modal/account-create-edit-modal.component';

export interface BankAccount {
  name: string;
  number: string;
}

const ELEMENT_DATA: BankAccount[] = [
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
];

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {


  displayedColumns: string[] = ['accountName', 'accountNumber', 'actions'];
  dataSource = new MatTableDataSource<BankAccount>(ELEMENT_DATA);

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AccountCreateEditModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editAccount(account: BankAccount): void {
    // TODO: implement edit account functionality
  }

  deleteAccount(account: BankAccount): void {
    // TODO: implement delete account functionality
  }

}
