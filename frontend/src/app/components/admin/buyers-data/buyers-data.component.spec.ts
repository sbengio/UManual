import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersDataComponent } from './buyers-data.component';

describe('BuyersDataComponent', () => {
  let component: BuyersDataComponent;
  let fixture: ComponentFixture<BuyersDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyersDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
