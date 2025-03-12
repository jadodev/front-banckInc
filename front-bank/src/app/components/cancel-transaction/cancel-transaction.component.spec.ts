import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTransactionComponent } from './cancel-transaction.component';

describe('CancelTransactionComponent', () => {
  let component: CancelTransactionComponent;
  let fixture: ComponentFixture<CancelTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
