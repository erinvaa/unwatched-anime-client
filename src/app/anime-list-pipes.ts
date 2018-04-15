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
  transform(allAnime: Anime[], keys: string[], ascending: boolean[]) {
    return allAnime.sort((a, b) => this.compare(a, b, ascending, keys));
  }

  private compare(a: Anime, b: Anime, ascendingList: boolean[], keys: string[]): number {
    const key = keys[0];
    const ascending = ascendingList[0];

    if (a[key] > b[key]) {
      return ascending ? 1 : -1;
    } else if (a[key] < b[key]) {
      return ascending ? -1 : 1;
    } else {
      if (keys.length > 1) {
        const newAscendingList = ascendingList.length > 0 ? ascendingList.slice(1, ascendingList.length) : [true];
        return this.compare(a, b, newAscendingList, keys.slice(1, keys.length));
      } else {
        return 0;
      }
    }
  }
}
