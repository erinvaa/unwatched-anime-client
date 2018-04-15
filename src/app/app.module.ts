import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AnimeViewComponent} from './anime-view/anime-view.component';
import {WatchingAnimeService} from './watching-anime.service'
import {HttpClientModule} from '@angular/common/http';
import {FilterAiringShows, FilterCaughtUpShows, SortBy} from "./anime-list-pipes";
import {VideoSourcesService} from "./video-sources.service";


@NgModule({
  declarations: [
    AppComponent,
    AnimeViewComponent,
    FilterAiringShows,
    FilterCaughtUpShows,
    SortBy
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WatchingAnimeService, VideoSourcesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
