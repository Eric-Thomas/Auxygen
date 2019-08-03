import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from 'src/app/services/access-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private accessTokenService: AccessTokenService, private router: Router) { }

  ngOnInit() {
    var hashParams = this.getHashParams();
    if (hashParams.access_token) {
      this.accessTokenService.accessToken = hashParams.access_token;
      this.router.navigate(['/leader']);
    } else {
      // TODO: Make Error logging in page and allow user to authorize again
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

}
