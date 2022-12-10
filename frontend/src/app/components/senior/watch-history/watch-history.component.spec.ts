import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchHistoryComponent } from './watch-history.component';

describe('WatchHistoryComponent', () => {
  let component: WatchHistoryComponent;
  let fixture: ComponentFixture<WatchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
