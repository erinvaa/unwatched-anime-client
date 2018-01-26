import { Injectable } from '@angular/core';
import { Anime } from './anime';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';


@Injectable()
export class UnwatchedAnimeService {
  private malUrl = '/api/daphoa/watching';

  constructor(private http: HttpClient) { }

  getUnwatchedAnime(): Observable<Anime[]> {
    var self = this;
    return this.http.get(this.malUrl)
      .pipe(
        map(res => self.convertToAnimeList(res))
      );
  }

  convertToAnimeList(res): Anime[] {
    var self = this;
    return res.map(item => self.convertToAnimeObject(item))
      .filter(item => item.unwatchedAiredEpisodes > 0);
  }

  convertToAnimeObject(x): Anime {
    var name = x['anime_title'];
    var imageUrl = x['anime_image_path'];
    var watchedEpisodes = x['num_watched_episodes']
    var airedEpisodes = x['anime_aired_episodes']

    var result = { name: name, imageUrl: imageUrl, unwatchedAiredEpisodes: (airedEpisodes - watchedEpisodes) };
    console.log(result);
    return result;
  }



  loadUserDataFromServer(username): 

}
