import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinDialogComponent } from './bitcoin-dialog.component';

describe('BitcoinDialogComponent', () => {
  let component: BitcoinDialogComponent;
  let fixture: ComponentFixture<BitcoinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitcoinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
