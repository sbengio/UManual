import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedVideosDialogComponent } from './blocked-videos-dialog.component';

describe('BlockedVideosDialogComponent', () => {
  let component: BlockedVideosDialogComponent;
  let fixture: ComponentFixture<BlockedVideosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedVideosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedVideosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
