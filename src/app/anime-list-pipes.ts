import {Pipe, PipeTransform} from '@angular/core';
import {Anime} from "./anime";

@Pipe({name: 'filterAiringShows'})
export class FilterAiringShows implements PipeTransform {
  transform(allAnime: Anime[], active: boolean) {
    if (!active) {
      return allAnime;
    }

    return allAnime.filter(value => value.airing);
  }
}

@Pipe({name: 'filterCaughtUpShows'})
export class FilterCaughtUpShows implements PipeTransform {
  transform(allAnime: Anime[], active: boolean) {
    if (!active) {
      return allAnime;
    }

    return allAnime.filter(value => value.unwatchedAiredEpisodes > 0);
  }
}

@Pipe({name: 'sortBy'})
export class SortBy implements PipeTransform {
  transform(allAnime: Anime[], key: string, ascending: boolean) {
    return allAnime.sort((a, b) => this.compare(a,b, ascending, [key, 'name']));
  }

  private compare(a: Anime, b: Anime, ascending: boolean, keys : string[]) : number {
    let key = keys[0];
    if (a[key] > b[key]) {
      return ascending ? 1 : -1;
    } else if (a[key] < b[key]) {
      return ascending ? -1 : 1;
    } else {
      if (keys.length > 1) {
        return this.compare(a, b, ascending, keys.splice(0, 1));
      } else {
        return 0;
      }
    }
  }
}
