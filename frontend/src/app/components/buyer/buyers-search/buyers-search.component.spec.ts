import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersSearchComponent } from './buyers-search.component';

describe('BuyersSearchComponent', () => {
  let component: BuyersSearchComponent;
  let fixture: ComponentFixture<BuyersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyersSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
