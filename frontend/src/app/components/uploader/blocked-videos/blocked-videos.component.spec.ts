import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedVideosComponent } from './blocked-videos.component';

describe('BlockedVideosComponent', () => {
  let component: BlockedVideosComponent;
  let fixture: ComponentFixture<BlockedVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
