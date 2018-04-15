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
    return allAnime.sort((a, b) => {
      if (a[key] > b[key]) {
        return ascending ? 1 : -1;
      } else if (a[key] < b[key]) {
        return ascending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
}
