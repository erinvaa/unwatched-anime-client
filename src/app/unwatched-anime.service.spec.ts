import { TestBed, inject } from '@angular/core/testing';

import { UnwatchedAnimeService } from './unwatched-anime.service';

describe('UnwatchedAnimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnwatchedAnimeService]
    });
  });

  it('should be created', inject([UnwatchedAnimeService], (service: UnwatchedAnimeService) => {
    expect(service).toBeTruthy();
  }));
});
