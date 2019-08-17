import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { Router } from '@angular/router';
import { SpotifyAuthorizationService } from 'src/app/services/spotify-authorization.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  private authorizationError = false;

  constructor(private accessTokenService: AccessTokenService, private router: Router, private spotifyAuthorizationService: SpotifyAuthorizationService) { }

  ngOnInit() {
    var hashParams = this.getHashParams();
    if (hashParams.access_token) {
      this.accessTokenService.accessToken = hashParams.access_token;
      this.router.navigate(['/leader']);
    } else {
      this.authorizationError = true;
      console.log("Error during authorization");
    }
  }

  getHashParams(): any {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  retryAuthorization() {
    this.spotifyAuthorizationService.authorize();
  }

}
