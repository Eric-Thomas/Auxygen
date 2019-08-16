import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthorizationService {

  private clientid = '47cbb524e65c4535ad2c93e1b6ae2e38';

  private redirectUri = AppConstants.localhost + '/callback';

  // private scope = 'user-modify-playback-state';
  private scope = 'user-read-email, user-read-private, streaming';

  private authorizationUrl: string = 'https://accounts.spotify.com/authorize';

  // TODO: add state = generateRandomString(16);

  constructor(private httpClient: HttpClient) {
    // Generate spotify authorization endpoint
    this.authorizationUrl += '?response_type=token';
    this.authorizationUrl += '&client_id=' + encodeURIComponent(this.clientid);
    this.authorizationUrl += '&scope=' + encodeURIComponent(this.scope);
    this.authorizationUrl += '&redirect_uri=' + encodeURIComponent(this.redirectUri);
    // this.login_url += '&state=' + encodeURIComponent(state);
  }



  authorize() {
    // Redirect user to login url
    window.location.href = this.authorizationUrl;
  }


}
