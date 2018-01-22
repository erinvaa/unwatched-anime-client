import { Injectable } from '@angular/core';
import { Anime } from './anime';
import { ANIMELIST } from './mock-anime';
mport { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';


@Injectable()
export class UnwatchedAnimeService {
  private malUrl = 'https://myanimelist.net/animelist/daphoa/load.json?offset=0&status=1&order=1'

  constructor(private http: HttpClient) { }

  getUnwatchedAnime(): Observable<Anime[]> {
    return this.http.get(this.malUrl)
      .pipe(
        map(x => convertToAnimeObject(x))
      );
  }

  convertToAnimeObject(x): Anime {
    name = x['anime_title'];
    imageUrl = x['anime_image_path'];

    return Anime { name: name, imageUrl: imageUrl };
  }



  loadUserDataFromServer(username): 

}
