import { TestBed, inject } from '@angular/core/testing';

import { WatchingAnimeService } from './watching-anime.service';

describe('WatchingAnimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WatchingAnimeService]
    });
  });

  it('should be created', inject([WatchingAnimeService], (service: WatchingAnimeService) => {
    expect(service).toBeTruthy();
  }));
});
