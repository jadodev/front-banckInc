import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelTransactionComponent } from './cancel-transaction.component';
import { CancelTransaction } from '../../services/transactions.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CancelTransactionComponent', () => {
  let component: CancelTransactionComponent;
  let fixture: ComponentFixture<CancelTransactionComponent>;
  let transactionService: jasmine.SpyObj<CancelTransaction>;

  beforeEach(async () => {
    const transactionServiceSpy = jasmine.createSpyObj('CancelTransaction', ['cancelTransaction']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, CancelTransactionComponent],
      providers: [
        { provide: CancelTransaction, useValue: transactionServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelTransactionComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(CancelTransaction) as jasmine.SpyObj<CancelTransaction>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if transactionId is empty', () => {
    component.transactionId = '';
    component.cancelTransaction();
    expect(component.message).toBe('Ingrese un ID de transacción válido.');
  });

  it('should call cancelTransaction and handle success', () => {
    transactionService.cancelTransaction.and.returnValue(of({}));
    component.transactionId = '123';
    component.cancelTransaction();
    expect(component.isLoading).toBeTrue();
    expect(transactionService.cancelTransaction).toHaveBeenCalledWith('123');
    expect(component.message).toBe('Transacción anulada con éxito.');
    expect(component.isLoading).toBeFalse();
    expect(component.transactionId).toBe('');
  });

  it('should call cancelTransaction and handle error', () => {
    transactionService.cancelTransaction.and.returnValue(throwError(() => new Error('Error')));
    component.transactionId = '123';
    component.cancelTransaction();
    expect(component.isLoading).toBeTrue();
    expect(transactionService.cancelTransaction).toHaveBeenCalledWith('123');
    expect(component.message).toBe('Error al anular la transacción. Intenta nuevamente.');
    expect(component.isLoading).toBeFalse();
  });
});