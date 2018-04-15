import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Anime} from '../anime';
import {WatchingAnimeService} from '../watching-anime.service';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {UserSettingsService} from "./user-settings.service";

@Component({
  selector: 'app-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css']
})
export class AnimeViewComponent implements OnInit, OnDestroy {
  animeList: Anime[] = [];
  hideFinishedShows: boolean;
  hideCaughtUpShows: boolean;
  private timerObservable;
  @Input() username: string;

  constructor(private watchingAnimeService: WatchingAnimeService, private userSettingsService: UserSettingsService) {
    this.hideFinishedShows = this.userSettingsService.getSetting('hideFinishedShows', true);
    this.hideCaughtUpShows = this.userSettingsService.getSetting('hideCaughtUpShows', true);
  };

  loadAnime(): void {
    this.timerObservable = TimerObservable.create(0, 300000)
      .subscribe(() => {
        this.watchingAnimeService.getAnimeList(this.username)
          .subscribe(animeList => this.animeList = animeList)
      });
  };

  private toggleHideFinishedShows() {
    this.hideFinishedShows = !this.hideFinishedShows;
    this.userSettingsService.setSetting('hideFinishedShows', this.hideFinishedShows);
  }

  private toggleHideCaughtUpShows() {
    this.hideCaughtUpShows = !this.hideCaughtUpShows;
    this.userSettingsService.setSetting('hideCaughtUpShows', this.hideCaughtUpShows);
  }

  ngOnInit() {
    this.loadAnime();
  };

  ngOnDestroy() {
    this.timerObservable.close();
  }
}
