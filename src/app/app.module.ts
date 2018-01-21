import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnimeViewComponent } from './anime-view/anime-view.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimeViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
