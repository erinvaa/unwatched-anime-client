import {Component, OnDestroy, OnInit} from '@angular/core';
import {Anime} from '../anime';
import {WatchingAnimeService} from '../watching-anime.service';
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css']
})
export class AnimeViewComponent implements OnInit, OnDestroy {
  animeList: Anime[] = [];
  hideFinishedShows = true;
  hideCaughtUpShows = true;
  private timerObersvable;

  constructor(private watchingAnimeService: WatchingAnimeService) {
  };

  loadAnime(): void {
    this.timerObersvable = TimerObservable.create(0, 300000)
      .subscribe(() => {
        // TODO remove hard coded username
        this.watchingAnimeService.getAnimeList('daphoa')
          .subscribe(animeList => this.animeList = animeList)
      });
  };

  ngOnInit() {
    this.loadAnime();
  };

  ngOnDestroy() {
    this.timerObersvable.close();
  }
}
