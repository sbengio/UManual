import { TestBed } from '@angular/core/testing';

import { SubtitleService } from '../services/subtitle.service';

describe('SubtitleService', () => {
  let service: SubtitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
