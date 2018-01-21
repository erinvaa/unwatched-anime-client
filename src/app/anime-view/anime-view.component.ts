import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { ANIMELIST } from '../mock-anime';

@Component({
  selector: 'app-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css']
})
export class AnimeViewComponent implements OnInit {
  animeList: ANIMELIST;

  constructor() { 
    this.animeList = ANIMELIST;
  }

  ngOnInit() {
    console.log(this.animeList);
  }

}
