import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { UnwatchedAnimeService } from '../unwatched-anime.service.ts';

@Component({
  selector: 'app-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css']
})
export class AnimeViewComponent implements OnInit {
  animeList: Anime[];

  constructor(private unwatchedAnimeService: UnwatchedAnimeService) { 
  }

  loadAnime(): void {
    this.unwatchedAnimeService.getUnwatchedAnime()
      .subscribe(animeList => this.animeList = animeList));
  }

  ngOnInit() {
    this.loadAnime();
  }
}
