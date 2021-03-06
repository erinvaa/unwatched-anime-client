import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {AnimeSource} from "./anime-source";
import {Subject} from "rxjs/Subject";

@Injectable()
export class VideoSourcesService {
  private map;
  private subjects: Map<number, Subject<AnimeSource>> = new Map();
  private waiting: boolean = false;

  private static url: string = "api/video-sources";
  private static hostUrl: string = "http://localhost:5000/";

  constructor(private http: HttpClient) {
  }

  public getSource(index): Observable<AnimeSource> {
    const self = this;

    if (this.waiting) {
      if (!this.subjects.has(+index)) {
        this.subjects.set(+index, new Subject<AnimeSource>());
      }
      return this.subjects.get(+index);
    }
    else if (this.map != null && this.map !== undefined) {
      // Already loaded data
      return Observable.create(observer => {
        observer.next(this.map.get(+index));
        observer.complete();
      });
    }

    this.waiting = true;
    return this.http.get(VideoSourcesService.hostUrl + VideoSourcesService.url)
      .pipe(
        map(res => self.parseResponse(res, index))
      )
  }

  parseResponse(res, index): AnimeSource {
    this.map = new Map<number, AnimeSource>();

    for (let key in res) {
      if (res.hasOwnProperty(key)) {
        this.map.set(+key, VideoSourcesService.parseAnimeSource(res[key]))
      }
    }

    this.waiting = false;
    this.subjects.forEach((value: Subject<AnimeSource>, key: number) => {
      value.next(this.map.get(+key));
      value.complete();
    });
    this.subjects = null;

    return this.map.get(+index)
  }

  static parseAnimeSource(res): AnimeSource {
    return {name: res.name, iconUrl: this.hostUrl + res.icon_url, url: null};
  }
}
