import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosForApprovalComponent } from './videos-for-approval.component';

describe('VideosForApprovalComponent', () => {
  let component: VideosForApprovalComponent;
  let fixture: ComponentFixture<VideosForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosForApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
