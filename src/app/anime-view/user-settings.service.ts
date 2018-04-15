import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class UserSettingsService {
  private settings: Object = {};
  private cookieName: string = "USER_SETTINGS";

  constructor(private cookieService: CookieService) {
    this.loadCookie();
  }

  private loadCookie() {
    if (this.cookieService.check(this.cookieName)) {
      const rawJson: string = this.cookieService.get(this.cookieName);
      this.settings = JSON.parse(rawJson);
    }
  }

  private saveCookie() {
    const rawJson: string = JSON.stringify(this.settings);
    this.cookieService.set(this.cookieName, rawJson);
  }

  public getSetting(key: string, defaultValue?: any): any {
    if (this.settings.hasOwnProperty(key)) {
      return this.settings[key];
    } else {
      return defaultValue;
    }
  }

  public setSetting(key: string, value: any) {
    this.settings[key] = value;
    this.saveCookie();
  }
}
