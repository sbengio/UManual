import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDialogComponent } from './credit-card-dialog.component';

describe('CreditCardDialogComponent', () => {
  let component: CreditCardDialogComponent;
  let fixture: ComponentFixture<CreditCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
