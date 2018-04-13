import { Pipe, PipeTransform } from '@angular/core';
import {Anime} from "./anime";


@Pipe({name: 'filterAiringShows'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(allAnime: Anime[], active: boolean) {
    if (!active) {
      return allAnime;
    }

    return allAnime.filter(value => value.airing);
  }
}
