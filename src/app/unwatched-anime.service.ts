import {Injectable} from '@angular/core';
import {Anime} from './anime';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, filter, tap} from 'rxjs/operators';
import {AnimeSource} from "./anime-source";
import {VideoSourcesService} from "./video-sources.service";


@Injectable()
export class UnwatchedAnimeService {
  private apiUrl1 = 'http://localhost:5000/api/';
  private apiUrl2 = '/watching';
  private malSite = 'https://myanimelist.net';

  constructor(private http: HttpClient, private videoSourceService: VideoSourcesService) {
  }

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
    const sources = this.convertToSourceObject(x['sources']);
    const airing = x['anime_airing_status'] == '1';

    return {
      name: name, imageUrl: imageUrl, unwatchedAiredEpisodes: (airedEpisodes - watchedEpisodes),
      malUrl: malUrl, sources: sources, airing: airing
    };
  }

  private convertToSourceObject(sourcesObject): AnimeSource[] {
    let result: AnimeSource[] = [];
    for (let key in sourcesObject) {
      if (sourcesObject.hasOwnProperty(key)) {
        this.videoSourceService.getSource(key)
          .subscribe(template => result.push(new AnimeSource(sourcesObject[key], template)));
        // let template: AnimeSource = this.videoSourceService.getSource(key);
        // result.push(new AnimeSource(sourcesObject[key], template));
      }
    }
    return result
  }

}
