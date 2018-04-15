import {Component, OnInit} from '@angular/core';
import {Anime} from '../anime';
import {WatchingAnimeService} from '../watching-anime.service';

@Component({
  selector: 'app-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css']
})
export class AnimeViewComponent implements OnInit {
  animeList: Anime[] = [];
  hideFinishedShows = true;
  hideCaughtUpShows = true;

  constructor(private unwatchedAnimeService: WatchingAnimeService) {
  };

  loadAnime(): void {
    // TODO remove hard coded username
    this.unwatchedAnimeService.getUnwatchedAnime('daphoa')
      .subscribe(animeList => this.animeList = animeList);
  };

  ngOnInit() {
    this.loadAnime();
  };
}
