import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  private timerObservable;
  @Input() username: string;

  constructor(private watchingAnimeService: WatchingAnimeService) {
  };

  loadAnime(): void {
    this.timerObservable = TimerObservable.create(0, 300000)
      .subscribe(() => {
        this.watchingAnimeService.getAnimeList(this.username)
          .subscribe(animeList => this.animeList = animeList)
      });
  };

  ngOnInit() {
    this.loadAnime();
  };

  ngOnDestroy() {
    this.timerObservable.close();
  }
}
