export class AnimeSource {
  name: string;
  iconUrl: string;
  url: string;

  constructor(url: string, template: AnimeSource) {
    this.name = template.name;
    this.iconUrl = template.iconUrl;
    this.url = url;
  }
}
