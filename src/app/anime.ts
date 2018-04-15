import {AnimeSource} from "./anime-source";

export class Anime {
  name: string;
  imageUrl: string;
  unwatchedAiredEpisodes: number;
  malUrl: string;
  sources: AnimeSource[];
  airing: boolean;
  timeUntilNextEpisode: number;
}
