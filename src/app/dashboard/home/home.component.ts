import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  form: any = {
    bank_account: null,
    balance: 10000
  }

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
  constructor() { }

  ngOnInit(): void {
  }

  withdraw() {

  }

}
