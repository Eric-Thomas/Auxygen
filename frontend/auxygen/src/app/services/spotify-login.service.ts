import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {

  private client_id = '47cbb524e65c4535ad2c93e1b6ae2e38';
  private redirect_uri = 'http://localhost:4200/leader';

  private scope = 'user-modify-playback-state';

  private login_url: string = 'https://accounts.spotify.com/authorize';

  //TODO add state = generateRandomString(16);

  constructor(private httpClient: HttpClient) {
    // Generate spotify authorization endpoint
    this.login_url += '?response_type=token';
    this.login_url += '&client_id=' + encodeURIComponent(this.client_id);
    this.login_url += '&scope=' + encodeURIComponent(this.scope);
    this.login_url += '&redirect_uri=' + encodeURIComponent(this.redirect_uri);
    // this.login_url += '&state=' + encodeURIComponent(state);
  }

  login() {
    // Redirect user to login url
    window.location.href = this.login_url;
  }


}
