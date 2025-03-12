import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardActionsComponent } from './card-actions.component';
import { CommonModule } from '@angular/common';
import { RechargerComponent } from '../recharger/recharger.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { CancelTransactionComponent } from '../cancel-transaction/cancel-transaction.component';

describe('CardActionsComponent', () => {
  let component: CardActionsComponent;
  let fixture: ComponentFixture<CardActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RechargerComponent, TransactionListComponent, CancelTransactionComponent, CardActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle showRechargeForm on onReload', () => {
    component.showRechargeForm = false;
    component.onReload();
    expect(component.showRechargeForm).toBeTrue();
    expect(component.showTransactions).toBeFalse();
    expect(component.cancelTransactions).toBeFalse();

    component.onReload();
    expect(component.showRechargeForm).toBeFalse();
  });

  it('should toggle showTransactions on onViewTransactions', () => {
    component.showTransactions = false;
    component.onViewTransactions();
    expect(component.showTransactions).toBeTrue();
    expect(component.showRechargeForm).toBeFalse();
    expect(component.cancelTransactions).toBeFalse();

    component.onViewTransactions();
    expect(component.showTransactions).toBeFalse();
  });

  it('should toggle cancelTransactions on onCancelTransaction', () => {
    component.cancelTransactions = false;
    component.onCancelTransaction();
    expect(component.cancelTransactions).toBeTrue();
    expect(component.showRechargeForm).toBeFalse();
    expect(component.showTransactions).toBeFalse();

    component.onCancelTransaction();
    expect(component.cancelTransactions).toBeFalse();
  });
});