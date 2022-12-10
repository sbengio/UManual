import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedVideoComponent } from './selected-video.component';

describe('SelectedVideoComponent', () => {
  let component: SelectedVideoComponent;
  let fixture: ComponentFixture<SelectedVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
