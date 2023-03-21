import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateEditModalComponent } from './account-create-edit-modal.component';

describe('AccountCreateEditModalComponent', () => {
  let component: AccountCreateEditModalComponent;
  let fixture: ComponentFixture<AccountCreateEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreateEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
