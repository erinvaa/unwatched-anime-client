import { TestBed, inject } from '@angular/core/testing';

import { VideoSourcesService } from './video-sources.service';

describe('VideoSourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoSourcesService]
    });
  });

  it('should be created', inject([VideoSourcesService], (service: VideoSourcesService) => {
    expect(service).toBeTruthy();
  }));
});
