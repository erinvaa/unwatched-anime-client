import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnimeViewComponent } from './anime-view/anime-view.component';
import { UnwatchedAnimeService } from './unwatched-anime.service'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AnimeViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UnwatchedAnimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
