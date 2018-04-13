import { Injectable } from '@angular/core';
import { Anime } from './anime';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, tap } from 'rxjs/operators';
import {AnimeSource} from "./anime-source";


@Injectable()
export class UnwatchedAnimeService {
  private apiUrl1 = 'http://localhost:5000/api/';
  private apiUrl2 = '/watching';
  private malSite = 'https://myanimelist.net';

  constructor(private http: HttpClient) { }

  getUnwatchedAnime(username): Observable<Anime[]> {
    const self = this;
    const url = this.apiUrl1 + username + this.apiUrl2;

    console.log(url);

    return this.http.get(url)
      .pipe(
        map(res => self.convertToAnimeList(res))
      );
  }

  convertToAnimeList(res): Anime[] {
    const self = this;
    return res.map(item => self.convertToAnimeObject(item))
      .filter(item => item.unwatchedAiredEpisodes > 0);
  }

  convertToAnimeObject(x): Anime {
    const name = x['anime_title'];
    const imageUrl = x['anime_image_path'];
    const watchedEpisodes = x['num_watched_episodes'];
    const airedEpisodes = x['anime_aired_episodes'];
    const malUrl = this.malSite + x['anime_url'];
    const sources = UnwatchedAnimeService.convertToSourceObject(x['sources']);

    return {
      name: name, imageUrl: imageUrl, unwatchedAiredEpisodes: (airedEpisodes - watchedEpisodes),
      malUrl: malUrl, sources: sources
    };
  }

  private static convertToSourceObject(sourcesObject): AnimeSource[] {
    let result : AnimeSource[] = [];
    for (let key in sourcesObject) {
      if (sourcesObject.hasOwnProperty(key)) {
        result.push({name: key, url: sourcesObject[key]});
      }
    }
    return result
  }


  //  loadUserDataFromServer(username):

}
