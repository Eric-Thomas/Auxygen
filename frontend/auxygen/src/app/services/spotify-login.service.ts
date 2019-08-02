import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {

  private clientid = '47cbb524e65c4535ad2c93e1b6ae2e38';
  private redirectUri = 'http://192.168.1.24:4200/leader';

  private scope = 'user-modify-playback-state';

  private loginUrl: string = 'https://accounts.spotify.com/authorize';

  private hashParams: any;

  private accessToken: any;

  //TODO add state = generateRandomString(16);

  constructor(private httpClient: HttpClient) {
    // Generate spotify authorization endpoint
    this.loginUrl += '?response_type=token';
    this.loginUrl += '&client_id=' + encodeURIComponent(this.clientid);
    this.loginUrl += '&scope=' + encodeURIComponent(this.scope);
    this.loginUrl += '&redirect_uri=' + encodeURIComponent(this.redirectUri);
    // this.login_url += '&state=' + encodeURIComponent(state);
  }



  login() {
    // Redirect user to login url
    window.location.href = this.loginUrl;
  }


}
